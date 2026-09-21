import React, { useState, useEffect } from "react";
import {
  X,
  Plus,
  Trash2,
  Edit2,
  Check,
  BookOpen,
  Search,
  ChevronRight,
  Sparkles,
  Copy,
  FileCheck,
  Eye,
  RotateCcw,
  CheckCircle2,
  ArrowLeft,
  FileText,
  Bookmark,
  Share2,
} from "lucide-react";
import {
  StandardPhrase,
  loadAllPhrases,
  saveAllPhrases,
  resetAllPhrasesToDefault,
} from "../data/standardPhrases";
import { loadAllPresets } from "../data/presets";
import { ClaimPreset } from "../types";

interface PhraseManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultField?: string;
  onApplyPhrase?: (fieldKey: string, content: string) => void;
  onOpenPresetManager?: () => void;
}

export const FIELD_OPTIONS = [
  // 시험법 및 분석 원리
  { key: "principle_visual", label: "🔬 [시험원리] 현품 외관 및 이물 육안 확인", group: "시험분석 원리" },
  { key: "principle_magnifier", label: "🔬 [시험원리] 확대경(10~40x) 조사", group: "시험분석 원리" },
  { key: "principle_microscope", label: "🔬 [시험원리] 광학 현미경(200x) 조사", group: "시험분석 원리" },
  { key: "principle_ftir", label: "🔬 [시험원리] FT-IR 적외선 분광분석", group: "시험분석 원리" },
  { key: "principle_xrf", label: "🔬 [시험원리] XRF X선 형광 원소 분석", group: "시험분석 원리" },
  { key: "principle_physicochemical", label: "🔬 [시험원리] 이화학 검사(pH, 당도, 산도)", group: "시험분석 원리" },
  { key: "principle_catalase", label: "🔬 [시험원리] 카탈라아제 효소 활성 검사", group: "시험분석 원리" },
  { key: "principle_gc", label: "🔬 [시험원리] 헤드스페이스 GC 가스분석", group: "시험분석 원리" },

  // 현품 및 분석 결과
  { key: "sampleCondition", label: "🔍 [분석결과] 현품 외관 및 이물 성상 관찰", group: "시험분석 결과" },
  { key: "magnifierResult", label: "🔍 [분석결과] 확대경 정밀 관찰 소견", group: "시험분석 결과" },
  { key: "microscopeResult", label: "🔍 [분석결과] 광학 현미경 미세조직 소견", group: "시험분석 결과" },
  { key: "ftirSummary", label: "🔍 [분석결과] FT-IR 정성 분석 판정", group: "시험분석 결과" },

  // 제조공정 및 품질 이력
  { key: "retainedSampleCheck", label: "🏭 [제조공정] 동일 Lot 공장 보관품 확인", group: "제조공정 & 품질이력" },
  { key: "productionLogNote", label: "🏭 [제조공정] 생산일지 및 검출기 모니터링", group: "제조공정 & 품질이력" },
  { key: "filtrationAnalysis", label: "🏭 [제조공정] 여과망(150 Mesh) 이물 제어", group: "제조공정 & 품질이력" },
  { key: "cleaningAnalysis", label: "🏭 [제조공정] 용기/캡 세척 공정", group: "제조공정 & 품질이력" },
  { key: "qualityTestRecord", label: "🏭 [제조공정] 완제품 품질검사 성적서(COA)", group: "제조공정 & 품질이력" },
  { key: "priorClaimsCount", label: "🏭 [제조공정] 동일 Lot 이전 클레임 이력", group: "제조공정 & 품질이력" },

  // 원인 및 대책 / 결론
  { key: "rootCause", label: "📋 [원인대책] 원인 분석 종합 판정", group: "원인판정 & 재발방지" },
  { key: "preventiveAction", label: "📋 [원인대책] 재발방지대책 수립", group: "원인판정 & 재발방지" },
  { key: "apologyText", label: "✉️ [안내문] 고객 사과 및 안내문", group: "결론 & 사과문" },
];

