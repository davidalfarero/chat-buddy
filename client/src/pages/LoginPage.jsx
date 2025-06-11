import { motion } from 'framer-motion';
import { ArrowLeft, LoaderCircle, Mail } from "lucide-react";
import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { Button, Input, Password } from '../components/UI';
import { useAuthStore } from "../store/useAuthStore";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [isForgotPassword, setIsForgotPassword] = useState(false);

  const { isLoading, error, setError, login, forgotPassword, message, setMessage } = useAuthStore();

  const handleLogin = async (e) => {
    e.preventDefault();
    const success = await login(formData);
    if (success) navigate("/");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await forgotPassword(formData);
    setTimeout(() => {
      setIsForgotPassword(false);
    }, 2000);
  };

  useEffect(() => {
    if (error || message) {
      const timer = setTimeout(() => {
        setError(null);
        setMessage(null);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [error, message, setError, setMessage]);


  return (
    <div className='h-screen grid lg:grid-cols-2 place-items-center max-w-7xl mx-auto pt-20 px-6 gap-6' >
      <div className='space-y-6 self-center'>
        <h1 className='text-primary text-center md:text-start text-3xl md:text-8xl font-bold'>Welcome back to the conversation.</h1>
        <p className='text-base-content/80 text-center md:text-start text-md md:text-2xl'>Pick up right where you left off — your chats, connections, and ideas are waiting.</p>
      </div>

      <div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-md mx-auto bg-base-300 bg-opacity-40 backdrop-blur-md border border-base-100/20 rounded-2xl p-6 shadow-lg">

          {!isForgotPassword ?
            <form onSubmit={handleLogin}>
              <h1 className='text-center text-2xl font-semibold'>Sign In</h1>
              <p className='text-center text-base-content/80 mb-10' >Jump back in and keep the conversation going.</p>

              <Input
                icon={Mail}
                type='email'
                placeholder='Email Address'
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />

              <Password
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />

              <div className="text-right">
                <button
                  type="button"
                  className="link link-primary text-sm"
                  onClick={() => setIsForgotPassword(true)}
                >
                  Forgot password?
                </button>
              </div>

              <div className='h-6 mb-4'>
                {error && <p className='text-red-500 font-semibold'>{error}</p>}
              </div>

              <Button
                type='submit'
              >
                {isLoading
                  ? <LoaderCircle size={24} className='animate-spin mx-auto' />
                  : "Log in"
                }
              </Button>
            </form> :
            <form onSubmit={handleSubmit}>
              <h1 className='text-center text-2xl font-semibold'>Forgot Password</h1>
              <p className='text-center text-base-content/80 mb-10' >Enter your email and we'll send you a link.</p>

              <Input
                icon={Mail}
                type='email'
                placeholder='Email Address'
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
              >
                {isLoading
                  ? <LoaderCircle size={24} className='animate-spin mx-auto' />
                  : "Send Reset Link"
                }
              </Button>

              <button
                type="button"
                className="flex items-center text-sm link link-primary mt-6 cursor-pointer"
                onClick={() => setIsForgotPassword(false)}
              >
                <span className="mr-1"><ArrowLeft size={15} /></span> Back to Login
              </button>
            </form>
          }

        </motion.div>

        <div className="text-center">
          <p className="text-base-content/60">
            Don't have an account?{" "}
            <Link to="/signup" className="link link-primary">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;