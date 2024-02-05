import { MemoryRouter as Router } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import { DashboardLayout } from './components/dashboard.layout';
import { AppRoute } from './route.app';


export const AppRoot = () => {
  return (
    <Router>
      <CssBaseline />
      <DashboardLayout>
        <AppRoute/>
      </DashboardLayout>
    </Router>
  );
}
