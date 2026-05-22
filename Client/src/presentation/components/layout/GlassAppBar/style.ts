import styled from 'styled-components';

export const StyledAppBar = styled.header`
  position: sticky;
  top: 0;
  z-index: var(--z-sticky);
  background: rgba(255, 255, 255, 0.88);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-bottom: 1px solid rgba(10, 94, 176, 0.08);
  padding: 0 var(--spacing-lg);
`;

export const StyledToolbar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
  gap: var(--spacing-lg);
`;

export const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  min-width: 0;
`;

export const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: var(--color-dark);
  cursor: pointer;
  padding: 8px;
  border-radius: var(--radius-md);
  transition: background var(--transition-fast);

  &:hover { background: var(--color-gray-light); }

  @media (max-width: 768px) { display: flex; }
`;

export const Title = styled.h1`
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--color-dark);
  margin: 0;
  white-space: nowrap;
  letter-spacing: -0.02em;

  @media (max-width: 480px) { font-size: 1.1rem; }
`;

export const CenterSection = styled.div`
  flex: 1;
  max-width: 480px;
  display: flex;
  justify-content: center;

  @media (max-width: 768px) { display: none; }
`;

export const SearchForm = styled.form`
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  background: rgba(10, 94, 176, 0.04);
  border: 1px solid rgba(10, 94, 176, 0.1);
  border-radius: var(--radius-full);
  padding: 8px 16px;
  width: 100%;
  transition: all var(--transition-fast);
  color: var(--color-gray);

  &:focus-within {
    border-color: var(--color-primary);
    background: white;
    box-shadow: 0 0 0 3px rgba(10, 94, 176, 0.08);
  }
`;

export const SearchInput = styled.input`
  flex: 1;
  border: none;
  background: transparent;
  font-size: 0.875rem;
  color: var(--color-dark);
  outline: none;
  font-family: inherit;

  &::placeholder { color: var(--color-gray); }
`;

export const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
`;

export const IconBtn = styled.button`
  background: none;
  border: none;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: var(--color-gray);
  transition: all var(--transition-fast);
  position: relative;

  &:hover {
    background: rgba(10, 94, 176, 0.06);
    color: var(--color-primary);
  }
`;

export const NotifArea = styled.div`
  position: relative;
`;

export const UnreadBadge = styled.span`
  position: absolute;
  top: 2px;
  right: 2px;
  min-width: 16px;
  height: 16px;
  padding: 0 4px;
  border-radius: 8px;
  background: #E63946;
  color: white;
  font-size: 0.6rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
  pointer-events: none;
`;

export const ProfileArea = styled.div`
  position: relative;
`;

export const ProfileButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 2px;
  border-radius: 50%;
  transition: box-shadow var(--transition-fast);

  &:hover { box-shadow: 0 0 0 3px rgba(10, 94, 176, 0.1); }
`;

export const SmallAvatar = styled.div`
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  img { width: 100%; height: 100%; object-fit: cover; }
  span { color: white; font-size: 0.7rem; font-weight: 700; }
`;

export const DropdownMenu = styled.div`
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(16px);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-lg);
  border: 1px solid rgba(10, 94, 176, 0.1);
  min-width: 180px;
  padding: 6px;
  animation: slideDown 0.15s ease-out;

  @keyframes slideDown {
    from { opacity: 0; transform: translateY(-8px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

export const DropdownItem = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: 10px 12px;
  border: none;
  background: transparent;
  color: var(--color-dark);
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  border-radius: var(--radius-sm);
  transition: background var(--transition-fast);
  text-align: left;

  svg { color: var(--color-gray); }

  &:hover {
    background: rgba(10, 94, 176, 0.06);
    svg { color: var(--color-primary); }
  }
`;

export const DropdownDivider = styled.div`
  height: 1px;
  background: var(--color-gray-light);
  margin: 4px 0;
`;

// Keep backward compat exports
export const LogoSection = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
`;

export const ActionsSection = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
`;
