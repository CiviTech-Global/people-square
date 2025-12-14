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

  @media (max-width: 480px) {
    padding: var(--spacing-lg);
    max-width: 100%;
  }
`;

export const ProgressBar = styled.div`
  height: 4px;
  background: var(--color-gray-light);
  border-radius: var(--radius-full);
  margin-bottom: var(--spacing-xl);
  overflow: hidden;
`;

export const ProgressFill = styled.div`
  height: 100%;
  width: 75%;
  background: var(--gradient-cool);
  border-radius: var(--radius-full);
  animation: progressGrow 0.8s ease-out;

  @keyframes progressGrow {
    from {
      width: 50%;
    }
    to {
      width: 75%;
    }
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
    letter-spacing: -0.02em;
    margin-bottom: var(--spacing-xs);
  }

  p {
    color: var(--color-gray);
    margin-top: var(--spacing-xs);
  }
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

export const AvatarUpload = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: var(--spacing-xl);
`;

export const AvatarPlaceholder = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--color-gray-light) 0%, #d1d5db 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-gray);
  margin-bottom: var(--spacing-md);
`;

export const AvatarBtn = styled.button`
  background: none;
  border: none;
  color: var(--color-dark);
  font-weight: 600;
  cursor: pointer;
  font-size: 0.875rem;
  transition: color var(--transition-fast);

  &:hover {
    text-decoration: underline;
  }
`;

export const AuthForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
`;

export const RoleSelection = styled.div`
  margin: var(--spacing-md) 0;
`;

export const RoleLabel = styled.label`
  display: block;
  font-weight: 500;
  color: var(--color-dark);
  margin-bottom: var(--spacing-md);
`;

export const RoleGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-md);

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

interface RoleCardProps {
  isSelected?: boolean;
  accentColor?: string;
}

export const RoleCard = styled.button<RoleCardProps>`
  padding: var(--spacing-md);
  border: 2px solid ${(props) => (props.isSelected ? props.accentColor : 'var(--color-gray-light)')};
  border-radius: var(--radius-md);
  background: ${(props) =>
    props.isSelected
      ? `rgba(${props.accentColor}, 0.05)`
      : 'var(--color-white)'};
  cursor: pointer;
  text-align: center;
  transition: all var(--transition-fast);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-xs);

  &:hover {
    border-color: ${(props) => props.accentColor || 'var(--color-gray)'};
    transform: translateY(-1px);
    box-shadow: var(--shadow-sm);
  }

  ${(props) =>
    props.isSelected &&
    `
    box-shadow: 0 0 0 4px rgba(${props.accentColor || '26, 26, 26'}, 0.1);
  `}
`;

export const RoleIcon = styled.div`
  font-size: 1.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const RoleName = styled.span`
  font-weight: 600;
  font-size: 0.875rem;
  color: var(--color-dark);
`;

export const RoleDesc = styled.span`
  font-size: 0.75rem;
  color: var(--color-gray);
`;

export const SkipBtn = styled.button`
  display: block;
  width: 100%;
  text-align: center;
  margin-top: var(--spacing-lg);
  background: none;
  border: none;
  color: var(--color-gray);
  font-size: 0.875rem;
  cursor: pointer;
  transition: color var(--transition-fast);

  &:hover {
    color: var(--color-dark);
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
