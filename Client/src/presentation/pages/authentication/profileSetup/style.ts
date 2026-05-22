import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

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

export const SetupCard = styled.div`
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(10, 94, 176, 0.1);
  border-radius: var(--radius-lg);
  padding: var(--spacing-xl) var(--spacing-xl) var(--spacing-2xl);
  width: 100%;
  max-width: 520px;
  box-shadow: var(--shadow-lg);
  position: relative;
  z-index: 1;
  animation: ${fadeIn} 0.4s ease-out;

  @media (max-width: 480px) {
    padding: var(--spacing-lg);
    max-width: 100%;
  }
`;

export const StepIndicator = styled.div`
  display: flex;
  justify-content: center;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-xl);
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
  transform: ${(p) => (p.$active ? 'scale(1.3)' : 'scale(1)')};
  cursor: ${(p) => (p.$completed ? 'pointer' : 'default')};
`;

export const StepTitle = styled.h2`
  font-family: var(--font-display);
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--color-darker);
  text-align: center;
  letter-spacing: -0.02em;
  margin-bottom: var(--spacing-xs);
`;

export const StepDescription = styled.p`
  color: var(--color-gray);
  text-align: center;
  margin-bottom: var(--spacing-xl);
  font-size: 0.95rem;
`;

export const AvatarUpload = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: var(--spacing-xl);
`;

export const AvatarPreview = styled.div<{ $hasImage?: boolean }>`
  width: 110px;
  height: 110px;
  border-radius: 50%;
  background: ${(p) =>
    p.$hasImage
      ? 'transparent'
      : 'linear-gradient(135deg, rgba(10, 94, 176, 0.08) 0%, rgba(45, 212, 160, 0.08) 100%)'};
  border: 3px dashed
    ${(p) => (p.$hasImage ? 'var(--color-accent)' : 'rgba(10, 94, 176, 0.25)')};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all var(--transition-fast);
  overflow: hidden;
  position: relative;
  margin-bottom: var(--spacing-sm);

  &:hover {
    border-color: var(--color-primary);
    transform: scale(1.03);
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
  }

  svg {
    color: var(--color-gray);
  }
`;

export const TagInput = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--spacing-xs);
  background: var(--color-white);
  border: 1.5px solid var(--color-gray-light);
  border-radius: var(--radius-md);
  padding: var(--spacing-sm) var(--spacing-md);
  min-height: 48px;
  transition: border-color var(--transition-fast);
  cursor: text;

  &:focus-within {
    border-color: var(--color-primary);
    box-shadow: 0 0 0 3px rgba(10, 94, 176, 0.08);
  }

  input {
    flex: 1;
    min-width: 120px;
    border: none;
    outline: none;
    font-size: 0.9rem;
    color: var(--color-dark);
    background: transparent;
    padding: var(--spacing-xs) 0;

    &::placeholder {
      color: var(--color-gray);
    }
  }
`;

export const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-xs);
  margin-top: var(--spacing-sm);
`;

export const Tag = styled.span`
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-xs);
  background: rgba(10, 94, 176, 0.08);
  color: var(--color-primary);
  border: 1px solid rgba(10, 94, 176, 0.15);
  border-radius: var(--radius-full);
  padding: 4px 12px;
  font-size: 0.8rem;
  font-weight: 500;
  white-space: nowrap;

  button {
    background: none;
    border: none;
    color: var(--color-primary);
    cursor: pointer;
    padding: 0;
    display: flex;
    align-items: center;
    opacity: 0.6;
    transition: opacity var(--transition-fast);

    &:hover {
      opacity: 1;
    }
  }
`;

export const SkipButton = styled.button`
  background: none;
  border: none;
  color: var(--color-gray);
  font-size: 0.875rem;
  cursor: pointer;
  padding: var(--spacing-xs) var(--spacing-md);
  transition: color var(--transition-fast);

  &:hover {
    color: var(--color-dark);
    text-decoration: underline;
  }
`;

export const ButtonRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--spacing-md);
  margin-top: var(--spacing-lg);
`;

export const SocialLinkRow = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-sm);

  svg {
    color: var(--color-gray);
    flex-shrink: 0;
  }

  > div {
    flex: 1;
  }
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
  animation: ${fadeIn} 0.35s ease-out;
`;

export const TextArea = styled.textarea`
  width: 100%;
  min-height: 100px;
  padding: var(--spacing-md);
  border: 1.5px solid var(--color-gray-light);
  border-radius: var(--radius-md);
  font-size: 0.9rem;
  font-family: inherit;
  color: var(--color-dark);
  background: var(--color-white);
  resize: vertical;
  transition: border-color var(--transition-fast);
  outline: none;

  &:focus {
    border-color: var(--color-primary);
    box-shadow: 0 0 0 3px rgba(10, 94, 176, 0.08);
  }

  &::placeholder {
    color: var(--color-gray);
  }
`;

export const FieldLabel = styled.label`
  display: block;
  font-weight: 500;
  font-size: 0.85rem;
  color: var(--color-dark);
  margin-bottom: 2px;
`;
