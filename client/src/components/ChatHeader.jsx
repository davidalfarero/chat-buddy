import { Info } from "lucide-react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";

const ChatHeader = ({ onToggleInfo }) => {
  const { selectedUser, users } = useChatStore();
  const { onlineUsers } = useAuthStore();

  return (
    <div className="p-2.5 bg-base-100 border-b border-base-300">
      <div className="flex items-center justify-between">

        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="size-8 lg:size-10 rounded-full relative">
              <img src={selectedUser.profilePic || "/avatar.png"} alt={selectedUser.name} />
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-md lg:text-xl font-medium">{selectedUser.name}</h3>
              {onlineUsers.includes(selectedUser._id) && (
                <span className="size-3 bg-green-500 rounded-full" />
              )}
            </div>
            <p className="text-xs lg:text-sm text-base-content/70">
              {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-center rounded-full p-2 hover:bg-base-300 transition-colors duration-300">
          <button onClick={onToggleInfo} className="cursor-pointer">
            <Info className="text-base-content/80" />
          </button>
        </div>
      </div>
    </div>
  );
};
export default ChatHeader;