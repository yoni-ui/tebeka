import { ForgotPasswordForm } from "@/modules/auth/ForgotPasswordForm";

export default function ForgotPasswordPage() {
  return (
    <div>
      <h1 className="font-headline text-2xl font-bold text-on-surface">Reset password</h1>
      <p className="mt-1 text-sm text-on-surface-variant font-body">We will email you a link.</p>
      <div className="mt-8">
        <ForgotPasswordForm />
      </div>
    </div>
  );
}
