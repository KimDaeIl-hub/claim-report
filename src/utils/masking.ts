export function maskCustomerName(name: string, shouldMask: boolean = true): string {
  if (!name) return "";
  if (!shouldMask) return name;

  const trimmed = name.trim();
  const len = trimmed.length;

  if (len <= 1) return trimmed;
  if (len === 2) {
    return trimmed[0] + "*";
  }
  if (len === 3) {
    return trimmed[0] + "*" + trimmed[2];
  }
  // 4 words or more (e.g. 남궁선우)
  return trimmed[0] + "*".repeat(len - 2) + trimmed[len - 1];
}

export function maskContact(contact: string): string {
  if (!contact) return "";
  // 010-1234-5678 -> 010-****-5678
  return contact.replace(/(\d{2,3})[-.]?(\d{3,4})[-.]?(\d{4})/, "$1-****-$3");
}
