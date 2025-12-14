import styled from "styled-components";

export const SettingsContainer = styled.div`
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

export const TabContainer = styled.div`
  display: flex;
  gap: var(--spacing-xl);
  border-bottom: 1px solid var(--color-gray-light);
  margin-bottom: var(--spacing-2xl);
  padding-bottom: var(--spacing-sm);
`;

export const Tab = styled.button<{ active: boolean }>`
  padding: var(--spacing-md) var(--spacing-lg);
  background: transparent;
  border: none;
  border-bottom: 3px solid
    ${(props) => (props.active ? "var(--color-dark)" : "transparent")};
  color: ${(props) =>
    props.active ? "var(--color-dark)" : "var(--color-gray)"};
  font-weight: ${(props) => (props.active ? "600" : "500")};
  font-size: 1rem;
  cursor: pointer;
  transition: all var(--transition-fast);

  &:hover {
    color: var(--color-dark);
  }
`;

export const TabPanel = styled.div<{ hidden: boolean }>`
  display: ${(props) => (props.hidden ? "none" : "block")};
`;

export const ColorBar = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 6px;
  background: var(--gradient-full);
`;
