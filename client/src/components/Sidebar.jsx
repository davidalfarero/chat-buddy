import { Search } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { useChatStore } from "../store/useChatStore";
import SidebarSkeleton from "./SidebarSkeleton";

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChatStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const scrollRef = useRef();
  const { onlineUsers } = useAuthStore();
  const { messages } = useChatStore();


  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const handleScroll = () => {
    if (scrollRef.current) {
      setScrolled(scrollRef.current.scrollTop > 0);
    }
  };

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <aside className="h-full w-full flex lg:flex-col transition-all duration-200">

      <div className={`hidden lg:block w-full px-5 pt-5 border-b border-base-300 
        ${scrolled && 'shadow-md'}`}>
        <div className="flex items-center">
          <span className="text-2xl font-bold lg:block">Conversations</span>
        </div>

        <div className='relative md:flex'>
          <input
            type="text"
            placeholder='Search'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className='w-full my-5 bg-base-300 rounded-3xl py-2 pl-10 focus:outline-none'
          />
          <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
            <Search className="size-5 text-base-content/50" />
          </div>
        </div>
      </div>

      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto w-full px-2 space-y-1">
        {filteredUsers.map((user) => (
          <button
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={`w-full p-3 flex items-center justify-between gap-3 rounded-lg hover:bg-base-300 transition-colors 
              border-b border-base-300 lg:border-none
              ${selectedUser?._id === user._id ? "bg-accent/30 border-r-5 border-accent ring-1 ring-base-100" : ""
              }`}
          >
            <div className="relative mx-auto lg:mx-0">
              <img
                src={user.profilePic || "/avatar.png"}
                alt={user.name}
                className="size-8 lg:size-12 object-cover rounded-full"
              />
              {onlineUsers.includes(user._id) && (
                <span className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full" />
              )}
            </div>

            <div className="hidden md:block flex-1 text-left min-w-0">
              <p className="font-medium truncate">{user.name}</p>
              <div className="text-sm text-zinc-400">
                {onlineUsers.includes(user._id) ? "Online" : "Offline"}
              </div>
            </div>
          </button>
        ))}
      </div>

    </aside>

  );
};
export default Sidebar;