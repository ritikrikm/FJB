import { useEffect } from 'react';
import { User, useUser } from './useUser';
import { useLocalStorage } from './useLocalStorage';
import { supabase } from '../supabaseClient';

export const useAuth = () => {
  const { user, addUser, removeUser, setUser } = useUser();
  const { getItem } = useLocalStorage();

  // Check session on app start and listen for auth changes
  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        addUser({
          id: session.user.id,
          email: session.user.email!,
          name: session.user.user_metadata.full_name || 'User',
        });
      }
    };

    checkSession();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        addUser({
          id: session.user.id,
          email: session.user.email!,
          name: session.user.user_metadata.full_name || 'User',
        });
      } else {
        removeUser();
      }
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, [addUser, removeUser]);

  const login = (user : User) => addUser(user);
  const logout = () => removeUser();

  return { user, login, logout, setUser };
};
