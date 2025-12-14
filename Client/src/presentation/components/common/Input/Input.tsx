import React from 'react';
import * as S from './style';

interface InputProps {
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  icon?: React.ReactNode;
  disabled?: boolean;
  error?: boolean;
  helperText?: string;
  required?: boolean;
  autoComplete?: string;
  onKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

/**
 * Input Component
 * Reusable input field with optional icon, aligned with new design system
 */
const Input: React.FC<InputProps> = ({
  type = 'text',
  placeholder,
  value,
  onChange,
  icon,
  disabled = false,
  error = false,
  helperText,
  required = false,
  autoComplete,
  onKeyPress,
}) => {
  return (
    <S.InputContainer>
      <S.InputWrapper error={error} hasIcon={!!icon}>
        {icon && <S.InputIcon>{icon}</S.InputIcon>}
        <S.StyledInput
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyPress={onKeyPress}
          disabled={disabled}
          required={required}
          autoComplete={autoComplete}
          hasIcon={!!icon}
          error={error}
        />
      </S.InputWrapper>
      {helperText && <S.HelperText error={error}>{helperText}</S.HelperText>}
    </S.InputContainer>
  );
};

export default Input;

