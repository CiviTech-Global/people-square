import styled from "styled-components";

export const FileWidgetContainer = styled.div`
  background: var(--color-light);
  border-radius: var(--radius-md);
  border: 1px solid var(--color-gray-light);
  padding: var(--spacing-lg);
  display: flex;
  align-items: center;
  gap: var(--spacing-lg);
  transition: all var(--transition-fast);
  position: relative;
  overflow: hidden;

  &:hover {
    box-shadow: var(--shadow-md);
    transform: translateY(-1px);
    border-color: var(--color-gray);
  }
`;

export const FileIconBox = styled.div`
  min-width: 64px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-white);
  border-radius: var(--radius-md);
  border: 1px solid var(--color-gray-light);
  transition: transform var(--transition-fast);
  flex-shrink: 0;

  ${FileWidgetContainer}:hover & {
    transform: scale(1.05);
  }

  svg {
    width: 32px;
    height: 32px;
  }
`;

export const FileInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

export const FileTypeLabel = styled.div`
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--color-dark);
  margin-bottom: var(--spacing-xs);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const FileName = styled.div`
  font-size: 0.875rem;
  color: var(--color-gray);
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: var(--spacing-xs);
`;

export const FileSize = styled.div`
  font-size: 0.8rem;
  color: var(--color-gray);
`;

export const FileActions = styled.div`
  display: flex;
  gap: var(--spacing-xs);
  flex-shrink: 0;
`;

export const IconButton = styled.button`
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-white);
  border: 1px solid var(--color-gray-light);
  border-radius: var(--radius-md);
  color: var(--color-dark);
  cursor: pointer;
  transition: all var(--transition-fast);

  svg {
    width: 18px;
    height: 18px;
  }

  &:hover {
    background: var(--color-gray-light);
    border-color: var(--color-gray);
    transform: scale(1.1);
  }

  &:focus-visible {
    outline: 2px solid var(--color-dark);
    outline-offset: 2px;
  }

  &:active {
    transform: scale(0.95);
  }
`;

export const PreviewModalOverlay = styled.div<{ open: boolean }>`
  display: ${(props) => (props.open ? "flex" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(6px);
  justify-content: center;
  align-items: center;
  z-index: 1400;
  padding: var(--spacing-lg);
  animation: fadeIn 0.2s ease-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

export const PreviewModalContent = styled.div`
  background: var(--color-white);
  border-radius: var(--radius-lg);
  max-width: 1200px;
  width: 100%;
  height: 90vh;
  box-shadow: var(--shadow-xl);
  border: 1px solid var(--color-gray-light);
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: var(--gradient-full);
    border-radius: var(--radius-lg) var(--radius-lg) 0 0;
  }

  @media (max-width: 768px) {
    max-width: 100%;
    height: 100vh;
    border-radius: 0;
  }
`;

export const PreviewModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-lg) var(--spacing-xl);
  border-bottom: 1px solid var(--color-gray-light);
  flex-shrink: 0;
  gap: var(--spacing-lg);

  > div:first-child {
    flex: 1;
    min-width: 0;

    h3 {
      font-size: 1.125rem;
      font-weight: 600;
      color: var(--color-dark);
      margin: 0 0 var(--spacing-xs) 0;
    }

    p {
      font-size: 0.875rem;
      color: var(--color-gray);
      margin: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
`;

export const PreviewModalCloseButton = styled.button`
  background: transparent;
  border: none;
  width: 36px;
  height: 36px;
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: var(--color-gray);
  transition: all var(--transition-fast);
  flex-shrink: 0;

  svg {
    width: 24px;
    height: 24px;
  }

  &:hover {
    background: var(--color-gray-light);
    color: var(--color-dark);
  }

  &:focus-visible {
    outline: 2px solid var(--color-dark);
    outline-offset: 2px;
  }
`;

export const PreviewModalBody = styled.div`
  flex: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  position: relative;
`;

export const PreviewLoadingBox = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: var(--color-white);
  z-index: 1;

  .spinner {
    width: 40px;
    height: 40px;
    border: 4px solid var(--color-gray-light);
    border-top-color: var(--color-dark);
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  p {
    margin: var(--spacing-lg) 0 0 0;
    color: var(--color-gray);
    font-size: 0.95rem;
  }
`;

export const PreviewModalFooter = styled.div`
  display: flex;
  gap: var(--spacing-md);
  padding: var(--spacing-lg) var(--spacing-xl);
  border-top: 1px solid var(--color-gray-light);
  justify-content: flex-end;
  flex-shrink: 0;
`;

export const PreviewButton = styled.button<{ variant?: "outline" }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-md) var(--spacing-lg);
  border-radius: var(--radius-md);
  font-weight: 600;
  cursor: pointer;
  transition: all var(--transition-fast);
  font-size: 0.95rem;

  svg {
    width: 18px;
    height: 18px;
  }

  ${(props) =>
    props.variant === "outline"
      ? `
    background: var(--color-white);
    border: 1px solid var(--color-gray-light);
    color: var(--color-dark);

    &:hover:not(:disabled) {
      background: var(--color-gray-light);
      border-color: var(--color-gray);
      transform: translateY(-1px);
    }
  `
      : `
    background: var(--color-dark);
    border: 2px solid var(--color-dark);
    color: var(--color-white);
    position: relative;
    overflow: hidden;

    &::before {
      content: "";
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

    &:hover:not(:disabled) {
      background: var(--color-darker);
      transform: translateY(-1px);
      box-shadow: var(--shadow-lg);

      &::before {
        width: 300px;
        height: 300px;
      }
    }
  `}

  &:focus-visible {
    outline: 2px solid var(--color-dark);
    outline-offset: 2px;
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

