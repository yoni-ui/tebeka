import { RegisterForm } from "@/modules/auth/RegisterForm";

export default function RegisterPage() {
  return (
    <div>
      <h1 className="font-headline text-2xl font-bold text-on-surface">Create account</h1>
      <p className="mt-1 text-sm text-on-surface-variant font-body">Start with Tebeka Legal.</p>
      <div className="mt-8">
        <RegisterForm />
      </div>
    </div>
  );
}
