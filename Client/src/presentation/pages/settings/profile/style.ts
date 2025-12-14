import styled from "styled-components";

export const ProfileContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
`;

export const ProfileCard = styled.div`
  background: var(--color-white);
  border-radius: var(--radius-lg);
  padding: var(--spacing-xl) var(--spacing-xl) var(--spacing-2xl);
  box-shadow: var(--shadow-lg);
  border: 1px solid var(--color-gray-light);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: var(--gradient-full);
    border-radius: var(--radius-lg) var(--radius-lg) 0 0;
  }

  @media (max-width: 768px) {
    padding: var(--spacing-lg) var(--spacing-lg) var(--spacing-xl);
  }
`;

export const AlertBox = styled.div<{ type: "error" | "success" }>`
  padding: var(--spacing-md) var(--spacing-lg);
  background: ${(props) =>
    props.type === "error"
      ? "var(--color-error-bg)"
      : "var(--color-success-bg)"};
  border: 1px solid
    ${(props) =>
      props.type === "error"
        ? "var(--color-error-border)"
        : "var(--color-success-border)"};
  border-radius: var(--radius-md);
  color: ${(props) => (props.type === "error" ? "var(--color-error)" : "var(--color-success)")};
  margin-bottom: var(--spacing-xl);
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.875rem;
  line-height: 1.5;

  button {
    background: transparent;
    border: none;
    color: inherit;
    cursor: pointer;
    font-size: 1.2rem;
    transition: all var(--transition-fast);

    &:hover {
      opacity: 0.7;
    }
  }
`;

export const HeaderSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: var(--spacing-2xl);
  gap: var(--spacing-xl);

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const AvatarSection = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-lg);

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

export const Avatar = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: var(--gradient-full);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 2.5rem;
  font-weight: 700;
  box-shadow: var(--shadow-lg);
  flex-shrink: 0;
`;

export const UserInfo = styled.div``;

export const UserName = styled.h2`
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--color-dark);
  margin: 0 0 var(--spacing-lg) 0;
  letter-spacing: -0.02em;
  line-height: 1.2;
`;

export const RoleBadge = styled.div`
  display: inline-block;
  padding: var(--spacing-xs) var(--spacing-md);
  background: var(--color-dark);
  color: white;
  border-radius: var(--radius-md);
  font-weight: 600;
  font-size: 0.8rem;
  box-shadow: var(--shadow-md);
  line-height: 1.4;
`;

export const EditButton = styled.button`
  background: var(--color-white);
  border: 2px solid var(--color-gray-light);
  width: 40px;
  height: 40px;
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: var(--color-dark);
  transition: all var(--transition-fast);
  position: relative;

  svg {
    width: 20px;
    height: 20px;
    transition: transform var(--transition-fast);
  }

  &:hover:not(:disabled) {
    background: var(--color-gray-light);
    border-color: var(--color-gray);
    
    svg {
      transform: rotate(15deg) scale(1.1);
    }
  }

  &:focus-visible {
    outline: 2px solid var(--color-blue);
    outline-offset: 2px;
  }

  &:active:not(:disabled) {
    transform: scale(0.95);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const Divider = styled.hr`
  border: none;
  border-top: 1px solid var(--color-gray-light);
  margin: var(--spacing-2xl) 0;
`;

export const SectionTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--color-dark);
  margin: 0 0 var(--spacing-xl) 0;
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  line-height: 1.4;

  svg {
    width: 20px;
    height: 20px;
    color: var(--color-dark);
  }
`;

export const InformationGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--spacing-xl) var(--spacing-xl);
`;

export const InfoField = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
`;

export const FieldLabel = styled.label`
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--color-gray);
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  line-height: 1.4;
  margin-bottom: var(--spacing-xs);

  svg {
    width: 16px;
    height: 16px;
  }
`;

export const FieldValue = styled.p`
  font-size: 1rem;
  color: var(--color-dark);
  margin: 0;
  font-weight: 500;
  line-height: 1.5;
  padding: var(--spacing-sm) 0;
`;

