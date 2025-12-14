import styled from "styled-components";

export const MyProjectsContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background: linear-gradient(180deg, var(--color-light) 0%, #e8ecf0 100%);
  position: relative;
`;

export const ContentWrapper = styled.div`
  flex: 1;
  margin-left: 260px;
  padding: var(--spacing-xl) var(--spacing-2xl) var(--spacing-xl);
  overflow-y: auto;
  overflow-x: hidden;
  position: relative;
  scrollbar-width: thin;
  scrollbar-color: var(--color-gray-light) transparent;

  &::-webkit-scrollbar {
    width: 10px;
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

  @media (max-width: 768px) {
    margin-left: 80px;
    padding: var(--spacing-lg) var(--spacing-xl) var(--spacing-lg);
  }
`;

export const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: var(--spacing-lg);
  margin-bottom: var(--spacing-2xl);
  gap: var(--spacing-lg);

  h1 {
    font-size: 2rem;
    font-weight: 700;
    color: var(--color-dark);
    margin: 0;
    letter-spacing: -0.02em;
    line-height: 1.2;
  }

  @media (max-width: 768px) {
    margin-top: var(--spacing-md);
    flex-direction: column;
    align-items: flex-start;

    h1 {
      font-size: 1.5rem;
    }
  }
`;

export const NewProjectButton = styled.button`
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-md) var(--spacing-lg);
  background: var(--color-dark);
  border: 2px solid var(--color-dark);
  border-radius: var(--radius-md);
  color: var(--color-white);
  font-weight: 600;
  cursor: pointer;
  transition: all var(--transition-fast);
  font-size: 1rem;
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

  svg {
    width: 20px;
    height: 20px;
    position: relative;
    z-index: 1;
  }

  > * {
    position: relative;
    z-index: 1;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: var(--spacing-xl);

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const ProjectCard = styled.div`
  background: var(--color-white);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg) var(--spacing-lg) var(--spacing-xl);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
  box-shadow: var(--shadow-lg);
  transition: all var(--transition-default);
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
    transform: scaleX(0);
    transform-origin: left;
    transition: transform var(--transition-default);
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-xl);
    border-color: var(--color-gray);
    
    &::before {
      transform: scaleX(1);
    }
  }

  &:focus-visible {
    outline: 2px solid var(--color-dark);
    outline-offset: 2px;
  }

  @media (max-width: 768px) {
    padding: var(--spacing-md) var(--spacing-md) var(--spacing-lg);
    gap: var(--spacing-sm);
  }
`;

export const ProjectTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--color-dark);
  margin: 0 0 var(--spacing-sm) 0;
  line-height: 1.4;
`;

export const ProjectDescription = styled.p`
  font-size: 0.95rem;
  color: var(--color-gray);
  margin: 0;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  flex: 1;
`;

export const ChipsContainer = styled.div`
  display: flex;
  gap: var(--spacing-sm);
  flex-wrap: wrap;
  margin: 0;
`;

export const Chip = styled.span<{ color?: string }>`
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-xs);
  padding: var(--spacing-xs) var(--spacing-md);
  background: ${(props) =>
    props.color ? props.color : "var(--color-gray-light)"};
  color: ${(props) =>
    props.color ? "white" : "var(--color-dark)"};
  border-radius: var(--radius-md);
  font-size: 0.8rem;
  font-weight: 500;
  white-space: nowrap;
  line-height: 1.4;
  transition: all var(--transition-fast);
  border: 1px solid transparent;

  &:hover {
    transform: translateY(-1px);
    box-shadow: var(--shadow-sm);
  }

  svg {
    width: 14px;
    height: 14px;
    flex-shrink: 0;
  }
`;

export const ViewDetailsButton = styled.button`
  padding: var(--spacing-md) var(--spacing-lg);
  background: var(--color-dark);
  border: 2px solid var(--color-dark);
  border-radius: var(--radius-md);
  color: var(--color-white);
  font-weight: 600;
  cursor: pointer;
  transition: all var(--transition-fast);
  font-size: 0.95rem;
  width: 100%;

  &:hover:not(:disabled) {
    background: var(--color-darker);
    transform: translateY(-1px);
    box-shadow: var(--shadow-lg);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const EmptyState = styled.div`
  background: var(--color-white);
  border-radius: var(--radius-lg);
  padding: var(--spacing-2xl) var(--spacing-xl);
  text-align: center;
  box-shadow: var(--shadow-md);
  border: 1px dashed var(--color-gray-light);

  h3 {
    font-size: 1.25rem;
    color: var(--color-dark);
    margin: 0 0 var(--spacing-md) 0;
    font-weight: 600;
    line-height: 1.4;
  }

  p {
    color: var(--color-gray);
    margin: 0 0 var(--spacing-xl) 0;
    line-height: 1.6;
  }
