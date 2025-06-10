import { useThemeStore } from "../store/useThemeStore"; // adjust path as needed
import { THEMES } from '../lib/themes';

const ThemeSelector = () => {
  const { theme: activeTheme, setTheme } = useThemeStore();

  const handleChangeTheme = (theme) => {
    setTheme(theme);
    document.documentElement.setAttribute("data-theme", theme);
  };

  return (
    <section className="mb-5">
      <h3 className="text-lg font-semibold text-base-content">Themes</h3>
      <p className="text-sm text-base-content/70 mb-5">
        Choose your preferred color:
      </p>

      <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-2 md:gap-3 lg:gap-4">
        {THEMES.map(({ theme, color }) => (
          <button
            key={theme}
            onClick={() => handleChangeTheme(theme)}
            className={`flex flex-col items-center gap-2 p-2 rounded-lg transition-all duration-200
              border border-neutral-300 cursor-pointer
              ${activeTheme === theme ? "ring-2 ring-accent" : ""}`}
            aria-label={`Switch to ${theme} theme`}
          >
            <span
              className="rounded-full w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 border border-base-content/10"
              style={{ backgroundColor: color }}
            />
            <span className="capitalize text-[10px] sm:text-xs">{theme}</span>
          </button>
        ))}
      </div>
    </section>
  );
};

export default ThemeSelector;