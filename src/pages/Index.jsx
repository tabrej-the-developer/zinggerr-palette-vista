import { ThemeProvider } from '@/contexts/ThemeContext';
import Dashboard from './Dashboard';

const Index = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default Index;