`;

export const CreateButton = styled.button`
  padding: var(--spacing-md) var(--spacing-xl);
  background: var(--color-dark);
  border: 2px solid var(--color-dark);
  border-radius: var(--radius-md);
  color: var(--color-white);
  font-weight: 600;
  cursor: pointer;
  transition: all var(--transition-fast);
  font-size: 0.95rem;

  &:hover:not(:disabled) {
    background: var(--color-darker);
    transform: translateY(-1px);
    box-shadow: var(--shadow-lg);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const LoadingText = styled.p`
  color: var(--color-gray);
  font-size: 1rem;
  text-align: center;
  padding: var(--spacing-2xl) var(--spacing-xl);
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-md);

  &::before {
    content: "";
    width: 20px;
    height: 20px;
    border: 3px solid var(--color-gray-light);
    border-top-color: var(--color-dark);
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

/* Modal Styles */
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
`;

export const ModalContent = styled.div`
  background: var(--color-white);
  border-radius: var(--radius-lg);
  max-width: 720px;
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
    max-width: 100%;
    border-radius: var(--radius-lg);
  }
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-xl) var(--spacing-xl) var(--spacing-lg);
  border-bottom: 1px solid var(--color-gray-light);
  flex-shrink: 0;

  h2 {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--color-dark);
    margin: 0;
    letter-spacing: -0.02em;
    line-height: 1.2;
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

  svg {
    width: 24px;
    height: 24px;
  }

  &:hover {
    background: var(--color-gray-light);
    color: var(--color-dark);
  }
`;

export const ModalBody = styled.div`
  padding: var(--spacing-xl);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-2xl);
  flex: 1;
  overflow-y: auto;
`;

export const InfoBox = styled.div`
  background: var(--color-light);
  border: 1px solid var(--color-gray-light);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
  display: flex;
  gap: var(--spacing-md);
  align-items: flex-start;

  svg {
    flex-shrink: 0;
    margin-top: 4px;
  }
`;

export const InfoBoxTitle = styled.p`
  font-weight: 600;
  margin: 0 0 var(--spacing-xs) 0;
  color: var(--color-dark);
  font-size: 0.95rem;
  line-height: 1.4;
`;

export const InfoBoxText = styled.p`
  margin: 0;
  font-size: 0.875rem;
  color: var(--color-gray);
  line-height: 1.5;
`;

export const ModalFooter = styled.div`
  display: flex;
  gap: var(--spacing-md);
  padding: var(--spacing-lg) var(--spacing-xl);
  border-top: 1px solid var(--color-gray-light);
  justify-content: flex-end;
  flex-shrink: 0;
  margin-top: auto;

  @media (max-width: 480px) {
    flex-direction: column-reverse;
  }
`;

export const FormField = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
`;

export const FormLabel = styled.label`
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--color-dark);
  margin-bottom: var(--spacing-xs);
  line-height: 1.4;
`;

export const FormInput = styled.input<{ hasError?: boolean; hasSuccess?: boolean }>`
  padding: var(--spacing-md) var(--spacing-lg);
  background: var(--color-white);
  border: 1px solid ${(props) => 
    props.hasError 
      ? 'var(--color-error)' 
      : props.hasSuccess 
        ? 'var(--color-success)' 
        : 'var(--color-gray-light)'};
  border-radius: var(--radius-md);
  font-size: 0.95rem;
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

  &.error {
    border-color: var(--color-error);
    background: var(--color-error-bg);
    
    &:focus {
      box-shadow: 0 0 0 3px rgba(230, 57, 70, 0.1);
    }
  }
`;

export const FormTextarea = styled.textarea<{ hasError?: boolean; hasSuccess?: boolean }>`
  padding: var(--spacing-md) var(--spacing-lg);
  background: var(--color-white);
  border: 1px solid ${(props) => 
    props.hasError 
      ? 'var(--color-error)' 
      : props.hasSuccess 
        ? 'var(--color-success)' 
        : 'var(--color-gray-light)'};
  border-radius: var(--radius-md);
  font-size: 0.95rem;
  color: var(--color-dark);
  font-family: inherit;
  resize: vertical;
  min-height: 120px;
  max-height: 300px;
  transition: all var(--transition-fast);
  width: 100%;
  line-height: 1.6;
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
    resize: none;
  }

  &.error {
    border-color: var(--color-error);
    background: var(--color-error-bg);
    
    &:focus {
      box-shadow: 0 0 0 3px rgba(230, 57, 70, 0.1);
    }
  }
