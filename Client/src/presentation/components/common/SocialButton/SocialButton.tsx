import React from 'react';
import styled from 'styled-components';
import { Chrome, Github, Linkedin } from 'lucide-react';

interface SocialButtonProps {
  provider: 'google' | 'github' | 'linkedin';
  onClick?: () => void;
  disabled?: boolean;
}

const StyledSocialButton = styled.button<{ disabled?: boolean }>`
  width: 56px;
  height: 56px;
  border-radius: var(--radius-md);
  border: 1px solid var(--color-gray-light);
  background: var(--color-white);
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all var(--transition-fast);
  opacity: ${(props) => (props.disabled ? 0.6 : 1)};

  &:hover:not(:disabled) {
    border-color: var(--color-gray);
    transform: translateY(-1px);
    box-shadow: var(--shadow-md);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:focus-visible {
    outline: 2px solid var(--color-blue);
    outline-offset: 2px;
  }

  svg {
    width: 24px;
    height: 24px;
    color: var(--color-dark);
  }
`;

export const SocialButton: React.FC<SocialButtonProps> = ({
  provider,
  onClick,
  disabled = false,
}) => {
  const getIcon = () => {
    switch (provider) {
      case 'google':
        return <Chrome />;
      case 'github':
        return <Github />;
      case 'linkedin':
        return <Linkedin />;
    }
  };

  const getLabel = () => {
    switch (provider) {
      case 'google':
        return 'Sign in with Google';
      case 'github':
        return 'Sign in with GitHub';
      case 'linkedin':
        return 'Sign in with LinkedIn';
    }
  };

  return (
    <StyledSocialButton
      onClick={onClick}
      disabled={disabled}
      title={getLabel()}
      aria-label={getLabel()}
    >
      {getIcon()}
    </StyledSocialButton>
  );
};

export default SocialButton;

