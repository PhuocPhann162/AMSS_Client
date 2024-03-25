import styled from 'styled-components';
import { MainNav } from '~/components';

const StyleProduct = styled.div`
  color: red;
`;

export default function Product() {
  return (
    <div>
      <MainNav />
      <StyleProduct>
        <h1>Product</h1>
      </StyleProduct>
    </div>
  );
}
