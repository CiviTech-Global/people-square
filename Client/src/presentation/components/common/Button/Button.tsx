import React from 'react';
import * as S from './style';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

/**
 * Button Component
 * Reusable button with multiple variants, aligned with new design system
 */
const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  fullWidth = true,
  disabled = false,
  type = 'button',
  loading = false,
  icon,
  iconPosition = 'left',
}) => {
  return (
    <S.StyledButton
      onClick={onClick}
      variant={variant}
      size={size}
      fullWidth={fullWidth}
      disabled={disabled || loading}
      type={type}
    >
      {loading && <S.Spinner />}
      {!loading && icon && iconPosition === 'left' && <S.IconWrapper>{icon}</S.IconWrapper>}
      <span>{children}</span>
      {!loading && icon && iconPosition === 'right' && <S.IconWrapper>{icon}</S.IconWrapper>}
    </S.StyledButton>
  );
};

export default Button;

