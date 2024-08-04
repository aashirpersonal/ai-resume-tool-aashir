// File: frontend/hooks/useAuth.ts

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store';

export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isAuthenticated, token } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (token && !isAuthenticated) {
      // Here you would typically validate the token with your backend
      // For now, we'll just set isAuthenticated to true if a token exists
      dispatch({ type: 'auth/setAuthenticated', payload: true });
    }
  }, [dispatch, isAuthenticated, token]);

  return { isAuthenticated, token };
};