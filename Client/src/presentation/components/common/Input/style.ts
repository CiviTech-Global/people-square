import styled from 'styled-components';

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
  width: 100%;
`;

interface InputWrapperProps {
  error?: boolean;
  hasIcon?: boolean;
}

export const InputWrapper = styled.div<InputWrapperProps>`
  position: relative;
  display: flex;
  align-items: center;
  background: var(--color-white);
  border: 1px solid ${(props) => (props.error ? 'var(--color-error)' : 'var(--color-gray-light)')};
  border-radius: var(--radius-md);
  transition: all var(--transition-fast);
  overflow: hidden;

  &:focus-within {
    border-color: ${(props) => (props.error ? 'var(--color-error)' : 'var(--color-blue)')};
    box-shadow: 0 0 0 3px ${(props) => (props.error ? 'rgba(230, 57, 70, 0.1)' : 'rgba(74, 144, 217, 0.1)')};
  }

  &:hover:not(:focus-within) {
    border-color: ${(props) => (props.error ? 'var(--color-error)' : 'var(--color-gray)')};
  }
`;

export const InputIcon = styled.span`
  position: absolute;
  left: var(--spacing-md);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-gray);
  pointer-events: none;
  z-index: 1;

  svg {
    width: 20px;
    height: 20px;
  }
`;

interface StyledInputProps {
  hasIcon?: boolean;
  error?: boolean;
}

export const StyledInput = styled.input<StyledInputProps>`
  width: 100%;
  padding: var(--spacing-md) var(--spacing-lg);
  padding-left: ${(props) => (props.hasIcon ? 'calc(var(--spacing-lg) + 20px + var(--spacing-sm))' : 'var(--spacing-lg)')};
  background: transparent;
  border: none;
  outline: none;
  font-size: 0.95rem;
  font-family: var(--font-body);
  color: var(--color-dark);
  transition: color var(--transition-fast);
  line-height: 1.5;

  &::placeholder {
    color: var(--color-gray);
    opacity: 0.6;
    transition: opacity var(--transition-fast);
  }

  &:focus::placeholder {
    opacity: 0.4;
  }

  &:disabled {
    background: var(--color-gray-light);
    color: var(--color-gray);
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

interface HelperTextProps {
  error?: boolean;
}

export const HelperText = styled.span<HelperTextProps>`
  font-size: 0.8rem;
  color: ${(props) => (props.error ? 'var(--color-error)' : 'var(--color-gray)')};
  padding: 0 var(--spacing-xs);
  min-height: 16px;
  line-height: 1.4;
  margin-top: var(--spacing-xs);
`;

