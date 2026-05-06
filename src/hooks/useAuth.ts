import { useState, useEffect, useCallback } from 'react';
import type { User, Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

interface AuthState {
  user: User | null;
  session: Session | null;
  loading: boolean;
}

export function useAuth() {
  const [auth, setAuth] = useState<AuthState>({ user: null, session: null, loading: true });

  useEffect(() => {
    if (!supabase) {
      setAuth({ user: null, session: null, loading: false }); // eslint-disable-line react-hooks/set-state-in-effect
      return;
    }

    supabase.auth.getSession().then(({ data: { session } }) => {
      setAuth({ user: session?.user ?? null, session, loading: false });
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setAuth({ user: session?.user ?? null, session, loading: false });
    });

    return () => subscription.unsubscribe();
  }, []);

  const signInWithGoogle = useCallback(async () => {
    if (!supabase) return;
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: window.location.origin },
    });
  }, []);

  const signOut = useCallback(async () => {
    if (!supabase) return;
    await supabase.auth.signOut();
  }, []);

  return { ...auth, signInWithGoogle, signOut };
}
