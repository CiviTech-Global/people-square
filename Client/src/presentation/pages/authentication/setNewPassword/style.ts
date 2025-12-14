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
`;

export const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: var(--spacing-lg);
`;

export const AuthCard = styled.div`
  background: var(--color-white);
  border-radius: var(--radius-lg);
  padding: var(--spacing-xl) var(--spacing-xl) var(--spacing-2xl);
  width: 100%;
  max-width: 420px;
  box-shadow: var(--shadow-lg);
  position: relative;
  z-index: 1;
  text-align: center;

  @media (max-width: 480px) {
    padding: var(--spacing-lg);
    max-width: 100%;
  }
`;

export const SuccessIcon = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: var(--spacing-lg);
  color: var(--color-green);
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
`;

export const AuthHeader = styled.div`
  text-align: center;
  margin-bottom: var(--spacing-xl);

  h2 {
    font-family: var(--font-display);
    font-size: 1.75rem;
    font-weight: 700;
    color: var(--color-dark);
    letter-spacing: -0.02em;
    margin-bottom: var(--spacing-xs);
  }

  p {
    color: var(--color-gray);
    margin-top: var(--spacing-xs);
    font-size: 0.95rem;
  }
`;

export const AuthForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-lg);
`;

export const ErrorAlert = styled.div`
  background: var(--color-error-bg);
  border: 1px solid var(--color-error-border);
  border-radius: var(--radius-md);
  padding: var(--spacing-md) var(--spacing-lg);
  margin-bottom: var(--spacing-lg);
  color: var(--color-error);
  font-size: 0.875rem;
  line-height: 1.5;
`;

export const ColorBar = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 6px;
  background: var(--gradient-full);
`;
