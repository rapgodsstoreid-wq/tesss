import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { User } from '../types';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      return;
    }

    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        const { data } = await supabase
          .from('users')
          .select('*')
          .eq('id', session.user.id)
          .single();
        
        setUser(data);
      }
    } catch (error) {
      console.error('Error checking user:', error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (userId: string, password: string) => {
    try {
      // In a real implementation, you'd use proper authentication
      // For this demo, we'll simulate login by finding user in database
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error || !data) {
        throw new Error('Invalid credentials');
      }

      // Simulate session creation
      setUser(data);
      localStorage.setItem('currentUser', JSON.stringify(data));
      return { success: true };
    } catch (error) {
      return { success: false, error: (error as Error).message };
    }
  };

  const logout = async () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  return { user, loading, login, logout };
};