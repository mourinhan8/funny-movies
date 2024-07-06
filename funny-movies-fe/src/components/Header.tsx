import React from 'react';
import { Button } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';

interface HeaderProps {
  isAuth: boolean;
  email: string;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({isAuth, email, onLogout}) => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col md:flex-row items-center justify-between p-4 border-b-2">
      <div className="flex items-center mb-4 md:mb-0">
        <HomeOutlined style={{ fontSize: '24px', marginRight: '8px' }} />
        <Link to="/" className="text-2xl font-bold">Funny Movies</Link>
      </div>
      <div className="flex flex-col md:flex-row items-center space-x-2">
        {isAuth ?
          <>
            <span>Welcome {email}</span>
            <Link to="/share" className="mt-2 md:mt-0 md:ml-4">
              <Button type="primary">Share a movie</Button>
            </Link>
            <Button onClick={onLogout} className="mt-2 md:mt-0 md:ml-4">Logout</Button>
          </>
          :
          <>
            <Button
              onClick={() => navigate('/login')}
              type='link'
              className="mt-2 md:mt-0 md:ml-4">
              Login
            </Button>
            <Button
              onClick={() => navigate('/register')}
              className="mt-2 md:mt-0 md:ml-4">
              Register
            </Button>
          </>
        }
      </div>
    </div>
  );
};

export default Header;
