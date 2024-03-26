import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, NavPage } from '~/components';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('jack@example.com');
  const [password, setPassword] = useState('qwerty');

  return (
    <form className='bg-dark-2 rounded-lg p-8 max-w-lg mx-auto' onSubmit={(e) => e.preventDefault()}>
      <div className='flex flex-col gap-4'>
        <label htmlFor='email' className='text-lg'>
          Email address
        </label>
        <input
          type='email'
          id='email'
          className='w-full text-stone-900 py-2 px-4 rounded border-none bg-light-3 focus:bg-white transition duration-200'
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </div>

      <div className='flex flex-col gap-4 mt-4'>
        <label htmlFor='password' className='text-lg'>
          Password
        </label>
        <input
          type='password'
          id='password'
          className='w-full text-stone-900 py-2 px-4 rounded border-none bg-light-3 focus:bg-white transition duration-200'
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </div>

      <div className='mt-6'>
        <Button type='primary'>Log in</Button>
      </div>
    </form>
  );
}

export default Login;
