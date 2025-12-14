import styled from 'styled-components';

export const CodeInputContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: var(--spacing-md);
  margin: var(--spacing-lg) 0;
  flex-wrap: wrap;
`;

export const StyledCodeInput = styled.input`
  width: 48px;
  height: 56px;
  text-align: center;
  font-size: 1.5rem;
  font-weight: 600;
  font-family: var(--font-display);
  border: 1px solid var(--color-gray-light);
  border-radius: var(--radius-md);
  background: var(--color-white);
  color: var(--color-dark);
  transition: all var(--transition-fast);
  outline: none;

  &:focus {
    border-color: var(--color-blue);
    box-shadow: 0 0 0 3px rgba(74, 144, 217, 0.1);
    background: var(--color-white);
  }

  &:hover:not(:focus) {
    border-color: var(--color-gray);
  }

  &::placeholder {
    color: var(--color-gray-light);
  }

  @media (max-width: 480px) {
    width: 42px;
    height: 50px;
    font-size: 1.25rem;
    gap: var(--spacing-sm);
  }
`;

