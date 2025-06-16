import { useAuthStore } from "../store/useAuthStore";
import { formatMemberDate, formatLoginDate } from '../lib/time';
import { Camera, Mail, User, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from 'react';

const ProfilePage = () => {
  const { user, updateProfile, isUpdatingProfile, message } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  return (
    <div className="min-h-screen bg-base-100 flex items-center justify-center">
      <div className="relative max-w-2xl w-full px-4">
        <Link to="/" className="absolute top-2 right-2 p-1 rounded-full bg-neutral-content/20 hover:bg-neutral-content/40 transition-colors duration-300">
          <X className="size-5" />
        </Link>

        <h1 className="text-3xl font-bold mb-2">Account Settings</h1>

        <div className="w-full bg-base-300 bg-opacity-40 backdrop-blur-md border border-base-100/20 rounded-2xl p-6 shadow-lg mb-6">
          <p className="text-lg text-base-content/80 font-semibold mb-6">Your Profile Information</p>

          <div className="grid grid-cols-2">

            <div className="flex flex-col gap-2">
              <div className="avatar place-self-center">
                <div className="size-30 aspect-square rounded-full border-4 border-accent overflow-hidden">
                  <img
                    src={selectedImg || user.profilePic || '/avatar.png'}
                    alt="Profile Photo"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
              </div>

              <div className='h-6 place-self-center'>
                {message && <p className='text-sm text-green-500 font-semibold'>{message}</p>}
              </div>

              <label
                htmlFor="profileUpload"
                className={`flex items-center text-xs place-self-center gap-2 rounded p-2 cursor-pointer
                  bg-base-200 border border-base-200 shadow-md hover:shadow-lg transition-shadow duration-200 
                  ${isUpdatingProfile ? 'animate-pulse pointer-events-none' : ''}`
                }
              >
                <Camera />
                <input
                  type="file"
                  id='profileUpload'
                  className="hidden"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                />
                {isUpdatingProfile ? 'Uploading...' : 'Edit Profile Photo'}
              </label>
            </div>

            <div className="space-y-6">
              <div className="space-y-1.5">
                <div className="text-sm text-base-content/80 flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Full Name
                </div>
                <p className="text-base-content/80 px-4 py-1 bg-base-200 border border-base-200/70 shadow-md rounded-lg cursor-not-allowed">{user?.name}</p>
              </div>

              <div className="space-y-1.5">
                <div className="text-sm text-base-content/80 flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email Address
                </div>
                <p className="text-sm sm:text-base text-base-content/80 px-4 py-1 bg-base-200 border border-base-200/70 shadow-md rounded-lg cursor-not-allowed w-full break-words">{user?.email}</p>
              </div>
            </div>

          </div>
        </div>

        <div className="w-full bg-base-300 bg-opacity-40 backdrop-blur-md border border-base-100/20 rounded-2xl p-6 shadow-lg mb-6">
          <p className="text-lg text-base-content/80 font-semibold mb-6">Account Activity</p>
          <div className="flex items-center justify-between">
            <p className="text-sm text-base-content/80">Member since</p>
            <p className="text-sm text-base-content/80">{formatMemberDate(user.createdAt)}</p>
          </div>

          <hr className="text-base-content/30 my-4" />

          <div className="flex items-center justify-between">
            <p className="text-sm text-base-content/80">Last Login</p>
            <p className="text-sm text-base-content/80">{formatLoginDate(user.updatedAt)}</p>
          </div>

          <hr className="text-base-content/30 my-4" />

          <div className="flex items-center justify-between">
            <p className="text-sm text-base-content/80">Status</p>
            <p className="text-sm text-green-500 font-bold">Active</p>
          </div>

        </div>
      </div>


    </div>
  );
};
export default ProfilePage;