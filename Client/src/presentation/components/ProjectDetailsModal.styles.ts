import styled from "styled-components";

export const ModalOverlay = styled.div<{ open: boolean }>`
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
  z-index: 1300;
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

export const ModalContent = styled.div`
  background: var(--color-white);
  border-radius: var(--radius-lg);
  max-width: 800px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  overflow-x: hidden;
  box-shadow: var(--shadow-xl);
  border: 1px solid var(--color-gray-light);
  position: relative;
  scrollbar-width: thin;
  scrollbar-color: var(--color-gray-light) transparent;
  display: flex;
  flex-direction: column;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
    border-radius: var(--radius-full);
  }

  &::-webkit-scrollbar-thumb {
    background: var(--color-gray-light);
    border-radius: var(--radius-full);
    border: 2px solid transparent;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: var(--color-gray);
  }

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
    border-radius: var(--radius-lg);
  }
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: var(--spacing-xl) var(--spacing-xl) var(--spacing-lg);
  border-bottom: 1px solid var(--color-gray-light);
  flex-shrink: 0;
  gap: var(--spacing-lg);

  > div:first-child {
    flex: 1;
    min-width: 0;
  }
`;

export const ModalCloseButton = styled.button`
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

export const ModalTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-dark);
  margin: 0 0 var(--spacing-md) 0;
  letter-spacing: -0.02em;
  line-height: 1.2;
  word-break: break-word;
`;

export const ModalChipContainer = styled.div`
  display: flex;
  gap: var(--spacing-sm);
  flex-wrap: wrap;
`;

export const ModalChip = styled.span<{ color?: string }>`
  display: inline-flex;
  align-items: center;
  padding: var(--spacing-xs) var(--spacing-md);
  border-radius: var(--radius-md);
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--color-white);
  background: ${(props) => props.color || "var(--color-gray-light)"};
  line-height: 1.4;
`;

export const ModalBody = styled.div`
  padding: var(--spacing-xl);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-2xl);
  flex: 1;
  overflow-y: auto;
`;

export const ModalFooter = styled.div`
  display: flex;
  gap: var(--spacing-md);
  padding: var(--spacing-lg) var(--spacing-xl);
  border-top: 1px solid var(--color-gray-light);
  justify-content: flex-end;
  flex-shrink: 0;
  margin-top: auto;
`;

export const SectionTitle = styled.h3`
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--color-dark);
  margin: 0 0 var(--spacing-md) 0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  line-height: 1.4;
`;

export const SectionContent = styled.p`
  font-size: 0.95rem;
  color: var(--color-gray);
  line-height: 1.7;
  margin: 0;
  word-break: break-word;
`;

export const SectionDivider = styled.hr`
  border: none;
  border-top: 1px solid var(--color-gray-light);
  margin: 0;
`;

export const ReadmeBox = styled.div`
  background: var(--color-light);
  border-radius: var(--radius-md);
  padding: var(--spacing-lg);
  border: 1px solid var(--color-gray-light);
  max-height: 400px;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: var(--color-gray-light) transparent;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
    border-radius: var(--radius-full);
  }

  &::-webkit-scrollbar-thumb {
    background: var(--color-gray-light);
    border-radius: var(--radius-full);
    border: 2px solid transparent;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: var(--color-gray);
  }

  pre {
    margin: 0;
    font-family: "Monaco", "Menlo", "Ubuntu Mono", monospace;
    font-size: 0.875rem;
    color: var(--color-gray);
    white-space: pre-wrap;
    word-break: break-word;
    overflow-wrap: break-word;
    line-height: 1.6;
  }
`;

export const LinksContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
`;

export const LinkItem = styled.a`
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  color: var(--color-dark);
  text-decoration: none;
  font-size: 0.95rem;
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--radius-md);
  transition: all var(--transition-fast);
  border: 1px solid transparent;

  svg {
    flex-shrink: 0;
    color: var(--color-gray);
    transition: color var(--transition-fast);
  }

  span {
    flex: 1;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &:hover {
    background: var(--color-light);
    border-color: var(--color-gray-light);
    color: var(--color-dark);

    svg {
      color: var(--color-dark);
    }
  }

  &:focus-visible {
    outline: 2px solid var(--color-dark);
    outline-offset: 2px;
  }
`;

export const FilesContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--spacing-md);
  gap: var(--spacing-md);
  flex-wrap: wrap;
`;

export const EmptyFilesBox = styled.div`
  text-align: center;
  padding: var(--spacing-2xl);
  background: var(--color-light);
  border-radius: var(--radius-lg);
  border: 1px dashed var(--color-gray-light);

  svg {
    margin-bottom: var(--spacing-md);
    opacity: 0.5;
  }

  p {
    margin: 0;
    color: var(--color-gray);
    font-size: 0.95rem;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: var(--spacing-md);
  align-items: center;
  width: 100%;

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

  &:hover:not(:disabled) {
    background: var(--color-gray-light);
    border-color: var(--color-gray);
    transform: translateY(-1px);
  }

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

  @media (max-width: 480px) {
    width: 100%;
  }
`;

export const CloseButton = styled.button`
  padding: var(--spacing-md) var(--spacing-lg);
  background: var(--color-dark);
  border: 2px solid var(--color-dark);
  border-radius: var(--radius-md);
  color: var(--color-white);
  font-weight: 600;
  cursor: pointer;
  transition: all var(--transition-fast);
  font-size: 0.95rem;
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

  @media (max-width: 480px) {
    width: 100%;
  }
`;

export const DeleteButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-md) var(--spacing-lg);
  background: transparent;
  border: 1px solid var(--color-error);
  border-radius: var(--radius-md);
  color: var(--color-error);
  font-weight: 600;
  cursor: pointer;
  transition: all var(--transition-fast);
  font-size: 0.95rem;

  svg {
    width: 18px;
    height: 18px;
  }

  &:hover:not(:disabled) {
    background: var(--color-error-bg);
    transform: translateY(-1px);
  }

  &:focus-visible {
    outline: 2px solid var(--color-error);
    outline-offset: 2px;
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  @media (max-width: 480px) {
    width: 100%;
  }
`;

export const EditButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-md) var(--spacing-lg);
  background: var(--color-dark);
  border: 2px solid var(--color-dark);
  border-radius: var(--radius-md);
  color: var(--color-white);
  font-weight: 600;
  cursor: pointer;
  transition: all var(--transition-fast);
  font-size: 0.95rem;
  position: relative;
  overflow: hidden;

  svg {
    width: 18px;
    height: 18px;
  }

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

  @media (max-width: 480px) {
    width: 100%;
  }
`;

