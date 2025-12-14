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

export const AuthCard = styled.div`
  background: var(--color-white);
  border-radius: var(--radius-lg);
  padding: var(--spacing-xl) var(--spacing-xl) var(--spacing-2xl);
  width: 100%;
  max-width: 420px;
  box-shadow: var(--shadow-lg);
  position: relative;
  z-index: 1;

  @media (max-width: 480px) {
    padding: var(--spacing-lg);
    max-width: 100%;
  }
`;

export const BackButton = styled.button`
  background: none;
  border: none;
  color: var(--color-gray);
  font-size: 0.875rem;
  cursor: pointer;
  padding: var(--spacing-sm) 0;
  margin-bottom: var(--spacing-md);
  transition: color var(--transition-fast);

  &:hover {
    color: var(--color-dark);
  }
`;

export const AuthHeader = styled.div`
  text-align: center;
  margin-bottom: var(--spacing-xl);

  h2 {
    font-family: var(--font-display);
    font-size: 1.75rem;
    font-weight: 700;
    color: var(--color-dark);
    margin-top: var(--spacing-md);
    letter-spacing: -0.02em;
  }

  p {
    color: var(--color-gray);
    margin-top: var(--spacing-xs);
  }
`;

export const AuthForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
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

export const ForgotLink = styled.button`
  background: none;
  border: none;
  color: var(--color-blue);
  font-size: 0.875rem;
  cursor: pointer;
  text-align: right;
  padding: 0;
  margin-top: calc(var(--spacing-sm) * -1);
  transition: color var(--transition-fast);

  &:hover {
    text-decoration: underline;
  }
`;

export const AuthDivider = styled.div`
  display: flex;
  align-items: center;
  margin: var(--spacing-lg) 0;

  &::before,
  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: var(--color-gray-light);
  }

  span {
    padding: 0 var(--spacing-md);
    color: var(--color-gray);
    font-size: 0.875rem;
  }
`;

export const SocialButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-lg);
`;

export const AuthSwitch = styled.p`
  text-align: center;
  margin-top: var(--spacing-lg);
  color: var(--color-gray);
  font-size: 0.875rem;

  button {
    background: none;
    border: none;
    color: var(--color-blue);
    font-weight: 600;
    cursor: pointer;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export const ColorBar = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 6px;
  background: var(--gradient-full);
`;
