import { promises as fs } from "fs";
import path from "path";
import crypto from "crypto";
import {
  ACCEPTED_MIME,
  ACCEPTED_EXT,
  MAX_UPLOAD_BYTES,
} from "./constants";

/**
 * File storage adapter.
 *
 * Development default: local disk under UPLOAD_DIR (gitignored).
 * Production: swap `saveFile`/`readFile` for a Supabase Storage adapter
 * (see README → "Switching to Supabase Storage"). The public surface of this
 * module stays identical so callers do not change.
 */

const UPLOAD_DIR = path.resolve(process.env.UPLOAD_DIR || "./uploads");

export interface SavedFile {
  storedName: string;
  originalName: string;
  mimeType: string;
  size: number;
}

export function validateFile(file: File): string | null {
  if (file.size > MAX_UPLOAD_BYTES) {
    return `File is too large (max ${Math.round(MAX_UPLOAD_BYTES / 1024 / 1024)} MB)`;
  }
  const ext = path.extname(file.name).toLowerCase();
  if (!ACCEPTED_MIME.includes(file.type) && !ACCEPTED_EXT.includes(ext)) {
    return "Unsupported file type. Use PDF, JPG, JPEG or PNG";
  }
  return null;
}

export async function saveFile(file: File): Promise<SavedFile> {
  const err = validateFile(file);
  if (err) throw new Error(err);

  await fs.mkdir(UPLOAD_DIR, { recursive: true });

  const ext = path.extname(file.name).toLowerCase() || ".bin";
  const storedName = `${Date.now()}-${crypto.randomBytes(8).toString("hex")}${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());
  await fs.writeFile(path.join(UPLOAD_DIR, storedName), buffer);

  return {
    storedName,
    originalName: path.basename(file.name).slice(0, 200),
    mimeType: file.type || "application/octet-stream",
    size: file.size,
  };
}

export async function readFile(storedName: string): Promise<Buffer> {
  // Guard against path traversal: only a bare filename is ever accepted.
  const safe = path.basename(storedName);
  return fs.readFile(path.join(UPLOAD_DIR, safe));
}

export async function deleteFile(storedName: string): Promise<void> {
  const safe = path.basename(storedName);
  await fs.unlink(path.join(UPLOAD_DIR, safe)).catch(() => {});
}
