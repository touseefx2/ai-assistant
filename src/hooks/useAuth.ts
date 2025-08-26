import { router } from 'expo-router';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { googleAuth } from '../services/auth';
import type { RootState } from '../state/store';
import { clearError, clearUser, setError, setLoading } from '../state/userSlice';

export const useAuth = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, user, isLoading, error } = useSelector(
    (state: RootState) => state.user
  );

  const signInWithGoogle = useCallback(async () => {
    try {
      dispatch(setLoading(true));
      dispatch(clearError());

      const result = await googleAuth.signIn();
      console.log("----> result : ",result)
      if (result.success && result.user) {
      
        // dispatch(setUser(result.user));
        // Navigate to main app after successful login
        // router.replace('/(main)/(drawer)');

        router.navigate("/onboarding");
      } else {
        dispatch(setError(result.error || 'Authentication failed'));
      }
    } catch (error) {
      dispatch(setError(error instanceof Error ? error.message : 'Unknown error occurred'));
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch]);

  const signOut = useCallback(async () => {
    try {
      await googleAuth.signOut();
      dispatch(clearUser());
      // Navigate back to auth screen
      router.replace('/(auth)');
    } catch (error) {
      console.error('Sign out error:', error);
    }
  }, [dispatch]);

  const clearAuthError = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  return {
    // State
    isAuthenticated,
    user,
    isLoading,
    error,
    
    // Actions
    signInWithGoogle,
    signOut,
    clearAuthError,
  };
};
