import { Navigate, Outlet } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const PrivateRoute = ({ isAuth, redirectPath = '/login' }: any) => {
  if (!isAuth) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;