const KOREAN_CHARS = ['가', '나', '다', '라', '마', '바', '사', '아', '자', '차', '카', '타', '파', '하'];

export function getLevel1Number(index: number): string {
  return `${index + 1}.`;
}

export function getLevel2Char(index: number): string {
  if (index < KOREAN_CHARS.length) {
    return `${KOREAN_CHARS[index]}.`;
  }
  return `${index + 1}.`;
}

export function getLevel3Sub(index: number): string {
  return `${index + 1})`;
}

export function getLevel4Sub(index: number): string {
  if (index < KOREAN_CHARS.length) {
    return `${KOREAN_CHARS[index]})`;
  }
  return `(${index + 1})`;
}
