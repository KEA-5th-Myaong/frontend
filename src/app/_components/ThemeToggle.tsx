'use client';

import { useTheme } from './ThemeProvider';
import Icons from './ui/Icon';
import { MoonIcon, SunIcon } from './ui/iconPath';

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={(e: React.MouseEvent) => {
        e.stopPropagation();
        toggleTheme();
      }}
      className="p-2 "
      aria-label="Toggle theme"
    >
      {theme === 'light' ? <Icons name={SunIcon} /> : <Icons name={MoonIcon} />}
    </button>
  );
}

export default ThemeToggle;
