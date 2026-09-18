import { useNavigate } from 'react-router-dom';
import { useAuth } from '../state/auth';

/** Actions behind the sidebar footer links present on every exported screen. */
export function useShellActions() {
  const { switchRole, signOut } = useAuth();
  const navigate = useNavigate();
  return {
    toAdmin: () => {
      switchRole();
      navigate('/admin/overview');
    },
    toCustomer: () => {
      switchRole();
      navigate('/app/dashboard');
    },
    signOutNow: () => {
      signOut();
      navigate('/');
    },
  };
}
