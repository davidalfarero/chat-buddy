import { useState } from 'react';
import { THEMES } from '../lib/themes';
import { useChatStore } from "../store/useChatStore";
import { useThemeStore } from "../store/useThemeStore"; // adjust path as needed
import { X } from 'lucide-react';

const InfoSidebar = ({ onClose }) => {
  const [showInfo, setShowInfo] = useState('theme');
  const { selectedUser } = useChatStore();
  const { theme: currentTheme, setTheme } = useThemeStore();

  const toggleInfo = (tab) => {
    setShowInfo(prev => (prev === tab ? null : tab));
  };

  return (
    <div className="overflow-y-auto relative">
      <button
        onClick={onClose}
        className="absolute right-0 top-0 block md:hidden"
      >
        <X />
      </button>

      <div className="flex flex-col items-center justify-center mt-15 md:mt-0 mb-5">
        <div className="avatar">
          <div className="rounded-full size-15 md:size-25" >
            <img src={selectedUser.profilePic || "/avatar.png"} />
          </div>
        </div>

        <h3 className="text-xl font-semibold" >{selectedUser.name}</h3>
        <p className="text-sm text-base-content/50" >{selectedUser.email}</p>
      </div>

      <hr className="border-base-300 mb-5" />

      <div className="flex items-center gap-4">
        <div
          onClick={() => toggleInfo('theme')}
          className="mb-5"
        >
          <span className={`text-base font-semibold select-none ${showInfo === 'theme' ? 'border-b-4 border-accent' : ''}`}>Theme</span>
        </div>

        <div
          onClick={() => toggleInfo('media')}
          className="mb-5"
        >
          <span className={`text-base font-semibold select-none ${showInfo === 'media' ? 'border-b-4 border-accent' : ''}`}>Media</span>
        </div>

      </div>

      {showInfo === 'theme' &&
        <div>
          <div className="max-w-[80%] mx-auto grid grid-cols-5 gap-2">
            {THEMES.slice(0, 15).map(({ theme, color }) => (
              <button
                key={theme}
                className={`w-4 h-4 md:w-6 md:h-6 rounded-full ring-2 transition-all duration-300 cursor-pointer`}
                style={{
                  backgroundColor: color,
                  boxShadow: currentTheme === theme ? `0 0 0 2px #000` : "",
                }}
                onClick={() => {
                  setTheme(theme);
                  document.documentElement.setAttribute("data-theme", theme);
                }}
              />
            ))}
          </div>

          <p className="text-sm text-base-content/70 mt-2 text-center">
            <a href="/settings" className="link link-hover">
              View all themes
            </a>
          </p>
        </div>
      }


      {showInfo === 'media' && (
        <div className="text-center text-sm text-base-content/70 mt-5">
          {/* todo: media content here */}
        </div>
      )}
    </div>
  );
};
export default InfoSidebar;