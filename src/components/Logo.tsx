import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyleLogo = styled.img`
  height: 5.2rem;
`;

function Logo() {
  return (
    <Link to='/'>
      <StyleLogo src='/logo.png' alt='WorldWise logo' />
    </Link>
  );
}

export default Logo;
