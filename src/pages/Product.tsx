import styled from 'styled-components';
import { NavPage } from '~/components';

const StyleProduct = styled.div`
  margin: 2.5rem;
  padding: 2.5rem 5rem;
  background-color: var(--color-dark--1);
  min-height: calc(100vh - 5rem);

  section {
    width: clamp(80rem, 80%, 90rem);
    margin: 6rem auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 7rem;
    align-items: center;
  }

  img {
    width: 100%;
  }

  h2 {
    font-size: 4rem;
    line-height: 1.2;
    margin-bottom: 3rem;
  }

  p {
    font-size: 1.6rem;
    margin-bottom: 2rem;
  }

  section a {
    margin-top: 2rem;
  }
`;

export default function Product() {
  return (
    <StyleProduct>
      <NavPage />
      <section>
        <img src='img-1.jpg' alt='person with dog overlooking mountain with sunset' />
        <div>
          <h2>About WorldWide.</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo est dicta illum vero culpa cum quaerat
            architecto sapiente eius non soluta, molestiae nihil laborum, placeat debitis, laboriosam at fuga
            perspiciatis?
          </p>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corporis doloribus libero sunt expedita ratione
            iusto, magni, id sapiente sequi officiis et.
          </p>
        </div>
      </section>
    </StyleProduct>
  );
}
