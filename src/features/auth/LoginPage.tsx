import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../state/auth';

export default function LoginPage() {
  const [mode, setMode] = useState<'sign-in' | 'sign-up'>('sign-in');
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    signIn();
    navigate('/app/dashboard');
  };

  return (
    <div className="min-h-screen bg-ink flex items-center justify-center px-6 font-body">
      <div className="w-full max-w-sm">
        <div className="flex items-center gap-2.5 mb-8 justify-center">
          <span className="w-2.5 h-2.5 rounded-full bg-aqua" />
          <span className="font-display font-semibold text-mist text-lg">Smart Water Flow</span>
        </div>

        <div className="bg-ink2 rounded-2xl border border-steel/20 p-6">
          <div className="flex gap-1 mb-6 rounded-lg bg-ink p-1">
            <button
              type="button"
              onClick={() => setMode('sign-in')}
              className={`flex-1 rounded-md py-2 text-sm font-medium transition-colors ${mode === 'sign-in' ? 'bg-aqua text-ink' : 'text-steel'}`}
            >
              Sign in
            </button>
            <button
              type="button"
              onClick={() => setMode('sign-up')}
              className={`flex-1 rounded-md py-2 text-sm font-medium transition-colors ${mode === 'sign-up' ? 'bg-aqua text-ink' : 'text-steel'}`}
            >
              Create account
            </button>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {mode === 'sign-up' && (
              <label className="flex flex-col gap-1.5">
                <span className="text-xs text-steel">Full name</span>
                <input required className="rounded-lg bg-ink border border-steel/30 px-3 py-2 text-mist text-sm outline-none focus:border-aqua" type="text" />
              </label>
            )}
            <label className="flex flex-col gap-1.5">
              <span className="text-xs text-steel">Email</span>
              <input required className="rounded-lg bg-ink border border-steel/30 px-3 py-2 text-mist text-sm outline-none focus:border-aqua" type="email" />
            </label>
            <label className="flex flex-col gap-1.5">
              <span className="text-xs text-steel">Password</span>
              <input required className="rounded-lg bg-ink border border-steel/30 px-3 py-2 text-mist text-sm outline-none focus:border-aqua" type="password" minLength={8} />
            </label>

            {mode === 'sign-in' && (
              <button type="button" className="text-xs text-steel text-left hover:text-aqua transition-colors">
                Forgot password? (not available in this demo)
              </button>
            )}

            <button type="submit" className="mt-2 rounded-lg bg-aqua text-ink font-medium py-2.5 text-sm hover:bg-mist transition-colors">
              {mode === 'sign-in' ? 'Sign in' : 'Create account'}
            </button>
          </form>
        </div>

        <p className="text-xs text-steel text-center mt-4">
          This is a demo. No account data leaves your browser.
        </p>
      </div>
    </div>
  );
}
