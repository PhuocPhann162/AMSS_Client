import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Button, NavPage } from '~/components';

const StyledLogin = styled.main`
  margin: 2.5rem;
  padding: 2.5rem 5rem;
  background-color: var(--color-dark--1);
  min-height: calc(100vh - 5rem);
`;

const FormLogin = styled.form`
  background-color: var(--color-dark--2);
  border-radius: 7px;
  padding: 2rem 3rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2rem;

  /* Different from other form */
  width: 48rem;
  margin: 8rem auto;
`;

const Row = styled.main`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('jack@example.com');
  const [password, setPassword] = useState('qwerty');
  return (
    <StyledLogin>
      <NavPage />
      <FormLogin>
        <Row>
          <label htmlFor='email'>Email address</label>
          <input type='email' id='email' onChange={(e) => setEmail(e.target.value)} value={email} />
        </Row>

        <Row>
          <label htmlFor='password'>Password</label>
          <input type='password' id='password' onChange={(e) => setPassword(e.target.value)} value={password} />
        </Row>

        <div>
          <Button type='primary'>Log in</Button>
        </div>
      </FormLogin>
    </StyledLogin>
  );
}

export default Login;
