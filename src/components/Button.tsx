import styled from 'styled-components';

enum ButtonType {
  PRIMARY = 'primary',
  BACK = 'back',
  POSITION = 'position'
}

const StyledButton = styled.button<{ type?: string }>`
  color: inherit;
  text-transform: uppercase;
  padding: 0.8rem 1.6rem;
  font-family: inherit;
  font-size: 1.5rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  ${({ type }) => {
    switch (type) {
      case ButtonType.PRIMARY:
        return `
          font-weight: 700;
          background-color: var(--color-brand--2);
          color: var(--color-dark--1);
        `;
      case ButtonType.BACK:
        return `
          font-weight: 600;
          background: none;
          border: 1px solid currentColor;
        `;
      case ButtonType.POSITION:
        return `
          font-weight: 700;
          position: absolute;
          z-index: 1000;
          font-size: 1.4rem;
          bottom: 4rem;
          left: 50%;
          transform: translateX(-50%);
          background-color: var(--color-brand--2);
          color: var(--color-dark--1);
          box-shadow: 0 0.4rem 1.2rem rgba(36, 42, 46, 0.16);
        `;
      default:
        return '';
    }
  }}
`;

interface ButtonProps {
  children?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: string;
}

function Button({ children, onClick, type }: ButtonProps) {
  return (
    <StyledButton type={type} onClick={onClick}>
      {children}
    </StyledButton>
  );
}

export default Button;