`;

export const FormSelect = styled.select<{ hasError?: boolean; hasSuccess?: boolean }>`
  padding: var(--spacing-md) var(--spacing-lg);
  background: var(--color-white);
  border: 1px solid ${(props) => 
    props.hasError 
      ? 'var(--color-error)' 
      : props.hasSuccess 
        ? 'var(--color-success)' 
        : 'var(--color-gray-light)'};
  border-radius: var(--radius-md);
  font-size: 0.95rem;
  color: var(--color-dark);
  cursor: pointer;
  transition: all var(--transition-fast);
  font-family: inherit;
  width: 100%;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 14 14'%3E%3Cpath fill='%231a1a1a' d='M7 10L2 5h10z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right var(--spacing-md) center;
  padding-right: calc(var(--spacing-xl) + var(--spacing-md));
  line-height: 1.5;

  &:hover:not(:disabled):not(:focus) {
    border-color: ${(props) => 
      props.hasError 
        ? 'var(--color-error)' 
        : props.hasSuccess 
          ? 'var(--color-success)' 
          : 'var(--color-gray)'};
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 14 14'%3E%3Cpath fill='%231a1a1a' d='M7 10L2 5h10z'/%3E%3C/svg%3E");
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
    background-color: var(--color-white);
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 14 14'%3E%3Cpath fill='%231a1a1a' d='M7 10L2 5h10z'/%3E%3C/svg%3E");
  }

  &:disabled {
    background: var(--color-gray-light);
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 14 14'%3E%3Cpath fill='%236b7280' d='M7 10L2 5h10z'/%3E%3C/svg%3E");
    cursor: not-allowed;
    opacity: 0.6;
    border-color: var(--color-gray-light);
  }

  option {
    background: var(--color-white);
    color: var(--color-dark);
    padding: var(--spacing-sm) var(--spacing-md);
    line-height: 1.5;
  }

  option:hover {
    background: var(--color-light);
  }

  option:checked {
    background: var(--color-dark);
    color: var(--color-white);
  }
`;

export const ErrorMessage = styled.span`
  font-size: 0.8rem;
  color: var(--color-error);
  margin-top: var(--spacing-sm);
  line-height: 1.4;
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);

  &::before {
    content: "⚠";
    font-size: 0.9rem;
  }
`;

export const SuccessMessage = styled.span`
  font-size: 0.8rem;
  color: var(--color-success);
  margin-top: var(--spacing-sm);
  line-height: 1.4;
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);

  &::before {
    content: "✓";
    font-size: 0.9rem;
    font-weight: 600;
  }
`;

export const HelperText = styled.span`
  font-size: 0.8rem;
  color: var(--color-gray);
  margin-top: var(--spacing-sm);
  line-height: 1.4;
  display: block;
`;

export const FileUploadArea = styled.label<{ isDragActive?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 180px;
  border: 1px dashed
    ${(props) =>
      props.isDragActive
        ? "var(--color-dark)"
        : "var(--color-gray-light)"};
  border-radius: var(--radius-md);
  background: var(--color-light);
  cursor: pointer;
  transition: all var(--transition-fast);
  padding: var(--spacing-xl);
  text-align: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(26, 26, 26, 0.05), transparent);
    transition: left 0.5s;
  }

  &:hover {
    border-color: var(--color-gray);
    background: var(--color-light);
    transform: translateY(-1px);
    box-shadow: var(--shadow-md);
    
    &::before {
      left: 100%;
    }
  }

  &:focus-within {
    border-color: var(--color-dark);
    box-shadow: 0 0 0 3px rgba(26, 26, 26, 0.1);
  }

  input {
    display: none;
  }

  svg {
    width: 48px;
    height: 48px;
    color: var(--color-gray);
    margin-bottom: var(--spacing-lg);
    transition: transform var(--transition-fast);
  }

  &:hover svg {
    transform: scale(1.1);
  }
`;

