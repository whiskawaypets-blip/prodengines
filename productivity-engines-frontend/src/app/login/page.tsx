import AuthForm from '@/components/auth/AuthForm';

export const metadata = {
  title: 'Login - Productivity Engines',
  description: 'Sign in to your Productivity Engines account',
};

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h1 className="text-center text-3xl font-extrabold text-gray-900">
            Productivity Engines
          </h1>
          <p className="mt-2 text-center text-sm text-gray-600">
            Sign in to access your dashboard
          </p>
        </div>
        
        <AuthForm />
      </div>
    </div>
  );
} 