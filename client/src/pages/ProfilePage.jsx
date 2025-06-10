import { useAuthStore } from "../store/useAuthStore";
import { formatDate } from '../lib/Time';

const ProfilePage = () => {
  const { user } = useAuthStore();
  return (
    <div>
      <p>{formatDate(user.lastLogin)}</p>
      <p>{formatDate(user.createdAt)}</p>
    </div>
  );
};
export default ProfilePage;