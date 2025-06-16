import { X } from 'lucide-react';
import { useState } from 'react';
import { THEMES } from '../lib/THEMES';
import { useChatStore } from "../store/useChatStore";
import { useThemeStore } from "../store/useThemeStore"; // adjust path as needed

const InfoSidebar = ({ onClose }) => {
  const [showTheme, setShowTheme] = useState(false);
  const [showMedia, setShowMedia] = useState(false);
  const { selectedUser, messages } = useChatStore();
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

      <div className="flex flex-col items-center justify-center mt-15 md:mt-0">
        <div className="avatar">
          <div className="rounded-full size-15 md:size-25" >
            <img src={selectedUser.profilePic || "/avatar.png"} />
          </div>
        </div>

        <h3 className="text-xl font-semibold" >{selectedUser.name}</h3>
        <p className="text-sm text-base-content/50" >{selectedUser.email}</p>
      </div>

      <hr className="border-base-300 my-5" />

      <div>
        <button
          className='w-full flex items-center justify-between mb-4 cursor-pointer'
          onClick={() => setShowTheme(prev => !prev)}
        >
          <p className={`font-semibold ${showTheme && 'underline decoration-accent decoration-4'}`}>Themes</p>
          {showTheme ? <p className='text-[10px] text-base-content/80'>Hide</p> : <p className='text-[10px] text-base-content/80'>Show</p>}
        </button>

        {showTheme && (
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
        )}

      </div>


      <hr className="border-base-300 my-5" />

      <div>
        <button
          className='w-full flex items-center justify-between mb-4'
          onClick={() => setShowMedia(prev => !prev)}
        >
          <p className={`font-semibold ${showMedia && 'underline decoration-accent decoration-4'}`}>Shared Photos</p>
          {showMedia ? (
            <p className='text-[10px] text-base-content/80'>Hide</p>
          ) : (<p className='text-[10px] text-base-content/80'>Show</p>
          )}
        </button>

        {showMedia && (
          <div className='max-h-72 overflow-y-auto pr-1'>
            {messages.some(message => message.image) ? (
              <div className='grid grid-cols-3 gap-2'>
                {messages
                  .filter(message => message.image)
                  .map((message, index) => (
                    <img
                      key={index}
                      src={message.image}
                      alt={`Shared media ${index}`}
                      className='rounded-xl w-full h-15 md:h-32 object-cover'
                    />
                  ))}
              </div>
            ) : (
              <p className="text-sm text-center text-base-content/50 mt-4">
                No shared photos yet.
              </p>
            )}
          </div>
        )}

      </div>


    </div>
  );
};
export default InfoSidebar;