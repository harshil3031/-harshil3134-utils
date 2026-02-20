export type MaskType = "email" | "phone" | "card";

export function maskSensitiveData(value: string, type: MaskType): string {
  if (!value) return value;

  switch (type) {
    case "email": {
      const lastAtIndex = value.lastIndexOf("@");
      if (lastAtIndex === -1) return value;
      const local = value.slice(0, lastAtIndex);
      const domain = value.slice(lastAtIndex + 1);
      if (!domain || !local) return value;

      let maskedLocal: string;
      if (local.length <= 2) {
        maskedLocal = local[0] + "*";
      } else {
        const maskCount = Math.min(local.length - 2, 8);
        maskedLocal = local[0] + "*".repeat(maskCount) + local[local.length - 1];
      }
      return `${maskedLocal}@${domain}`;
    }
    case "phone":
    case "card": {
      const digits = value.replace(/\D/g, "");
      if (digits.length < 4) return value;
      const maskedLength = Math.min(digits.length - 4, 12);
      return "*".repeat(maskedLength) + digits.slice(-4);
    }
    default:
      return value;
  }
}
