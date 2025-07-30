import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import Dashboard from './pages/Dashboard';
import MainPage from './pages/MainPage';
import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from '@/components/theme-provider';
import Auth from "@/components/AuthLayout"
import { useDispatch } from "react-redux";
import {login as AuthLogin} from "@/store/authSlice"
import {getCurrentUser} from "@/connecting/index"
import { useEffect, useState } from 'react';

function App() {
  const dispatch = useDispatch();
  const [loading , setLoading] = useState(true);
  
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getCurrentUser();
        dispatch(AuthLogin(response.data));
      } catch (error) {
        console.error("Error fetching current user:", error);
      }
      finally {
        setLoading(false)
      }
    };
    fetchUser();
  }, [dispatch]);
  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <Router>
        <Routes>
          <Route path="/" element={<Auth authentication={false}><LandingPage /></Auth>} />
          <Route path="/login" element={<Auth authentication={false}><LoginPage /></Auth>} />
          <Route path="/signup" element={<Auth authentication={false}><SignupPage /></Auth>} />
          <Route path="/dashboard" element={<Auth authentication={true}><Dashboard /></Auth>} />
          <Route path="/jobs" element={<Auth authentication={true}><MainPage /></Auth>} />
        </Routes>
        <Toaster />
      </Router>
    </ThemeProvider>
  );
}

export default App;