export const FileUploadPlaceholder = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-md);

  p {
    font-weight: 600;
    color: var(--color-dark);
    margin: 0;
    font-size: 0.95rem;
    line-height: 1.5;
  }

  span {
    font-size: 0.875rem;
    color: var(--color-gray);
    line-height: 1.5;
  }
`;

export const FileUploadedInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-md);
  width: 100%;

  p {
    font-weight: 600;
    color: var(--color-dark);
    margin: 0;
    font-size: 0.95rem;
    line-height: 1.5;
    text-align: center;
    word-break: break-word;
  }

  span {
    font-size: 0.875rem;
    color: var(--color-gray);
    line-height: 1.5;
  }
`;

export const RemoveFileButton = styled.button`
  margin-top: var(--spacing-md);
  padding: var(--spacing-xs) var(--spacing-md);
  background: transparent;
  border: none;
  color: var(--color-error);
  font-size: 0.8rem;
  cursor: pointer;
  font-weight: 500;
  transition: all var(--transition-fast);
  border-radius: var(--radius-sm);

  &:hover {
    color: var(--color-error);
    background: var(--color-error-bg);
    text-decoration: none;
  }

  &:focus-visible {
    outline: 2px solid var(--color-error);
    outline-offset: 2px;
  }
`;

export const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-lg) var(--spacing-xl);

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: var(--spacing-lg);
  }
`;

export const CheckboxField = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-md) var(--spacing-lg);
  background: var(--color-light);
  border: 1px solid var(--color-gray-light);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all var(--transition-fast);

  &:hover {
    background: var(--color-gray-light);
    border-color: var(--color-gray);
  }

  input {
    width: 20px;
    height: 20px;
    cursor: pointer;
    accent-color: var(--color-dark);
    flex-shrink: 0;
  }

  label {
    cursor: pointer;
    font-weight: 500;
    color: var(--color-dark);
    margin: 0;
    font-size: 0.95rem;
    line-height: 1.4;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: var(--spacing-md);
  justify-content: flex-end;

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

export const SubmitButton = styled.button`
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
    transform: none;
  }

  > * {
    position: relative;
    z-index: 1;
  }

  @media (max-width: 480px) {
    width: 100%;
  }
`;

interface AlertBoxProps {
  type?: 'error' | 'success';
}

export const AlertBox = styled.div<AlertBoxProps>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--spacing-md);
  padding: var(--spacing-md) var(--spacing-lg);
  margin-bottom: var(--spacing-xl);
  border-radius: var(--radius-md);
  background: ${(props) =>
    props.type === 'error'
      ? 'var(--color-error-bg)'
      : props.type === 'success'
        ? 'var(--color-success-bg)'
        : 'var(--color-white)'};
  border: 1px solid ${(props) =>
    props.type === 'error'
      ? 'var(--color-error-border)'
      : props.type === 'success'
        ? 'var(--color-success-border)'
        : 'var(--color-gray-light)'};
  color: ${(props) =>
    props.type === 'error'
      ? 'var(--color-error)'
      : props.type === 'success'
        ? 'var(--color-success)'
        : 'var(--color-dark)'};
  animation: slideDown 0.3s ease-out;
  box-shadow: var(--shadow-sm);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 4px;
    background: ${(props) =>
      props.type === 'error'
        ? 'var(--color-error)'
        : props.type === 'success'
          ? 'var(--color-success)'
          : 'var(--color-dark)'};
  }

  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  span {
    flex: 1;
    font-weight: 500;
    font-size: 0.875rem;
    line-height: 1.5;
  }

  button {
    background: none;
    border: none;
    cursor: pointer;
    padding: var(--spacing-xs);
    display: flex;
    align-items: center;
    justify-content: center;
    color: inherit;
    transition: all var(--transition-fast);
    border-radius: var(--radius-sm);
    flex-shrink: 0;

    &:hover {
      background: rgba(0, 0, 0, 0.05);
      transform: scale(1.1);
    }

    &:active {
      transform: scale(0.95);
    }

    &:focus-visible {
      outline: 2px solid currentColor;
      outline-offset: 2px;
    }
  }
`;

export const LoadingOverlay = styled.div<{ visible: boolean }>`
  display: ${(props) => (props.visible ? "flex" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(4px);
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: var(--spacing-lg);
  z-index: 1400;
`;

export const LoadingSpinner = styled.div`
  width: 60px;
  height: 60px;
  border: 4px solid var(--color-gray-light);
  border-top-color: var(--color-blue);
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

export const ColorBar = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 6px;
  background: var(--gradient-full);
`;
