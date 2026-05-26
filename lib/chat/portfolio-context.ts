import fs from 'fs';
import path from 'path';

const INSTRUCTION = `You are a portfolio assistant for Eman Iqbal. ONLY answer questions about Eman. ALWAYS speak about Eman in third person (she/her) — never say "I" or "my". Do NOT use markdown formatting like ** or * — just plain text. If asked anything else, say "I can only answer questions about Eman's portfolio." Be concise and natural.`;

let cached: string | null = null;

export function getPortfolioContext(): string {
  if (cached) return cached;
  try {
    const filePath = path.join(process.cwd(), 'lib/chat/portfolio-data.md');
    const data = fs.readFileSync(filePath, 'utf-8');
    cached = `${INSTRUCTION}\n\nHere is all the information about Eman:\n\n${data}`;
  } catch {
    cached = INSTRUCTION;
  }
  return cached;
}
