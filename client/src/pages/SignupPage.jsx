import { motion } from 'framer-motion';
import { LoaderCircle, Mail, User } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { Button, Input, Password } from '../components/UI';
import { useAuthStore } from '../store/useAuthStore';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  const { isLoading, error, setError, signup } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await signup(formData);
    if (success) {
      navigate('/verify-email');
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
    <div className='h-screen grid lg:grid-cols-2 place-items-center max-w-7xl mx-auto pt-20 px-6 gap-6' >
      <div className='space-y-6 self-center'>
        <h1 className='text-primary text-center md:text-start text-3xl md:text-8xl font-bold'>
          Stay connected in real time, anytime.
        </h1>
        <p className='text-base-content/80 text-center md:text-start text-md md:text-2xl' >Chat Buddy makes conversations simple, fast, and secure — whether it's friends, family, or your next big idea.</p>
      </div>

      {/*  - FORM */}
      <div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-md mx-auto bg-base-300 bg-opacity-40 backdrop-blur-md border border-base-100/20 rounded-2xl p-6 shadow-lg">

          <form onSubmit={handleSubmit}>
            <h1 className='text-center text-2xl font-semibold'>Create Account</h1>
            <p className='text-center mb-10 text-base-content/80' >Join the chat and start connecting instantly.</p>

            <Input
              icon={User}
              type='text'
              placeholder='Full Name'
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />

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

            <div className='h-6 mb-4'>
              {error && <p className='text-error font-semibold'>{error}</p>}
            </div>

            <Button
              type='submit'
            >
              {isLoading
                ? <LoaderCircle size={24} className='animate-spin mx-auto' />
                : "Sign Up"
              }
            </Button>
          </form>
        </motion.div>

        <div className="text-center">
          <p className="text-base-content/60">
            Already have an account?{" "}
            <Link to="/login" className="link link-primary">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
export default SignupPage;