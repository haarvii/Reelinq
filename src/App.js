import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from 'pages/Landing';
import Login from 'pages/Login/Login';
import NotFound from 'pages/NotFound';
import DashboardLayout from 'pages/Dashboard/DashboardLayout';
import PrivateRoute from 'pages/PrivateRoute';
import Dashboard from 'components/Dashboard/Dashboard';
import Gallery from 'pages/Gallery/Gallery';
import { Notifications } from 'pages/Notifications/Notifications';
import { History } from 'pages/History/History';
import Brands from 'pages/Brands/Brands';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <DashboardLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="history" element={<History />} />
          <Route path="brands" element={<Brands />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;