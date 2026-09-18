import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../state/auth';

type Mode = 'sign-in' | 'sign-up';

const FIELD =
  'w-full px-4 py-3 rounded-2xl bg-slate-50/70 border border-slate-200/90 text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-800 transition-all';
const LABEL = 'block text-xs font-semibold text-slate-700 mb-1.5';
const TAB = 'flex-1 py-2.5 rounded-xl text-center text-sm transition-all duration-200';

export default function LoginPage() {
  const [mode, setMode] = useState<Mode>('sign-in');
  const [showPassword, setShowPassword] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const signingUp = mode === 'sign-up';

  const submit = (e: FormEvent) => {
    e.preventDefault();
    signIn();
    navigate('/app/dashboard');
  };

  return (
    <div className="stitch-gen bg-architectural min-h-screen flex items-center justify-center px-4 py-10 font-jakarta antialiased text-slate-900">
      <main className="w-full max-w-[440px]">
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/90 shadow-luxury">
          <div className="mb-8">
            <h1 className="text-2xl font-bold tracking-tight text-obsidian">{signingUp ? 'Create your account' : 'Sign in'}</h1>
            <p className="mt-1.5 text-sm text-slate-500">
              {signingUp ? 'Set up access to monitor your home’s water.' : 'Welcome back. Enter your details to continue.'}
            </p>
          </div>

          <div className="p-1 rounded-2xl bg-slate-100/90 border border-slate-200/60 flex items-center mb-8" role="tablist" aria-label="Sign in or create account">
            <button
              type="button"
              role="tab"
              aria-selected={!signingUp}
              onClick={() => setMode('sign-in')}
              className={`${TAB} ${!signingUp ? 'bg-obsidian text-white font-semibold shadow-sm' : 'text-slate-600 hover:text-slate-900 font-medium'}`}
            >
              Sign in
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={signingUp}
              onClick={() => setMode('sign-up')}
              className={`${TAB} ${signingUp ? 'bg-obsidian text-white font-semibold shadow-sm' : 'text-slate-600 hover:text-slate-900 font-medium'}`}
            >
              Create account
            </button>
          </div>

          <form onSubmit={submit} className="space-y-5">
            {signingUp && (
              <div>
                <label htmlFor="name" className={LABEL}>
                  Full name
                </label>
                <input id="name" name="name" type="text" autoComplete="name" required placeholder="Your name" className={FIELD} />
              </div>
            )}

            <div>
              <label htmlFor="email" className={LABEL}>
                Email address
              </label>
              <input id="email" name="email" type="email" autoComplete="email" required placeholder="you@example.com" className={FIELD} />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="password" className="block text-xs font-semibold text-slate-700">
                  Password
                </label>
                {!signingUp && (
                  <span className="text-xs text-slate-400">Password reset isn’t available in the demo</span>
                )}
              </div>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete={signingUp ? 'new-password' : 'current-password'}
                  required
                  placeholder={signingUp ? 'Create a password' : 'Enter your password'}
                  className={`${FIELD} pr-12`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-700 transition-colors"
                >
                  <span className="material-symbols-outlined text-[20px]">{showPassword ? 'visibility_off' : 'visibility'}</span>
                </button>
              </div>
            </div>

            {!signingUp && (
              <div className="flex items-center">
                <input id="remember" name="remember" type="checkbox" defaultChecked className="h-4 w-4 rounded border-slate-300 cursor-pointer" />
                <label htmlFor="remember" className="ml-2.5 text-sm text-slate-600 cursor-pointer">
                  Keep me signed in
                </label>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3.5 px-5 rounded-2xl bg-obsidian text-white font-medium text-sm shadow-lg shadow-slate-900/10 hover:bg-slate-800 active:scale-[0.99] transition-all duration-150"
            >
              {signingUp ? 'Create account' : 'Sign in'}
            </button>
          </form>
        </div>

        <p className="mt-6 text-center text-xs text-slate-400">Demo build: any email and password works, and nothing leaves your browser.</p>
      </main>
    </div>
  );
}
