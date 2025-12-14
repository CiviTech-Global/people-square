import styled from 'styled-components';

interface SidebarProps {
  open?: boolean;
}

export const SidebarContainer = styled.div<SidebarProps>`
  width: ${(props) => (props.open ? '260px' : '80px')};
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  background: var(--color-white);
  border-right: 1px solid var(--color-gray-light);
  box-shadow: var(--shadow-md);
  transition: width var(--transition-default);
  display: flex;
  flex-direction: column;
  z-index: var(--z-fixed);
  overflow: hidden;
`;

export const LogoSection = styled.div<SidebarProps>`
  padding: var(--spacing-xl) var(--spacing-xl) var(--spacing-lg);
  border-bottom: 1px solid var(--color-gray-light);
  min-height: 72px;
  display: flex;
  align-items: center;
  justify-content: ${(props) => (props.open ? 'flex-start' : 'center')};
  gap: var(--spacing-md);
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--color-gray-light), transparent);
  }
`;

interface LogoTextProps {
  open?: boolean;
}

export const LogoText = styled.h1<LogoTextProps>`
  color: var(--color-dark);
  font-weight: 700;
  font-size: ${(props) => (props.open ? '1.25rem' : '0.875rem')};
  margin: 0;
  transition: font-size var(--transition-default);
  letter-spacing: -0.02em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const MenuList = styled.ul`
  flex: 1;
  list-style: none;
  padding: var(--spacing-md) var(--spacing-sm);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
  overflow-y: auto;
  overflow-x: hidden;
  scrollbar-width: thin;
  scrollbar-color: var(--color-gray-light) transparent;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: var(--color-gray-light);
    border-radius: var(--radius-full);
  }

  &::-webkit-scrollbar-thumb:hover {
    background: var(--color-gray);
  }
`;

export const MenuItem = styled.li`
  display: flex;
  flex-direction: column;
`;

interface MenuButtonProps {
  isActive?: boolean;
}

export const MenuButton = styled.button<MenuButtonProps>`
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-md) var(--spacing-lg);
  margin: 0 var(--spacing-xs);
  border: none;
  border-radius: var(--radius-md);
  background: ${(props) => (props.isActive ? 'rgba(74, 144, 217, 0.1)' : 'transparent')};
  color: ${(props) => (props.isActive ? 'var(--color-blue)' : 'var(--color-gray)')};
  cursor: pointer;
  transition: all var(--transition-fast);
  position: relative;
  font-weight: ${(props) => (props.isActive ? 600 : 500)};
  font-size: 0.95rem;
  width: calc(100% - var(--spacing-xs) * 2);
  text-align: left;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 3px;
    height: ${(props) => (props.isActive ? '24px' : '0')};
    background: var(--color-blue);
    border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
    transition: height var(--transition-fast);
  }

  &:hover {
    background: ${(props) => (props.isActive ? 'rgba(74, 144, 217, 0.15)' : 'var(--color-light)')};
    color: var(--color-blue);
    transform: translateX(2px);
  }

  &:active {
    transform: translateX(1px) scale(0.98);
  }

  &:focus-visible {
    outline: 2px solid var(--color-blue);
    outline-offset: 2px;
  }
`;

export const MenuIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  flex-shrink: 0;
  position: relative;
  z-index: 1;

  svg {
    width: 22px;
    height: 22px;
    stroke-width: 2;
  }
`;

export const MenuText = styled.span`
  font-size: 0.95rem;
  white-space: nowrap;
  flex: 1;
  position: relative;
  z-index: 1;
`;

export const ActiveIndicator = styled.div`
  position: absolute;
  right: var(--spacing-md);
  top: 50%;
  transform: translateY(-50%);
  width: 6px;
  height: 6px;
  background: var(--color-blue);
  border-radius: var(--radius-full);
  animation: fadeIn 0.3s ease-out;
  box-shadow: 0 0 0 2px rgba(74, 144, 217, 0.2);

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-50%) scale(0);
    }
    to {
      opacity: 1;
      transform: translateY(-50%) scale(1);
    }
  }
`;

export const SidebarFooter = styled.div`
  padding: var(--spacing-lg) var(--spacing-xl);
  border-top: 1px solid var(--color-gray-light);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--color-gray-light), transparent);
  }
`;

interface FooterTextProps {
  open?: boolean;
}

export const FooterText = styled.p<FooterTextProps>`
  font-size: 0.75rem;
  color: var(--color-gray);
  margin: 0;
  text-align: center;
  white-space: ${(props) => (props.open ? 'normal' : 'nowrap')};
  overflow: hidden;
  text-overflow: ellipsis;
`;
