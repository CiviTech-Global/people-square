import styled from 'styled-components';

export const LogoSVG = styled.svg`
  animation: logoFloat 3s ease-in-out infinite;
  filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.15));
  display: block;

  @keyframes logoFloat {
    0%,
    100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-6px);
    }
  }
`;

