// SPDX-FileCopyrightText: 2024 The Forkbomb Company
//
// SPDX-License-Identifier: AGPL-3.0-or-later

type StorageSystems = {
  local: WindowLocalStorage["localStorage"];
  session: WindowSessionStorage["sessionStorage"];
};

type Storage = StorageSystems[keyof StorageSystems];
export type StorageType = keyof StorageSystems;

//

export const S = (storage: Storage, key: string, value: unknown): void =>
  storage.setItem(key, JSON.stringify(value));

const G = (storage: Storage, key: string): unknown => {
  const value = storage.getItem(key);
  try {
    return JSON.parse(value as string);
  } catch {
    return value;
  }
};

export const SS = (k: string, v: unknown): void => {
  S(window.sessionStorage, k, v);
  document.dispatchEvent(new Event(k + "-updated"));
};

export const SG = (k: string): unknown => G(window.sessionStorage, k);

export const SC = (): void => window.sessionStorage.clear();

export const LS = (k: string, v: unknown): void => {
  if (window.localStorage.getItem(k) === null) {
    S(window.localStorage, k, v);
    document.dispatchEvent(new Event(k + "-updated"));
  }
};

export const LG = (k: string): unknown => G(window.localStorage, k);

export const stringify = (obj: unknown): string => {
  try {
    return JSON.stringify(JSON.parse(obj as string));
  } catch (e) {
    return obj as string;
  }
};

export const download = (
  content: string | Uint8Array,
  decode = false
): string => {
  if (decode) {
    const byteCharacters = atob(content as string);
    const byteNumbers = new Array(byteCharacters.length)
      .fill(null)
      .map((_, i) => byteCharacters.charCodeAt(i));
    content = new Uint8Array(byteNumbers);
  }
  const blob = new Blob([content], { type: "application/octet-stream" });
  return URL.createObjectURL(blob);
};
