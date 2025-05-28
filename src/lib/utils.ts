import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Storage } from "./model";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export function storageToFile(storage: Storage): File {
  // const response = await fetch(storage.url);
  // const blob = await response.blob();
  // return new File([blob], storage.name, { type: storage.tipo });
  const blob = new Blob([""], { type: storage.mimetype });

  return new File([blob], storage.name || "arquivo.png", {
    type: storage.mimetype,
    lastModified: new Date().getTime(),
  });
}

type FileType =
  | "image"
  | "video"
  | "audio"
  | "pdf"
  | "archive"
  | "code"
  | "text";

export function getFileType({ mimetype, name }: Storage): FileType {
  if (mimetype) {
    if (mimetype.startsWith("image/")) return "image";
    if (mimetype.startsWith("video/")) return "video";
    if (mimetype.startsWith("audio/")) return "audio";
    if (mimetype.startsWith("application/pdf")) return "pdf";
    if (
      mimetype.includes("zip") ||
      mimetype.includes("tar") ||
      mimetype.includes("rar")
    )
      return "archive";
    if (
      mimetype.includes("text/html") ||
      mimetype.includes("application/javascript")
    )
      return "code";
  }

  // Fallback to extension check
  const extension = name.split(".").pop()?.toLowerCase();
  if (!extension) return "text";

  if (["jpg", "jpeg", "png", "gif", "webp", "svg", "bmp"].includes(extension))
    return "image";
  if (["mp4", "webm", "mov", "avi", "wmv", "flv", "mkv"].includes(extension))
    return "video";
  if (["mp3", "wav", "ogg", "flac", "aac"].includes(extension)) return "audio";
  if (extension === "pdf") return "pdf";
  if (["zip", "rar", "tar", "7z", "gz"].includes(extension)) return "archive";
  if (
    [
      "html",
      "css",
      "js",
      "ts",
      "jsx",
      "tsx",
      "php",
      "py",
      "java",
      "rb",
      "c",
      "cpp",
    ].includes(extension)
  )
    return "code";

  return "text";
}
