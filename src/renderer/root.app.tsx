import { MemoryRouter as Router } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import { DashboardLayout } from './components/dashboard.layout';
import { AppRoute } from './route.app';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      refetchOnReconnect: false,
      retry: false,
      staleTime: 0,
    },
  }
});

export const AppRoot = () => {
  return (
    <Router>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <DashboardLayout>
          <AppRoute />
        </DashboardLayout>
      </QueryClientProvider>
    </Router >
  );
}