export const FieldInput = styled.input<{ hasError?: boolean; hasSuccess?: boolean }>`
  padding: var(--spacing-md) var(--spacing-lg);
  background: var(--color-white);
  border: 1px solid ${(props) => 
    props.hasError 
      ? 'var(--color-error)' 
      : props.hasSuccess 
        ? 'var(--color-success)' 
        : 'var(--color-gray-light)'};
  border-radius: var(--radius-md);
  font-size: 1rem;
  color: var(--color-dark);
  transition: all var(--transition-fast);
  font-family: inherit;
  width: 100%;
  line-height: 1.5;

  &::placeholder {
    color: var(--color-gray);
    opacity: 0.6;
    transition: opacity var(--transition-fast);
  }

  &:hover:not(:disabled):not(:focus) {
    border-color: ${(props) => 
      props.hasError 
        ? 'var(--color-error)' 
        : props.hasSuccess 
          ? 'var(--color-success)' 
          : 'var(--color-gray)'};
  }

  &:focus {
    outline: none;
    border-color: ${(props) => 
      props.hasError 
        ? 'var(--color-error)' 
        : props.hasSuccess 
          ? 'var(--color-success)' 
          : 'var(--color-dark)'};
    box-shadow: 0 0 0 3px ${(props) => 
      props.hasError 
        ? 'rgba(230, 57, 70, 0.1)' 
        : props.hasSuccess 
          ? 'rgba(45, 158, 73, 0.1)' 
          : 'rgba(26, 26, 26, 0.1)'};
    background: var(--color-white);
  }

  &:focus::placeholder {
    opacity: 0.4;
  }

  &:disabled {
    background: var(--color-gray-light);
    cursor: not-allowed;
    opacity: 0.6;
    border-color: var(--color-gray-light);
  }
`;

export const ActionButtons = styled.div`
  display: flex;
  gap: var(--spacing-md);
  justify-content: flex-end;
  margin-top: var(--spacing-2xl);
  padding-top: var(--spacing-xl);

  @media (max-width: 480px) {
    flex-direction: column-reverse;
    gap: var(--spacing-md);
  }
`;

export const CancelButton = styled.button`
  padding: var(--spacing-md) var(--spacing-lg);
  background: var(--color-white);
  border: 1px solid var(--color-gray-light);
  border-radius: var(--radius-md);
  color: var(--color-dark);
  font-weight: 600;
  cursor: pointer;
  transition: all var(--transition-fast);
  font-size: 0.95rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-sm);

  svg {
    width: 18px;
    height: 18px;
  }

  &:hover:not(:disabled) {
    background: var(--color-gray-light);
    border-color: var(--color-gray);
    transform: translateY(-1px);
  }

  &:focus-visible {
    outline: 2px solid var(--color-blue);
    outline-offset: 2px;
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  @media (max-width: 480px) {
    width: 100%;
  }
`;

export const SaveButton = styled.button`
  padding: var(--spacing-md) var(--spacing-lg);
  background: var(--color-dark);
  border: 2px solid var(--color-dark);
  border-radius: var(--radius-md);
  color: var(--color-white);
  font-weight: 600;
  cursor: pointer;
  transition: all var(--transition-fast);
  font-size: 0.95rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-sm);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.2);
    transform: translate(-50%, -50%);
    transition: width 0.6s, height 0.6s;
  }

  svg {
    width: 18px;
    height: 18px;
    position: relative;
    z-index: 1;
  }

  > * {
    position: relative;
    z-index: 1;
  }

  &:hover:not(:disabled) {
    background: var(--color-darker);
    transform: translateY(-1px);
    box-shadow: var(--shadow-lg);
    
    &::before {
      width: 300px;
      height: 300px;
    }
  }

  &:focus-visible {
    outline: 2px solid var(--color-blue);
    outline-offset: 2px;
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }

  @media (max-width: 480px) {
    width: 100%;
  }
`;

export const LoadingSpinner = styled.div`
  display: inline-block;
  width: 18px;
  height: 18px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;
