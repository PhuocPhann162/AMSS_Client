import styled from 'styled-components';

const StyleAppNav = styled.nav`
  margin-top: 3rem;
  margin-bottom: 2rem;

  ul {
    list-style: none;
    display: flex;
    background-color: var(--color-dark--2);
    border-radius: 7px;
  }

  a:link,
  a:visited {
    display: block;
    color: inherit;
    text-decoration: none;
    text-transform: uppercase;
    font-size: 1.2rem;
    font-weight: 700;
    padding: 0.5rem 2rem;
    border-radius: 5px;
  }

  /* CSS Modules feature */
  a:global(.active) {
    background-color: var(--color-dark--0);
  }
`;

function AppNav() {
  return <StyleAppNav>AppNav</StyleAppNav>;
}

export default AppNav;
