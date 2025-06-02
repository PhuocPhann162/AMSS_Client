import { Link } from 'react-router-dom';

export const Footer = () => {
  const navLinks = [
    {
      label: 'RETURNS POLICY',
      href: '/returns-policy',
    },
    {
      label: 'PRIVACY POLICY',
      href: '/privacy-policy',
    },
    {
      label: 'TERMS & CONDITIONS',
      href: '/terms-conditions',
    },
    {
      label: 'WARRANTY',
      href: '/warranty',
    },
  ];

  return (
    <footer className='flex flex-col justify-between gap-12 bg-[#191919] p-6 md:flex-row-reverse'>
      <nav>
        <ul className='flex flex-col gap-4 md:gap-2'>
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.href}
              className='text-xs text-white'
            >
              {link.label}
            </Link>
          ))}
        </ul>
      </nav>
      <div className='flex flex-col gap-5'>
        <p className='text-3xl font-bold text-white'>Novaris</p>
        <p className='text-xs font-medium text-white'>
          &copy; 2025 Novaris Team. All rights reserved.
        </p>
      </div>
    </footer>
  );
};
