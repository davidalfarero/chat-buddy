import { LoaderCircle } from 'lucide-react';
import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import VerifyEmailPage from './pages/VerifyEmailPage';
import { useAuthStore } from './store/useAuthStore';
import SettingsPage from './pages/SettingsPage';
import { useThemeStore } from './store/useThemeStore';
import ProfilePage from './pages/ProfilePage';
import ResetPasswordPage from './pages/ResetPasswordPage';

const App = () => {
  const { user, checkAuth, isCheckingAuth, onlineUsers } = useAuthStore();
  const { theme } = useThemeStore();

  console.log({ onlineUsers });

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  console.log(user);

  if (isCheckingAuth && !user) {
    return (
      <div className='flex items-center justify-center h-screen' >
        <LoaderCircle className='size-10 animate-spin' />
      </div>
    );
  }

  return (
    <div data-theme={theme}>
      <Routes>
        <Route path='/' element={user ? <HomePage /> : <Navigate to="/login" />} />
        <Route path='/signup' element={!user ? <SignupPage /> : <Navigate to="/" />} />
        <Route path='/login' element={!user ? <LoginPage /> : <Navigate to="/" />} />
        <Route path='/verify-email' element={<VerifyEmailPage />} />
        <Route path='/settings' element={user ? <SettingsPage /> : <Navigate to="/login" />} />
        <Route path='/profile' element={user ? <ProfilePage /> : <Navigate to="/login" />} />
        <Route path='/reset-password/:token' element={<ResetPasswordPage />} />
      </Routes>
    </div>
  );
};
export default App;