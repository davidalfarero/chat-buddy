import { ArrowLeft, LoaderCircle, Lock } from "lucide-react";
import { Button, Input } from "../components/UI";
import { useAuthStore } from "../store/useAuthStore";
import { motion } from 'framer-motion';
import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from 'react';

const ResetPasswordPage = () => {
  const {
    isLoading,
    error,
    message,
    setError,
    setMessage,
    resetPassword
  } = useAuthStore();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { token } = useParams();
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoading) return;

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      await resetPassword(token, password);
      setMessage("Your password has been successfully reset.");
      setTimeout(() => navigate('/login'), 2000);
    } catch (error) {
      console.error(error);
      setError("Something went wrong. Please try again.");
    }
  };

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [error, setError]);


  return (
    <div className="h-screen grid lg:grid-cols-2 place-items-center max-w-7xl mx-auto gap-6">
      <div className='space-y-6 self-center'>
        <h1 className='text-primary text-center md:text-start text-3xl md:text-8xl font-bold'>Ready to set a new password?</h1>
        <p className='text-base-content/80 text-center md:text-start text-md md:text-2xl'>Let’s secure your account — create a new password and jump back into your conversations.</p>
      </div>

      <div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-md mx-auto bg-base-300 bg-opacity-40 backdrop-blur-md border border-base-100/20 rounded-2xl p-6 shadow-lg">

          <form onSubmit={handleSubmit}>
            <h1 className='text-center text-2xl font-semibold mb-6'>Set New Password</h1>

            <Input
              icon={Lock}
              type='password'
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <Input
              icon={Lock}
              type='password'
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />

            <div className='h-3 mb-4'>
              {error ? (
                <p className='text-red-500 font-semibold'>{error}</p>
              ) : message ? (
                <p className='text-green-500 font-semibold'>{message}</p>
              ) : null}
            </div>

            <Button
              type='submit'
              disabled={isLoading}
              aria-busy={isLoading}
            >
              {isLoading
                ? <LoaderCircle size={24} className='animate-spin mx-auto' />
                : "Set New Password"
              }
            </Button>

            <Link
              className="flex items-center text-sm text-primary font-bold hover:underline decoration-2 mt-6"
              to='/login'
            >
              <span className="mr-1"><ArrowLeft size={15} /></span> Back to Login
            </Link>
          </form>
        </motion.div>
      </div>

    </div>
  );
};
export default ResetPasswordPage;