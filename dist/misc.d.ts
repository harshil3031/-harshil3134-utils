declare function generateUUID(): string;

declare function formatBytes(bytes: number, decimals?: number): string;

declare function randomBetween(min: number, max: number): number;

declare function copyToClipboard(text: string): Promise<boolean>;

declare function clamp(value: number, min: number, max: number): number;

export { clamp, copyToClipboard, formatBytes, generateUUID, randomBetween };
