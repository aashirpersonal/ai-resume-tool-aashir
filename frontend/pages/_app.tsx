// File: frontend/pages/_app.tsx

import { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { store } from '../store';
import { useAuth } from '../hooks/useAuth';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <AuthWrapper>
        <Component {...pageProps} />
      </AuthWrapper>
    </Provider>
  );
}

const AuthWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useAuth();
  return <>{children}</>;
};

export default MyApp;