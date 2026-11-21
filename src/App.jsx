import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import { AuthProvider } from './context/AuthProvider';
import { useAuth } from './context/authContext';
import Journal from './pages/Journal';
import Collection from './pages/Collection';
import Home from './pages/Home';
import ScentFinder from './pages/ScentFinder';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Register from './pages/Register';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';

function AdminOnly({ children }) {
  const { user } = useAuth();
  const location = useLocation();

  return user?.role === 'admin'
    ? children
    : <Navigate to="/admin/login" replace state={{ from: location.pathname }} />;
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="dashboard" element={<Home />} />
            <Route path="collection" element={<Collection />} />
            <Route path="scent-finder" element={<ScentFinder />} />
            <Route path="journal" element={<Journal />} />
            <Route path="courses" element={<Navigate to="/collection" replace />} />
            <Route path="grades" element={<Navigate to="/scent-finder" replace />} />
            <Route path="announcements" element={<Navigate to="/journal" replace />} />
            <Route path="profile" element={<Profile />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="admin/login" element={<AdminLogin />} />
            <Route path="admin" element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="admin/dashboard" element={<AdminOnly><AdminDashboard /></AdminOnly>} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
