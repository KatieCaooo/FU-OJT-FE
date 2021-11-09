import { Navigate } from 'react-router-dom';
import DashboardLayout from './components/DashboardLayout';
import MainLayout from './components/MainLayout';
import Account from './pages/Account';
import StudentList from './pages/StudentList';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import CompaniesList from './pages/CompaniesList';
import JobsList from './pages/JobsList';
import SemestersList from './pages/SemestersList';
import MajorList from './pages/MajorList';
import EvaluationList from './pages/EvaluationList';
import Register from './pages/Register';
import Settings from './pages/Settings';

const routes = (isLoggedIn, isAdmin) => [
  {
    path: 'app',
    element: isLoggedIn ? <DashboardLayout /> : <Navigate to="/login" />,
    children: [
      { path: 'account', element: <Account /> },
      { path: 'students', element: isAdmin ? <StudentList /> : <Navigate to="/" /> },
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'companies', element: <CompaniesList /> },
      { path: 'jobs', element: <JobsList /> },
      { path: 'semesters', element: <SemestersList /> },
      { path: 'majors', element: <MajorList /> },
      { path: 'evaluations', element: <EvaluationList /> },
      { path: 'settings', element: <Settings /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: 'login', element: !isLoggedIn ? <Login /> : <Navigate to="/" /> },
      { path: 'register', element: <Register /> },
      { path: '404', element: <NotFound /> },
      { path: '/', element: <Navigate to="/app/dashboard" /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  }
];

export default routes;
