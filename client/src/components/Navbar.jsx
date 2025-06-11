import { ChevronDown, LogOut, Settings, User } from "lucide-react";
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from "../store/useAuthStore";
import { useState } from 'react';

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const { logout, user } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className="flex items-center justify-between px-5 bg-base-100 fixed top-0 left-0 w-full h-12 md:h-15 
     shadow-md border-b border-base-300 z-50">

      <div className="flex items-center">
        <div className="avatar">
          <div className="w-6 md:w-8 rounded-full">
            <img src="/logo.png" alt="logo" />
          </div>
        </div>
        <h1 className="text-sm md:text-base font-bold">Chat <span className="text-accent">Buddy</span> </h1>
      </div>

      <div className="dropdown dropdown-end">
        <label
          tabIndex={0}
          className="group flex items-center gap-1 px-1 md:px-3 py-1 rounded-3xl cursor-pointer 
               hover:bg-base-300 active:bg-accent 
               focus:outline-none focus:bg-accent 
               group-focus-within:bg-accent transition-colors duration-200"
        >
          <div className="avatar">
            <div className="w-6 md:8 rounded-full">
              <img src={user.profilePic || "/avatar.png"} alt="User Avatar" />
            </div>
          </div>
          <span className="text-sm font-bold">David</span>
          <ChevronDown size={20} />
        </label>
        <ul tabIndex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-30 md:w-40">
          <li><Link to="/settings"><Settings size={15} />Settings</Link></li>
          <li><Link to="/profile"><User size={15} />Profile</Link></li>
          <li><a onClick={handleLogout} class="text-red-500"><LogOut size={15} />Logout</a></li>
        </ul>
      </div>

    </div>
  );
};
export default Navbar;;