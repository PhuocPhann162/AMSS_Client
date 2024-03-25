import styled from 'styled-components';
import { NavPage } from '~/components';

const StylePricing = styled.main`
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

function Pricing() {
  return (
    <StylePricing>
      <NavPage />
      <section>
        <div>
          <h2>
            Simple pricing.
            <br />
            Just $9/month.
          </h2>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vitae vel labore mollitia iusto. Recusandae quos
            provident, laboriosam fugit voluptatem iste.
          </p>
        </div>
        <img src='img-2.jpg' alt='overview of a large city with skyscrapers' />
      </section>
    </StylePricing>
  );
}

export default Pricing;
