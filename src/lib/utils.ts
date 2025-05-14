import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Storage } from "./model";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export function storageToFile(storage: Storage): File {
  // const response = await fetch(storage.url);
  // const blob = await response.blob();
  // return new File([blob], storage.name, { type: storage.mimetype });
  const blob = new Blob([""], { type: storage.mimetype });

  return new File([blob], storage.name || "arquivo.png", {
    type: storage.mimetype,
    lastModified: new Date().getTime(),
  });
}
