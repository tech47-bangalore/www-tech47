import styled, { css } from 'react-emotion';
import colors from '../../utils/colors';

const buttonBasic = css`
  width: 100%;
  padding: 0.5rem 1.25rem;
  border-radius: 5px;
  border: 2px solid ${colors.third};
`;

const buttonPrimary = css`
  ${buttonBasic};
  background-color: ${colors.light};
  color: ${colors.third};
  transition: all 0.3s ease;

  &:hover {
    background-color: ${colors.primary};
    color: ${colors.fifth};
    cursor: pointer;
  }
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
