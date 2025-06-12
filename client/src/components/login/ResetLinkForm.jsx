import { ArrowLeft, Mail } from "lucide-react";

const ResetLinkForm = ({ email, onBack }) => {
  return (
    <div className="text-start space-y-4">
      <Mail size={60} className="text-primary" />
      <h1 className="text-xl font-semibold">Check Your Email</h1>
      <p>
        If an account exists for <strong>{email}</strong>, <br />
        you’ll receive a link to reset your password. <br />
        Please check your inbox.
      </p>
      <button
        type="button"
        className="flex items-center text-sm mt-6 text-primary font-bold hover:underline decoration-2"
        onClick={onBack}
      >
        <ArrowLeft size={15} className="mr-1" /> Back to Login
      </button>
    </div>
  );
};
export default ResetLinkForm;