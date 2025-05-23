import { jwtDecode } from 'jwt-decode';
import { SD_Roles } from '@/utils/SD';

const withAdminAndEmployeeAuth = (WrappedComponent: any) => {
  return (props: any) => {
    const accessToken = localStorage.getItem('access-token') ?? '';
    if (accessToken) {
      const decode: {
        role: string;
      } = jwtDecode(accessToken);
      if (decode.role !== SD_Roles.CLIENT && decode.role !== SD_Roles.ADMIN) {
        window.location.replace('/accessDenied');
        return null;
      }
    } else {
      window.location.replace('/login');
      return null;
    }
    return <WrappedComponent {...props} />;
  };
};

export default withAdminAndEmployeeAuth;
