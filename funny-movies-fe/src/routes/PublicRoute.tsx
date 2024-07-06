import { Navigate, Outlet } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const PublicStrictRoute = ({ isAuth, redirectPath = '/' }: any) => {
  if (isAuth) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};

export default PublicStrictRoute;