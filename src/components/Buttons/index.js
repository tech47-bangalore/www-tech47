import styled, { css, keyframes } from 'react-emotion';
import colors from '../../utils/colors';

const buttonBasic = css`
  width: 100%;
  padding: 0.5rem 1.25rem;
  border-radius: 5px;
  border: 2px solid ${colors.third};
`;

const stripeAnimation = keyframes`
  0%: { background-position: 0 0 };
  100%: { background-position: 30px 60px };
`;

const buttonPrimary = css`
  ${buttonBasic};
  background-color: ${colors.tech47pink};
  color: ${colors.third};
  transition: all 0.3s ease;

  &:hover, &:focus {
    cursor: pointer;
    background-color: ${colors.tech47purple};
    background-image: linear-gradient(45deg, rgba(0,0,0, 0.1) 25%, transparent 25%, transparent 50%, rgba(0,0,0, 0.1) 50%, rgba(0,0,0, 0.1) 75%, transparent 75%, transparent);
    color: ${colors.fifth};
    animation: ${stripeAnimation} 2.8s linear infinite;
  };
`;

const buttonSecondary = css`
  ${buttonBasic};
  background-color: ${colors.primary};
  color: ${colors.fifth};
  transition: all 0.3s ease;

  &:hover {
    background-color: ${colors.fifth};
    color: ${colors.primary};
    cursor: pointer;
  }
`;

const ButtonPrimary = styled.button`
  ${buttonPrimary};
`;

export const ButtonSecondary = styled.button`
  ${buttonSecondary};
`;

export default ButtonPrimary;
