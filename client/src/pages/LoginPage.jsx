import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import ForgotPasswordForm from '../components/login/ForgotPasswordForm';
import { LoginForm } from '../components/login/LoginForm';
import ResetLinkForm from '../components/login/ResetLinkForm';
import { useAuthStore } from "../store/useAuthStore";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { isLoading, error, setError, login, forgotPassword, message, setMessage } = useAuthStore();

  const handleLogin = async (e) => {
    e.preventDefault();
    const success = await login(formData);
    if (success) navigate("/");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await forgotPassword(formData);
    setIsSubmitted(true);
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
    <div className='h-screen grid lg:grid-cols-2 place-items-center max-w-7xl mx-auto gap-6' >
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

          {!isForgotPassword

            ? (

              <LoginForm
                formData={formData}
                setFormData={setFormData}
                handleLogin={handleLogin}
                isLoading={isLoading}
                error={error}
                onForgot={() => setIsForgotPassword(true)}
              />

            ) : !isSubmitted ? (

              <ForgotPasswordForm
                formData={formData}
                setFormData={setFormData}
                handleSubmit={handleSubmit}
                isLoading={isLoading}
                error={error}
                message={message}
                onBack={() => setIsForgotPassword(false)}
              />

            ) : (
              <ResetLinkForm
                email={formData.email}
                onBack={() => setIsForgotPassword(false)}
              />
            )
          }

        </motion.div>

        <div className="text-center">
          <p className="text-base-content/60">
            Don't have an account?{" "}
            <Link to="/signup" className="text-sm text-primary font-bold hover:underline decoration-2">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;