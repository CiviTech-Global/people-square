import React, { useRef } from 'react';
import * as S from './style';

interface CodeInputProps {
  value: string[];
  onChange: (value: string[]) => void;
  numInputs?: number;
}

/**
 * Code Input Component for verification
 * Allows entering a code with auto-focus between inputs
 */
const CodeInput: React.FC<CodeInputProps> = ({ value, onChange, numInputs = 6 }) => {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, digit: string) => {
    // Only allow single digit
    if (digit.length <= 1 && /^\d*$/.test(digit)) {
      const newValue = [...value];
      newValue[index] = digit;
      onChange(newValue);

      // Auto-focus next input if digit is entered
      if (digit && index < numInputs - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Handle backspace navigation
    if (e.key === 'Backspace' && !value[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }

    // Handle arrow keys
    if (e.key === 'ArrowRight' && index < numInputs - 1) {
      inputRefs.current[index + 1]?.focus();
    }
    if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <S.CodeInputContainer>
      {Array.from({ length: numInputs }).map((_, index) => (
        <S.StyledCodeInput
          key={index}
          ref={(el) => {
            inputRefs.current[index] = el;
          }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={value[index] || ''}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          placeholder="-"
        />
      ))}
    </S.CodeInputContainer>
  );
};

export default CodeInput;

