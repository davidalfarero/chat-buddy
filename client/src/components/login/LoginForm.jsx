import { LoaderCircle, Mail } from "lucide-react";
import { Button, Input, Password } from "../UI";

export const LoginForm = ({
  handleLogin,
  formData,
  setFormData,
  isLoading,
  error,
  onForgot
}) => (
  <form onSubmit={handleLogin} >
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
        className="text-sm text-primary font-bold hover:underline decoration-2"
        onClick={onForgot}
      >
        Forgot password?
      </button>
    </div>

    <div className='h-6 mb-4'>
      {error && <p className='text-red-500 font-semibold'>{error}</p>}
    </div>

    <Button
      type='submit'
      disabled={isLoading}
    >
      {isLoading
        ? <LoaderCircle size={24} className='animate-spin mx-auto' />
        : "Log in"
      }
    </Button>
  </form>
);