import { getLocalStorage, setLocalStorage } from './localStorage';

export type Theme = typeof themes[number];

const themes = ['dark', 'light'] as const;
const THEME_KEY = 'theme';

export const [dark, light] = themes;

const systemTheme: Theme = matchMedia('(prefers-color-scheme: dark)').matches ? dark : light;

export function getLocalStorageTheme(): Theme | null {
  const theme = getLocalStorage(THEME_KEY);

  if (!theme || typeof theme !== 'string' || (theme !== dark && theme !== light)) return null;

  return theme;
}

export function setLocalStorageTheme(theme: Theme): void {
  return setLocalStorage(THEME_KEY, theme);
}

export function getDefaultTheme() {
  const theme = getLocalStorageTheme();

  if (!theme) return systemTheme;

  return theme;
}
