import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-50%) scale(0); }
  to { opacity: 1; transform: translateY(-50%) scale(1); }
`;

export const MobileOverlay = styled.div`
  display: none;
  @media (max-width: 768px) {
    display: block;
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(4px);
    z-index: calc(var(--z-fixed) - 1);
  }
`;

export const SidebarContainer = styled.div<{ $open?: boolean; $mobileOpen?: boolean }>`
  width: ${p => p.$open ? '260px' : '72px'};
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-right: 1px solid rgba(10, 94, 176, 0.08);
  box-shadow: 4px 0 24px rgba(10, 94, 176, 0.06);
  transition: width var(--transition-default);
  display: flex;
  flex-direction: column;
  z-index: var(--z-fixed);
  overflow: hidden;

  @media (max-width: 768px) {
    width: 260px;
    transform: translateX(${p => p.$mobileOpen ? '0' : '-100%'});
    transition: transform var(--transition-default);
  }
`;

export const UserSection = styled.div<{ $open?: boolean }>`
  padding: ${p => p.$open ? 'var(--spacing-xl)' : 'var(--spacing-lg) var(--spacing-sm)'};
  border-bottom: 1px solid rgba(10, 94, 176, 0.08);
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  justify-content: ${p => p.$open ? 'flex-start' : 'center'};
  min-height: 80px;
`;

export const AvatarCircle = styled.div<{ $open?: boolean }>`
  width: ${p => p.$open ? '44px' : '36px'};
  height: ${p => p.$open ? '44px' : '36px'};
  border-radius: 50%;
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  overflow: hidden;
  transition: all var(--transition-fast);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  span {
    color: white;
    font-weight: 700;
    font-size: ${p => p.$open ? '0.875rem' : '0.75rem'};
    letter-spacing: 0.5px;
  }
`;

export const UserInfo = styled.div`
  overflow: hidden;
`;

export const UserName = styled.p`
  font-weight: 600;
  font-size: 0.9rem;
  color: var(--color-dark);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 0;
`;

export const UserRole = styled.p`
  font-size: 0.75rem;
  color: var(--color-primary);
  font-weight: 500;
  margin: 2px 0 0;
`;

export const ToggleButton = styled.button`
  position: absolute;
  top: 80px;
  right: -12px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: var(--color-white);
  border: 1px solid var(--color-gray-light);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: var(--shadow-sm);
  z-index: 10;
  color: var(--color-gray);
  transition: all var(--transition-fast);

  &:hover {
    background: var(--color-primary);
    color: white;
    border-color: var(--color-primary);
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

export const MenuList = styled.ul`
  flex: 1;
  list-style: none;
  padding: var(--spacing-md) var(--spacing-sm);
  display: flex;
  flex-direction: column;
  gap: 2px;
  overflow-y: auto;
  overflow-x: hidden;
`;

export const MenuItem = styled.li`
  display: flex;
  flex-direction: column;
`;

export const MenuButton = styled.button<{ $isActive?: boolean }>`
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  padding: 12px 16px;
  margin: 0 4px;
  border: none;
  border-radius: var(--radius-md);
  background: ${p => p.$isActive ? 'rgba(10, 94, 176, 0.08)' : 'transparent'};
  color: ${p => p.$isActive ? 'var(--color-primary)' : 'var(--color-gray)'};
  cursor: pointer;
  transition: all var(--transition-fast);
  position: relative;
  font-weight: ${p => p.$isActive ? 600 : 500};
  font-size: 0.9rem;
  width: calc(100% - 8px);
  text-align: left;

  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 3px;
    height: ${p => p.$isActive ? '20px' : '0'};
    background: var(--color-primary);
    border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
    transition: height var(--transition-fast);
  }

  &:hover {
    background: ${p => p.$isActive ? 'rgba(10, 94, 176, 0.12)' : 'rgba(10, 94, 176, 0.04)'};
    color: ${p => p.$isActive ? 'var(--color-primary)' : 'var(--color-dark)'};
  }
`;

export const MenuIcon = styled.span<{ $isActive?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  flex-shrink: 0;

  svg {
    width: 22px;
    height: 22px;
    stroke-width: ${p => p.$isActive ? 2.5 : 2};
  }
`;

export const MenuText = styled.span`
  font-size: 0.9rem;
  white-space: nowrap;
  flex: 1;
`;

export const ActiveIndicator = styled.div`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  width: 6px;
  height: 6px;
  background: var(--color-primary);
  border-radius: 50%;
  animation: ${fadeIn} 0.3s ease-out;
  box-shadow: 0 0 0 3px rgba(10, 94, 176, 0.12);
`;

export const SidebarFooter = styled.div`
  padding: var(--spacing-lg);
  border-top: 1px solid rgba(10, 94, 176, 0.08);
  text-align: center;
`;

export const FooterText = styled.p<{ $open?: boolean }>`
  font-size: 0.7rem;
  color: var(--color-gray);
  margin: 0;
  font-weight: 500;
  letter-spacing: 0.5px;
  text-transform: uppercase;
`;
