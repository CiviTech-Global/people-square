import styled from 'styled-components';

export const Screen = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-lg);
  background: linear-gradient(180deg, var(--color-light) 0%, #e8ecf0 100%);
  position: relative;
  overflow: hidden;
`;

export const LandingContent = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  max-width: 400px;
  width: 100%;
`;

export const LogoContainer = styled.div`
  margin-bottom: var(--spacing-3xl);
`;

export const BrandName = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--color-dark);
  margin-top: var(--spacing-lg);
  letter-spacing: -0.02em;
  font-family: var(--font-display);

  @media (max-width: 768px) {
    font-size: 2rem;
  }

  @media (max-width: 480px) {
    font-size: 1.75rem;
  }
`;

export const Tagline = styled.p`
  font-size: 1.1rem;
  color: var(--color-gray);
  margin-top: var(--spacing-sm);
  font-weight: 400;

  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

export const QuadrantDecoration = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4px;
  width: 60px;
  height: 60px;
  margin: var(--spacing-xl) 0;
  opacity: 0.3;
  animation: pulse 4s ease-in-out infinite;

  @keyframes pulse {
    0%,
    100% {
      opacity: 0.3;
      transform: scale(1);
    }
    50% {
      opacity: 0.5;
      transform: scale(1.05);
    }
  }
`;

interface QuadProps {
  quadColor?: 'red' | 'yellow' | 'green' | 'blue';
}

const getQuadColor = (color?: string) => {
  switch (color) {
    case 'red':
      return '#E63946';
    case 'yellow':
      return '#F4B942';
    case 'green':
      return '#2D9E49';
    case 'blue':
      return '#4A90D9';
    default:
      return '#6b7280';
  }
};

export const Quad = styled.div<QuadProps>`
  border-radius: var(--radius-sm);
  background: ${(props) => getQuadColor(props.quadColor)};
`;

export const LandingButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
  width: 100%;
  max-width: 280px;
`;

export const LandingFooter = styled.p`
  margin-top: var(--spacing-3xl);
  color: var(--color-gray);
  font-size: 0.875rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
`;
