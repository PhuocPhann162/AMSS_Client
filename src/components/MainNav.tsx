import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const StyleNav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: var(--color-dark--0);

  ul {
    list-style: none;
    display: flex;
    align-items: center;
    gap: 4rem;
  }

  a:link,
  a:visited {
    text-decoration: none;
    color: var(--color-light--2);
    text-transform: uppercase;
    font-size: 1.5rem;
    font-weight: 600;
  }

  a:global(.active) {
    color: var(--color-brand--2);
  }
`;

function MainNav() {
  return (
    <StyleNav>
      <ul>
        <li>
          <NavLink to='/'>Home</NavLink>
        </li>
        <li>
          <NavLink to='/product'>Product</NavLink>
        </li>
        <li>
          <NavLink to='/pricing'>Pricing</NavLink>
        </li>
      </ul>
    </StyleNav>
  );
}

export default MainNav;