const CATEGORY_TABS = [
  { id: "all", label: "전체 상용구" },
  { id: "test_principle", label: "🔬 시험법 원리" },
  { id: "bottle", label: "🍾 병 제품 클레임" },
  { id: "oem", label: "🏭 OEM 수탁제품" },
  { id: "foreign_object", label: "이물 / 곰팡이" },
  { id: "general", label: "공정 / 품질 공통" },
];

export function PhraseManagerModal({
  isOpen,
  onClose,
  defaultField,
  onApplyPhrase,
  onOpenPresetManager,
}: PhraseManagerModalProps) {
  const [phrases, setPhrases] = useState<StandardPhrase[]>([]);
  const [presets, setPresets] = useState<ClaimPreset[]>([]);
  const [activeCategoryTab, setActiveCategoryTab] = useState<string>("all");
  const [selectedFieldFilter, setSelectedFieldFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Mode: "view" (미리보기 및 관리 선택) vs "edit" (기존 문구 수정) vs "create" (신규 등록)
  const [mode, setMode] = useState<"view" | "edit" | "create">("view");

  // Currently selected phrase for viewing/editing
  const [selectedPhraseId, setSelectedPhraseId] = useState<string | null>(null);

  // Form states for edit / create
  const [formTitle, setFormTitle] = useState("");
  const [formContent, setFormContent] = useState("");
  const [formFieldKey, setFormFieldKey] = useState<string>("principle_visual");
  const [formCategory, setFormCategory] = useState<string>("general");
  const [formPresetId, setFormPresetId] = useState<string | undefined>(undefined);

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  useEffect(() => {
    if (isOpen) {
      const all = loadAllPhrases();
      const allPresets = loadAllPresets();
      setPhrases(all);
      setPresets(allPresets);
      setMode("view");

      if (defaultField) {
        setSelectedFieldFilter(defaultField);
        setFormFieldKey(defaultField);
        if (defaultField.startsWith("principle_")) {
          setActiveCategoryTab("test_principle");
          setFormCategory("test_principle");
        }
        // Match phrase by defaultField
        const match = all.find((p) => p.fieldKey === defaultField);
        if (match) {
          setSelectedPhraseId(match.id);
        } else if (all.length > 0) {
          setSelectedPhraseId(all[0].id);
        }
      } else {
        if (all.length > 0 && !selectedPhraseId) {
          setSelectedPhraseId(all[0].id);
        }
      }
    }
  }, [isOpen, defaultField]);

  if (!isOpen) return null;

  // Filter phrases
  const filteredPhrases = phrases.filter((p) => {
    // Category tab filter
    if (activeCategoryTab !== "all") {
      if (activeCategoryTab === "test_principle") {
        if (p.category !== "test_principle" && !p.fieldKey.startsWith("principle_")) return false;
      } else if (activeCategoryTab === "bottle") {
        if (!p.category?.startsWith("bottle_")) return false;
      } else if (activeCategoryTab === "oem") {
        if (!p.category?.startsWith("oem_")) return false;
      } else if (activeCategoryTab === "foreign_object") {
        const isFo =
          p.category === "foreign_object" ||
          p.category === "bottle_insect" ||
          p.category === "bottle_plastic_ftir" ||
          p.category === "bottle_hotmelt" ||
          p.category === "bottle_mold";
        if (!isFo) return false;
      } else if (activeCategoryTab === "general") {
        if (
          p.category?.startsWith("bottle_") ||
          p.category?.startsWith("oem_") ||
          p.category === "test_principle"
        ) {
          return false;
        }
      }
    }

    // Field key filter
    if (selectedFieldFilter !== "all") {
      if (p.fieldKey !== selectedFieldFilter) return false;
    }

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const matchTitle = p.title.toLowerCase().includes(q);
      const matchContent = p.content.toLowerCase().includes(q);
      const matchKey = p.fieldKey.toLowerCase().includes(q);
      if (!matchTitle && !matchContent && !matchKey) return false;
    }

    return true;
  });

  // Current active selected phrase
  const selectedPhrase =
    phrases.find((p) => p.id === selectedPhraseId) ||
    filteredPhrases[0] ||
    phrases[0] ||
    null;

  // Linked preset helper
  const getLinkedPreset = (presetId?: string) => {
    if (!presetId) return null;
    return presets.find((p) => p.id === presetId) || null;
  };

  // Handlers
  const handleSelectPhrase = (phrase: StandardPhrase) => {
    setSelectedPhraseId(phrase.id);
    setMode("view"); // ALWAYS show preview first!
  };

  const handleStartEdit = (phrase: StandardPhrase) => {
    setSelectedPhraseId(phrase.id);
    setFormTitle(phrase.title);
    setFormContent(phrase.content);
    setFormFieldKey(phrase.fieldKey);
    setFormCategory(phrase.category || "general");
    setFormPresetId(phrase.presetId);
    setMode("edit");
  };

  const handleStartCreate = () => {
    setFormTitle("");
    setFormContent("");
    setFormFieldKey(
      selectedFieldFilter !== "all"
        ? selectedFieldFilter
        : defaultField || "principle_visual"
    );
    setFormCategory(
      activeCategoryTab !== "all" &&
        activeCategoryTab !== "bottle" &&
        activeCategoryTab !== "oem"
        ? activeCategoryTab
        : "general"
    );
    setFormPresetId(undefined);
    setMode("create");
  };

  const handleCancelForm = () => {
    setMode("view");
  };

  const handleSavePhrase = () => {
    if (!formTitle.trim() || !formContent.trim()) {
      alert("상용구 제목과 내용을 모두 입력해주세요.");
      return;
    }

    const currentList = loadAllPhrases();

    if (mode === "edit" && selectedPhrase) {
      const targetId = selectedPhrase.id;
      const existingIdx = currentList.findIndex((p) => p.id === targetId);

      let updatedList: StandardPhrase[];
      if (existingIdx >= 0) {
        updatedList = currentList.map((p) =>
          p.id === targetId
            ? {
                ...p,
                title: formTitle.trim(),
                content: formContent.trim(),
                fieldKey: formFieldKey,
                category: formCategory,
                presetId: formPresetId,
                isCustom: true,
              }
            : p
        );
      } else {
        const overridden: StandardPhrase = {
          id: targetId,
          fieldKey: formFieldKey,
          title: formTitle.trim(),
          content: formContent.trim(),
          category: formCategory,
          presetId: formPresetId,
          isCustom: true,
        };
        updatedList = [...currentList, overridden];
      }

      saveAllPhrases(updatedList);
      setPhrases(updatedList);
      setMode("view");
      showToast(`'${formTitle.trim()}' 상용구가 성공적으로 수정되었습니다.`);
    } else if (mode === "create") {
      const newPhrase: StandardPhrase = {
        id: `custom-ph-${Date.now()}`,
        fieldKey: formFieldKey,
        title: formTitle.trim(),
        content: formContent.trim(),
        category: formFieldKey.startsWith("principle_")
          ? "test_principle"
          : formCategory,
        presetId: formPresetId,
        isCustom: true,
      };

      const updatedList = [newPhrase, ...currentList];
      saveAllPhrases(updatedList);
      setPhrases(updatedList);
      setSelectedPhraseId(newPhrase.id);
      setMode("view");
      showToast(`새 상용구 '${newPhrase.title}'이(가) 등록되었습니다.`);
    }
  };

  const handleDelete = (id: string) => {
    const phraseToDelete = phrases.find((p) => p.id === id);
    if (!confirm(`'${phraseToDelete?.title || "이 상용구"}'를 삭제하시겠습니까?`)) {
      return;
    }

    const currentList = loadAllPhrases();
    const updated = currentList.filter((p) => p.id !== id);
    saveAllPhrases(updated);
    setPhrases(updated);

    if (selectedPhraseId === id) {
      const remaining = updated.find((p) => p.id !== id);
      setSelectedPhraseId(remaining ? remaining.id : null);
      setMode("view");
    }
    showToast("상용구가 삭제되었습니다.");
  };

  const handleCopyContent = (content: string, id: string) => {
    navigator.clipboard.writeText(content);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
    showToast("상용구 문구가 클립보드에 복사되었습니다.");
  };

  const handleResetDefaults = () => {
    if (
      !confirm(
        "모든 표준 상용구를 시스템 초기 표준 설정으로 복원하시겠습니까?\n(사용자가 추가/수정한 상용구가 초기화됩니다)"
      )
    ) {
      return;
    }
    const defaults = resetAllPhrasesToDefault();
    setPhrases(defaults);
    if (defaults.length > 0) {
      setSelectedPhraseId(defaults[0].id);
    }
    setMode("view");
    showToast("표준 상용구 라이브러리가 기본값으로 복원되었습니다.");
  };

  const currentFieldOpt = FIELD_OPTIONS.find(
    (f) => f.key === (selectedPhrase?.fieldKey || formFieldKey)
  );
  const linkedPreset = getLinkedPreset(selectedPhrase?.presetId);

  return (
    <div
      id="phrase-manager-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-150"
    >
      <div className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full h-[92vh] max-h-[920px] overflow-hidden border border-slate-300 flex flex-col">
        {/* Modal Master Header */}
        <div className="px-6 py-3.5 bg-slate-900 text-white flex items-center justify-between shrink-0 border-b border-slate-800">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center shrink-0">
              <BookOpen className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <h3 className="text-base sm:text-lg font-bold tracking-tight text-white">
                  표준 상용구 &amp; 시험분석 원리 라이브러리
                </h3>
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30">
                  총 {phrases.length}개 상용구 등록
                </span>
              </div>
              <p className="text-xs text-slate-300 hidden sm:block mt-0.5">
                상용구를 클릭하여 미리 확인하고, 필요에 따라 내용 수정 또는 보고서 폼 적용을 결정할 수 있습니다.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleResetDefaults}
              className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-lg transition-colors border border-transparent hover:border-slate-700"
              title="초기 기본 상용구로 복원"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>기본 복원</span>
            </button>

            {onOpenPresetManager && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenPresetManager();
                }}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-200 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                <span>클레임 프리셋 관리로 전환</span>
                <ChevronRight className="w-3.5 h-3.5 opacity-60" />
              </button>
            )}

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              title="창 닫기 (ESC)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Global Toast */}
        {toastMessage && (
          <div className="bg-emerald-600 text-white px-6 py-2 text-xs font-bold flex items-center gap-2 shrink-0 animate-in fade-in duration-100">
            <Check className="w-4 h-4 shrink-0" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Master-Detail 2-Column Body */}
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden min-h-0">
          {/* ========================================================================= */}
          {/* LEFT COLUMN: Search & List (w-full lg:w-[430px] shrink-0)                 */}
          {/* ========================================================================= */}
          <div className="w-full lg:w-[430px] shrink-0 border-b lg:border-b-0 lg:border-r border-slate-200 flex flex-col bg-slate-50/70 overflow-hidden">
            {/* Search & Action Bar */}
            <div className="p-3.5 space-y-2.5 bg-white border-b border-slate-200 shrink-0">
              {/* Top Create Button (신규 등록 분리) */}
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <Bookmark className="w-3.5 h-3.5 text-amber-600" />
                  <span>상용구 목록 ({filteredPhrases.length})</span>
                </span>
                <button
                  type="button"
                  onClick={handleStartCreate}
                  className="px-3 py-1.5 text-xs font-bold text-amber-900 bg-amber-400 hover:bg-amber-300 active:scale-95 rounded-lg shadow-2xs border border-amber-500/30 transition-all flex items-center gap-1.5"
                  title="신규 상용구 등록 작성 화면으로 전환"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>+ 신규 상용구 등록</span>
                </button>
              </div>

              {/* Search Bar */}
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="제목, 내용, 키워드 검색..."
                  className="w-full text-xs pl-9 pr-7 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:ring-2 focus:ring-amber-500 focus:outline-none transition-all placeholder:text-slate-400"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Category Filter Pills */}
              <div className="flex items-center gap-1 overflow-x-auto pb-1 scrollbar-thin">
                {CATEGORY_TABS.map((tab) => {
                  const isActive = activeCategoryTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveCategoryTab(tab.id)}
                      className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-all shrink-0 border ${
                        isActive
                          ? "bg-slate-900 text-white border-slate-900 font-bold shadow-2xs"
                          : "bg-white text-slate-600 border-slate-200 hover:bg-slate-100"
                      }`}
                    >
                      {tab.label}
                    </button>
                  );
                })}
              </div>

              {/* Field Filter Select */}
              <div className="flex items-center gap-2 pt-1 border-t border-slate-100">
                <span className="text-[11px] font-semibold text-slate-500 shrink-0">항목별:</span>
                <select
                  value={selectedFieldFilter}
                  onChange={(e) => setSelectedFieldFilter(e.target.value)}
                  className="flex-1 text-[11px] px-2 py-1 bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-amber-500 text-slate-700 font-medium"
                >
                  <option value="all">전체 입력 항목 보기</option>
                  {FIELD_OPTIONS.map((f) => (
                    <option key={f.key} value={f.key}>
                      {f.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* List of Phrases */}
            <div className="flex-1 overflow-y-auto p-3 space-y-2">
              {filteredPhrases.length === 0 ? (
                <div className="py-12 text-center text-xs text-slate-400 bg-white rounded-xl border border-dashed border-slate-300 p-6">
                  <BookOpen className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                  <p className="font-semibold text-slate-600">일치하는 상용구가 없습니다.</p>
                  <p className="text-[11px] text-slate-400 mt-1">검색어나 카테고리 필터를 변경해보세요.</p>
                  <button
                    type="button"
                    onClick={handleStartCreate}
                    className="mt-3 px-3 py-1.5 text-xs font-bold text-amber-900 bg-amber-100 hover:bg-amber-200 rounded-lg inline-flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>새 상용구 직접 등록하기</span>
                  </button>
                </div>
              ) : (
                filteredPhrases.map((phrase) => {
                  const isSelected = selectedPhrase?.id === phrase.id;
                  const fieldOpt = FIELD_OPTIONS.find((f) => f.key === phrase.fieldKey);
                  const isLinkedPreset = !!phrase.presetId;

                  return (
                    <div
                      key={phrase.id}
                      onClick={() => handleSelectPhrase(phrase)}
                      className={`p-3 rounded-xl border cursor-pointer transition-all ${
                        isSelected
                          ? "bg-amber-50/90 border-amber-500 ring-2 ring-amber-400 shadow-md"
                          : "bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/50 shadow-2xs"
                      }`}
                    >
                      {/* Top Badges */}
                      <div className="flex items-center justify-between gap-1.5 mb-1.5">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200 truncate max-w-[200px]">
                          {fieldOpt?.group || phrase.fieldKey}
                        </span>
                        <div className="flex items-center gap-1 shrink-0">
                          {isLinkedPreset && (
                            <span className="text-[10px] font-semibold text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-200 flex items-center gap-0.5">
                              <Sparkles className="w-2.5 h-2.5 text-blue-500" />
                              <span>프리셋 연계</span>
                            </span>
                          )}
                          {phrase.isCustom && (
                            <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-1.5 py-0.5 rounded border border-amber-200">
                              맞춤 등록
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Title */}
                      <h4
                        className={`text-xs font-bold mb-1 leading-snug ${
                          isSelected ? "text-amber-950" : "text-slate-900"
                        }`}
                      >
                        {phrase.title}
                      </h4>

                      {/* Snippet */}
                      <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-2.5">
                        {phrase.content}
                      </p>

                      {/* Card Footer */}
                      <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-[11px]">
                        <span className="text-slate-400 text-[10px] truncate max-w-[190px]">
                          {fieldOpt?.label.replace(/^[🔬🔍🏭📋✉️]\s*/, "") || phrase.fieldKey}
                        </span>

                        <div className="flex items-center gap-1">
                          {isSelected && mode === "view" ? (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-bold bg-amber-600 text-white rounded shadow-2xs">
                              <Eye className="w-3 h-3" />
                              <span>미리보기 중</span>
                            </span>
                          ) : (
                            <span className="text-slate-400 text-[10px] group-hover:text-slate-600">
                              클릭하여 미리보기
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* ========================================================================= */}
          {/* RIGHT COLUMN: PREVIEW MODE (VIEW) OR EDIT/CREATE FORM                     */}
          {/* ========================================================================= */}
          <div className="flex-1 flex flex-col bg-white overflow-y-auto min-h-0">
            {/* --------------------------------------------------------------------- */}
            {/* VIEW MODE: Rich Preview with Decision Action Bar                      */}
            {/* --------------------------------------------------------------------- */}
            {mode === "view" && selectedPhrase && (
              <div className="p-5 sm:p-7 max-w-4xl mx-auto w-full space-y-5 animate-in fade-in duration-100">
                {/* Top Meta Bar */}
                <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-200 text-xs">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-bold px-2.5 py-1 rounded-lg bg-slate-100 text-slate-800 border border-slate-200 flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-slate-600" />
                      <span>{currentFieldOpt?.label || selectedPhrase.fieldKey}</span>
                    </span>

                    {selectedPhrase.isCustom ? (
                      <span className="font-bold px-2 py-0.5 rounded-lg bg-amber-100 text-amber-800 border border-amber-300">
                        사용자 정의 맞춤 상용구
                      </span>
                    ) : (
                      <span className="font-bold px-2 py-0.5 rounded-lg bg-slate-100 text-slate-700 border border-slate-200">
                        광동 표준 품질 상용구
                      </span>
                    )}

                    <span className="text-slate-400 font-medium">
                      총 {selectedPhrase.content.length} 자
                    </span>
                  </div>

                  {linkedPreset && (
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-blue-50 text-blue-800 border border-blue-200 text-[11px] font-semibold">
                      <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                      <span>연계 프리셋: {linkedPreset.name}</span>
                    </div>
                  )}
                </div>

                {/* Phrase Title */}
                <div>
                  <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight leading-snug">
                    {selectedPhrase.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    클레임 조사보고서 [
                    {currentFieldOpt?.label.replace(/^[🔬🔍🏭📋✉️]\s*/, "") || selectedPhrase.fieldKey}
                    ] 영역에 최적화된 공인 표준 문구입니다.
                  </p>
                </div>

                {/* =================================================================== */}
                {/* DECISION ACTION BAR (미리 보고 수정할지 말지 결정)                  */}
                {/* =================================================================== */}
                <div className="bg-slate-900 text-white p-4 sm:p-5 rounded-2xl shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-3 border border-slate-800">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-amber-400 flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>상용구 활용 및 수정 결정</span>
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 mt-0.5">
                      아래 본문을 검토하신 후, 내용 수정이 필요하면 [수정]을 누르거나 즉시 보고서 폼에 적용할 수 있습니다.
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 shrink-0">
                    {onApplyPhrase && (
                      <button
                        type="button"
                        onClick={() => {
                          onApplyPhrase(selectedPhrase.fieldKey, selectedPhrase.content);
                          showToast(`'${selectedPhrase.title}' 문구가 현재 보고서에 적용되었습니다.`);
                        }}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 active:scale-95 rounded-xl transition-all shadow-sm"
                        title="현재 작성 중인 보고서 해당 항목에 즉시 입력"
                      >
                        <FileCheck className="w-4 h-4" />
                        <span>보고서 폼에 적용</span>
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() => handleStartEdit(selectedPhrase)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 active:scale-95 rounded-xl transition-all shadow-sm"
                      title="이 상용구의 제목이나 문구 내용을 직접 수정"
                    >
                      <Edit2 className="w-4 h-4" />
                      <span>이 상용구 내용 수정하기</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleCopyContent(selectedPhrase.content, selectedPhrase.id)}
                      className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-200 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl transition-colors"
                      title="클립보드로 본문 복사"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>{copiedId === selectedPhrase.id ? "복사완료!" : "문구 복사"}</span>
                    </button>

                    {selectedPhrase.isCustom && (
                      <button
                        type="button"
                        onClick={() => handleDelete(selectedPhrase.id)}
                        className="p-2 text-rose-400 hover:text-rose-200 hover:bg-rose-950/60 rounded-xl transition-colors border border-rose-900/40"
                        title="상용구 삭제"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Main Content Reading Document Card */}
                <div className="bg-slate-50/70 border border-slate-200 rounded-2xl p-5 sm:p-6 space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-200/80 pb-2.5">
                    <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                      <BookOpen className="w-4 h-4 text-amber-600" />
                      <span>상용구 전문 내용 (미리보기)</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCopyContent(selectedPhrase.content, selectedPhrase.id)}
                      className="text-xs text-slate-500 hover:text-slate-800 font-semibold inline-flex items-center gap-1 hover:underline"
                    >
                      <Copy className="w-3 h-3" />
                      <span>전체 복사</span>
                    </button>
                  </div>

                  <div className="p-4 sm:p-5 bg-white rounded-xl border border-slate-200 shadow-2xs">
                    <p className="text-sm sm:text-base text-slate-800 whitespace-pre-wrap leading-relaxed sm:leading-loose font-sans">
                      {selectedPhrase.content}
                    </p>
                  </div>
                </div>

                {/* Formal Report Layout Preview Box */}
                <div className="border border-slate-200 rounded-xl p-4 bg-white space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                      📄 공문서 적용 시 반영 서식 예시
                    </span>
                    <span className="text-[10px] text-slate-400">광동제약 A4 규격 조사보고서</span>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-lg border-l-4 border-slate-800 text-xs sm:text-sm text-slate-700 leading-relaxed">
                    <div className="font-bold text-slate-900 mb-1 text-xs">
                      • {currentFieldOpt?.label.replace(/^[🔬🔍🏭📋✉️]\s*/, "") || selectedPhrase.fieldKey}
                    </div>
                    <div className="whitespace-pre-wrap">{selectedPhrase.content}</div>
                  </div>
                </div>

                {/* Related phrases in same field */}
                {phrases.filter(
                  (p) => p.fieldKey === selectedPhrase.fieldKey && p.id !== selectedPhrase.id
                ).length > 0 && (
                  <div className="pt-3 border-t border-slate-200">
                    <span className="text-xs font-bold text-slate-700 block mb-2">
                      💡 같은 항목의 다른 추천 상용구:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {phrases
                        .filter(
                          (p) => p.fieldKey === selectedPhrase.fieldKey && p.id !== selectedPhrase.id
                        )
                        .slice(0, 4)
                        .map((rel) => (
                          <button
                            key={rel.id}
                            type="button"
                            onClick={() => handleSelectPhrase(rel)}
                            className="px-2.5 py-1.5 bg-slate-100 hover:bg-amber-50 hover:border-amber-300 border border-slate-200 rounded-lg text-xs text-slate-700 hover:text-amber-900 transition-colors text-left flex items-center gap-1.5"
                          >
                            <Eye className="w-3 h-3 text-slate-400" />
                            <span className="font-semibold truncate max-w-[220px]">{rel.title}</span>
                          </button>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* --------------------------------------------------------------------- */}
            {/* EDIT OR CREATE MODE: Structured Form Editor with Live Preview         */}
            {/* --------------------------------------------------------------------- */}
            {(mode === "edit" || mode === "create") && (
              <div className="p-5 sm:p-7 max-w-3xl mx-auto w-full space-y-5 animate-in fade-in duration-100">
                {/* Header inside editor */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                  <div className="flex items-center gap-2.5">
                    <button
                      type="button"
                      onClick={handleCancelForm}
                      className="p-1.5 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
                      title="미리보기로 돌아가기"
                    >
                      <ArrowLeft className="w-5 h-5" />
                    </button>
                    <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                      {mode === "edit" ? <Edit2 className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </div>
                    <div>
                      <h4 className="text-sm sm:text-base font-bold text-slate-900">
                        {mode === "edit"
                          ? `상용구 수정: ${formTitle || selectedPhrase?.title || "제목 없음"}`
                          : "새 표준 / 맞춤 상용구 등록"}
                      </h4>
                      <p className="text-xs text-slate-500">
                        {mode === "edit"
                          ? "수정한 내용은 즉시 저장되며, 이후 보고서 작성 시 표준 상용구로 활용됩니다."
                          : "식품품질경영팀 표준 조사보고서 양식에 맞춘 맞춤 상용구를 새로 등록합니다."}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleCancelForm}
                    className="text-xs text-slate-500 hover:text-slate-800 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-lg transition-colors font-medium"
                  >
                    수정 취소
                  </button>
                </div>

                {/* Form fields */}
                <div className="space-y-4">
                  {/* Title */}
                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1.5">
                      상용구 제목 <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formTitle}
                      onChange={(e) => setFormTitle(e.target.value)}
                      placeholder="예: FT-IR 적외선 분광분석 이물 스펙트럼 판정 원리"
                      className="w-full text-xs sm:text-sm px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-amber-500 focus:outline-none font-semibold text-slate-900 transition-all placeholder:text-slate-400"
                    />
                  </div>

                  {/* Target Field & Category */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        적용 대상 입력 항목
                      </label>
                      <select
                        value={formFieldKey}
                        onChange={(e) => setFormFieldKey(e.target.value)}
                        className="w-full text-xs px-3 py-2.5 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none font-medium text-slate-800"
                      >
                        {FIELD_OPTIONS.map((opt) => (
                          <option key={opt.key} value={opt.key}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        상용구 분류 카테고리
                      </label>
                      <select
                        value={formCategory}
                        onChange={(e) => setFormCategory(e.target.value)}
                        className="w-full text-xs px-3 py-2.5 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none text-slate-800 font-medium"
                      >
                        <option value="test_principle">🔬 시험법 분석 원리 설명</option>
                        <option value="foreign_object">이물 혼입 연계</option>
                        <option value="bottle_glass">유리병 파손 / 타격점</option>
                        <option value="bottle_mold">병 곰팡이 / 진공 파괴</option>
                        <option value="bottle_insect">곤충 / 카탈라아제 활성</option>
                        <option value="bottle_sediment">침전 / 침착물 가열</option>
                        <option value="oem_bottle">OEM 병음료 수탁</option>
                        <option value="oem_can">OEM 캔음료 수탁</option>
                        <option value="oem_pet">OEM 페트음료 수탁</option>
                        <option value="oem_pouch">OEM 파우치음료 수탁</option>
                        <option value="oem_jelly">OEM 젤리 수탁</option>
                        <option value="general">공통 / 품질 이력</option>
                      </select>
                    </div>
                  </div>

                  {/* Content Textarea */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-xs font-bold text-slate-800">
                        상용구 본문 내용 <span className="text-rose-500">*</span>
                      </label>
                      <span className="text-[11px] text-slate-400 font-mono">
                        {formContent.length} 자
                      </span>
                    </div>
                    <textarea
                      rows={8}
                      value={formContent}
                      onChange={(e) => setFormContent(e.target.value)}
                      placeholder="조사 보고서에 입력될 정밀하고 품격 있는 품질경영 전문 문구를 작성하세요."
                      className="w-full text-xs sm:text-sm p-4 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-amber-500 focus:outline-none leading-relaxed transition-all"
                    />
                  </div>

                  {/* Realtime Live Preview Box */}
                  {formContent && (
                    <div className="p-4 bg-amber-50/50 rounded-xl border border-amber-200/80 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wider flex items-center gap-1">
                          <Eye className="w-3.5 h-3.5 text-amber-600" />
                          <span>실시간 반영 미리보기</span>
                        </span>
                        <span className="text-[10px] text-amber-600">입력 중 즉시 렌더링</span>
                      </div>
                      <div className="p-3 bg-white rounded-lg border border-amber-200 text-xs sm:text-sm text-slate-800 whitespace-pre-wrap leading-relaxed">
                        {formContent}
                      </div>
                    </div>
                  )}

                  {/* Action Bar */}
                  <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={handleCancelForm}
                      className="px-4 py-2 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
                    >
                      취소 (미리보기로 돌아가기)
                    </button>

                    <button
                      type="button"
                      onClick={handleSavePhrase}
                      className="inline-flex items-center gap-1.5 px-5 py-2.5 text-xs sm:text-sm font-bold text-white bg-slate-900 hover:bg-amber-600 active:scale-95 rounded-xl shadow-md transition-all"
                    >
                      <Check className="w-4 h-4" />
                      <span>{mode === "edit" ? "수정 완료 저장 및 미리보기" : "새 상용구 등록 저장"}</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
