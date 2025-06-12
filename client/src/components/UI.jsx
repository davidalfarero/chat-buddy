import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';
import { useState } from 'react';

export const Input = ({ icon: Icon, ...props }) => (
  <div className="relative mb-6" >
    <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
      <Icon className="size-5 text-primary" />
    </div>
    <input
      {...props}
      className="w-full pl-10 pr-3 py-2 bg-base-100 bg-opacity-50 rounded-lg border border-neutral/50 focus:border-primary focus:outline-none placeholder:text-base-content/40 transition duration-200"
    />
  </div>
);

export const Password = ({ ...props }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="mb-6">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Lock className="size-5 text-primary" />
        </div>
        <input
          {...props}
          placeholder='Password'
          type={showPassword ? "text" : "password"}
          className="w-full pl-10 pr-3 py-2 bg-base-100 bg-opacity-50 rounded-lg border border-neutral/50 focus:border-primary focus:outline-none placeholder:text-base-content/40 transition duration-200"
        />
      </div>

      <label className="flex items-center gap-2 mt-2 text-sm text-base-content cursor-pointer select-none pl-3">
        <input
          type="checkbox"
          className="checkbox checkbox-xs checkbox-primary rounded-sm"
          checked={showPassword}
          onChange={() => setShowPassword(!showPassword)}
        />
        <span className='text-base-content/80'>{showPassword ? "Hide Password" : "Show Password"}</span>
      </label>
    </div>
  );
};

export const Button = ({ ...props }) => {
  return (
    <motion.button
      {...props}
      className='w-full text-primary-content py-3 px-4 bg-primary font-bold rounded-lg shadow-lg cursor-pointer'
      whileTap={{ scale: 0.98 }}
    >
    </motion.button>
  );
};