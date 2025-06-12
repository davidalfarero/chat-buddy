import { ArrowLeft, LoaderCircle, Mail } from "lucide-react";
import { Button, Input } from "../UI";

const ForgotPasswordForm = ({
  handleSubmit,
  formData,
  setFormData,
  error,
  message,
  isLoading,
  onBack
}) => {
  return (
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
        className="flex items-center text-sm text-primary font-bold hover:underline decoration-2 mt-6"
        onClick={onBack}
      >
        <span className="mr-1"><ArrowLeft size={15} /></span> Back to Login
      </button>
    </form>
  );
};
export default ForgotPasswordForm;