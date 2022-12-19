import { useRef, useEffect, useState, ChangeEvent } from 'react';
import { Moon, Sun } from 'phosphor-react';

import { dark, getDefaultTheme, light, setLocalStorageTheme, Theme } from '../helpers/theme';

interface DarkModeButtonProps {
  width?: number;
  height?: number;
  padding?: number;
}

const defaultTheme = getDefaultTheme();

export function DarkModeButton({ width = 60, height = 30, padding = 2 }: DarkModeButtonProps) {
  const [theme, setTheme] = useState<Theme>(defaultTheme);
  const labelRef = useRef<HTMLLabelElement>(null);

  const isDarkModeOn = theme === dark;

  const toggleDimensions = {
    width: height - 2 * padding - 2,
    height: height - 2 * padding - 2,
    translate: width - height,
  };

  function toggleDarkMode(ev: ChangeEvent<HTMLInputElement>) {
    const { checked } = ev.target;
    setTheme(checked ? dark : light);
  }

  function clickButtonHandle() {
    labelRef.current?.click();
  }

  useEffect(() => {
    const root = document.documentElement;

    root.classList.toggle(dark, isDarkModeOn);
    root.classList.toggle(light, !isDarkModeOn);

    setLocalStorageTheme(theme);
  }, [theme]);

  return (
    <button
      className="outline-none rounded-full focus:ring-2 ring-blue-600 ring-offset-2 ring-offset-zinc-100 dark:ring-offset-zinc-900"
      onClick={clickButtonHandle}
      style={{ width, height }}
    >
      <label
        ref={labelRef}
        className="block border rounded-full cursor-pointer border-zinc-900 dark:border-zinc-100"
        style={{ width, height, padding }}
        onClick={(ev) => ev.stopPropagation()}
      >
        <div
          className="flex justify-center items-center rounded-full transition-all bg-zinc-900 dark:bg-zinc-100 text-zinc-100 dark:text-zinc-900"
          style={{
            width: toggleDimensions.width,
            height: toggleDimensions.height,
            translate: isDarkModeOn ? toggleDimensions.translate : 0,
          }}
        >
          {isDarkModeOn ? (
            <Moon size={toggleDimensions.width - 4} weight="bold" />
          ) : (
            <Sun size={toggleDimensions.width - 8} weight="bold" />
          )}
        </div>
        <input className="hidden" type="checkbox" onChange={toggleDarkMode} checked={isDarkModeOn} />
      </label>
    </button>
  );
}
