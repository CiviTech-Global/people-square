import styled from 'styled-components';

export const Screen = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-lg);
  background: var(--gradient-background);
  position: relative;
`;

export const AuthCard = styled.div`
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(10, 94, 176, 0.1);
  border-radius: var(--radius-lg);
  padding: var(--spacing-xl) var(--spacing-xl) var(--spacing-2xl);
  width: 100%;
  max-width: 480px;
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
    color: var(--color-primary);
  }
`;

export const AuthHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-bottom: var(--spacing-xl);

  > svg {
    margin: 0 auto;
  }

  h2 {
    font-family: var(--font-display);
    font-size: 1.75rem;
    font-weight: 700;
    color: var(--color-darker);
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

export const StepIndicator = styled.div`
  display: flex;
  justify-content: center;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-lg);
`;

export const StepDot = styled.div<{ $active?: boolean; $completed?: boolean }>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  transition: all var(--transition-fast);
  background: ${(p) =>
    p.$active
      ? 'var(--color-primary)'
      : p.$completed
      ? 'var(--color-accent)'
      : 'var(--color-gray-light)'};
  transform: ${(p) => (p.$active ? 'scale(1.2)' : 'scale(1)')};
`;

export const RoleGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-lg);
`;

export const RoleCard = styled.button<{ $selected?: boolean }>`
  background: ${(p) =>
    p.$selected ? 'rgba(10, 94, 176, 0.08)' : 'var(--color-white)'};
  border: 2px solid
    ${(p) => (p.$selected ? 'var(--color-primary)' : 'var(--color-gray-light)')};
  border-radius: var(--radius-md);
  padding: var(--spacing-lg);
  cursor: pointer;
  transition: all var(--transition-fast);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: var(--spacing-sm);

  &:hover {
    border-color: var(--color-primary);
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
  }

  svg {
    color: ${(p) =>
      p.$selected ? 'var(--color-primary)' : 'var(--color-gray)'};
    width: 32px;
    height: 32px;
  }

  span {
    font-weight: 600;
    font-size: 0.875rem;
    color: ${(p) =>
      p.$selected ? 'var(--color-primary)' : 'var(--color-dark)'};
  }

  small {
    font-size: 0.75rem;
    color: var(--color-gray);
  }
`;

export const TermsCheck = styled.div`
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-md);
  font-size: 0.875rem;
  color: var(--color-gray);
  margin-top: var(--spacing-sm);

  input[type='checkbox'] {
    width: 18px;
    height: 18px;
    margin-top: 2px;
    accent-color: var(--color-primary);
    cursor: pointer;
  }

  label {
    cursor: pointer;
  }

  a {
    color: var(--color-primary);
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
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
    color: var(--color-primary);
    font-weight: 600;
    cursor: pointer;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;
