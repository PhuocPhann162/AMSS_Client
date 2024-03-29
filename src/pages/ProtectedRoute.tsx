import { useNavigate } from 'react-router-dom';
import { ReactNode, useEffect, useState } from 'react';

const ProtectedRoute: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  return isAuthenticated ? children : null;
};

export default ProtectedRoute;
