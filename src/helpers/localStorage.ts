export function setLocalStorage(key: string, data: any) {
  const value = JSON.stringify(data);

  return localStorage.setItem(key, value);
}

export function getLocalStorage(key: string): string | number | any[] | Object | null {
  const data = localStorage.getItem(key);

  if (!data) return null;

  try {
    return JSON.parse(data);
  } catch {
    return null;
  }
}
