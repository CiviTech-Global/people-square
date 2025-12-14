import styled from "styled-components";

export const HomeContainer = styled.div`
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

export const HeaderSection = styled.div`
  margin-top: var(--spacing-lg);
  margin-bottom: var(--spacing-2xl);

  h1 {
    font-size: 2.5rem;
    font-weight: 700;
    color: var(--color-dark);
    margin: 0 0 var(--spacing-lg) 0;
    letter-spacing: -0.02em;
    line-height: 1.2;
  }

  p {
    font-size: 1.1rem;
    color: var(--color-gray);
    margin: 0;
    line-height: 1.5;
  }

  @media (max-width: 768px) {
    margin-top: var(--spacing-md);

    h1 {
      font-size: 1.8rem;
    }

    p {
      font-size: 1rem;
    }
  }
`;

export const ProjectsSection = styled.div`
  margin-top: var(--spacing-2xl);
`;

export const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-2xl);
  gap: var(--spacing-md);

  h2 {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--color-dark);
    margin: 0;
    letter-spacing: -0.02em;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;

    h2 {
      font-size: 1.25rem;
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
    outline: 2px solid var(--color-blue);
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

export const ActionsDropdown = styled.div`
  position: relative;
  display: inline-block;
`;

export const ActionsDropdownButton = styled.button`
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

  svg {
    width: 20px;
    height: 20px;
    position: relative;
    z-index: 1;
    flex-shrink: 0;
  }

  > * {
    position: relative;
    z-index: 1;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const ActionsDropdownMenu = styled.div`
  position: absolute;
  top: calc(100% + var(--spacing-sm));
  right: 0;
  background: var(--color-white);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-lg);
  z-index: 1000;
  min-width: 220px;
  overflow: hidden;
  border: 1px solid var(--color-gray-light);
  padding: var(--spacing-xs) 0;
  animation: slideDown 0.2s ease-out;

  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-8px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (max-width: 768px) {
    right: auto;
    left: 0;
    width: 100%;
  }
`;

export const ActionsDropdownItem = styled.button`
  width: 100%;
  padding: var(--spacing-md) var(--spacing-lg);
  background: transparent;
  border: none;
  color: var(--color-dark);
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  transition: all var(--transition-fast);
  text-align: left;
  position: relative;
  margin: 0 var(--spacing-xs);
  border-radius: var(--radius-md);

  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 3px;
    background: var(--color-dark);
    transform: scaleY(0);
    transition: transform var(--transition-fast);
  }

  &:hover {
    background: var(--color-gray-light);
    color: var(--color-dark);

    &::before {
      transform: scaleY(1);
    }

    svg {
      transform: translateX(2px);
    }
  }

  &:focus-visible {
    outline: 2px solid var(--color-dark);
    outline-offset: -2px;
  }

  svg {
    width: 18px;
    height: 18px;
    color: var(--color-gray);
    transition: transform var(--transition-fast);
    flex-shrink: 0;
  }

  &:hover svg {
    color: var(--color-dark);
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
  cursor: pointer;
  border: 1px solid var(--color-gray-light);
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
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
    outline: 2px solid var(--color-blue);
    outline-offset: 2px;
  }

  &:active {
    transform: translateY(-1px);
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
  margin: 0 0 var(--spacing-sm) 0;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
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
  color: ${(props) => (props.color ? "white" : "var(--color-dark)")};
  border-radius: var(--radius-md);
  font-size: 0.8rem;
  font-weight: 500;
  white-space: nowrap;
  transition: all var(--transition-fast);
  border: 1px solid transparent;
  line-height: 1.4;

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
    background: rgba(255, 255, 255, 0.15);
    transform: translate(-50%, -50%);
    transition: width 0.4s, height 0.4s;
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
  }
`;

export const EmptyState = styled.div`
  background: var(--color-white);
  border-radius: var(--radius-lg);
  padding: var(--spacing-2xl) var(--spacing-xl);
  text-align: center;
  box-shadow: var(--shadow-md);
  border: 1px dashed var(--color-gray-light);
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(
      circle,
      rgba(74, 144, 217, 0.03) 0%,
      transparent 70%
    );
    animation: pulse 3s ease-in-out infinite;
  }

  @keyframes pulse {
    0%,
    100% {
      opacity: 0.5;
    }
    50% {
      opacity: 1;
    }
  }

  h3 {
    font-size: 1.25rem;
    color: var(--color-dark);
    margin: 0 0 var(--spacing-md) 0;
    font-weight: 600;
    position: relative;
    z-index: 1;
    line-height: 1.4;
  }

  p {
    color: var(--color-gray);
    margin: 0 0 var(--spacing-xl) 0;
    position: relative;
    z-index: 1;
    line-height: 1.6;
  }

  button {
    margin-top: 0;
    position: relative;
    z-index: 1;
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
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-md);
  margin: 0;

  &::before {
    content: "";
    width: 20px;
    height: 20px;
    border: 3px solid var(--color-gray-light);
    border-top-color: var(--color-blue);
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

export const ProfileMenu = styled.div`
  position: absolute;
  top: calc(68px + var(--spacing-sm));
  right: var(--spacing-lg);
  background: var(--color-white);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-lg);
  z-index: 1000;
  min-width: 200px;
  overflow: hidden;
  border: 1px solid var(--color-gray-light);
  padding: var(--spacing-xs) 0;
`;

export const ProfileMenuItem = styled.button`
  width: 100%;
  padding: var(--spacing-md) var(--spacing-lg);
  background: transparent;
  border: none;
  color: var(--color-dark);
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  transition: all var(--transition-fast);
  text-align: left;
  position: relative;
  margin: 0 var(--spacing-xs);
  border-radius: var(--radius-md);

  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 3px;
    background: var(--color-dark);
    transform: scaleY(0);
    transition: transform var(--transition-fast);
  }

  &:hover {
    background: var(--color-gray-light);
    color: var(--color-dark);

    &::before {
      transform: scaleY(1);
    }

    svg {
      transform: translateX(2px);
    }
  }

  &:focus-visible {
    outline: 2px solid var(--color-dark);
    outline-offset: -2px;
  }

  svg {
    width: 20px;
    height: 20px;
    color: var(--color-gray);
    transition: transform var(--transition-fast);
    flex-shrink: 0;
  }

  &:hover svg {
    color: var(--color-dark);
  }
`;

export const AppBarActionsContainer = styled.div`
  display: flex;
  gap: var(--spacing-xs);
  align-items: center;
  position: relative;
`;

export const IconButtonStyled = styled.button`
  background: transparent;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all var(--transition-fast);
  color: var(--color-dark);
  position: relative;

  svg {
    width: 24px;
    height: 24px;
    transition: transform var(--transition-fast);
  }

  &:hover {
    background: var(--color-gray-light);

    svg {
      transform: scale(1.1);
    }
  }

  &:focus-visible {
    outline: 2px solid var(--color-blue);
    outline-offset: 2px;
  }

  &:active {
    background: var(--color-gray-light);
    transform: scale(0.95);
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
