import styled from 'styled-components';

export const StyledAppBar = styled.header`
  position: sticky;
  top: 0;
  z-index: var(--z-sticky);
  background: var(--color-white);
  border-bottom: 1px solid var(--color-gray-light);
  box-shadow: var(--shadow-sm);
  transition: all var(--transition-fast);

  @media (max-width: 768px) {
    position: fixed;
    left: 80px;
    right: 0;
  }
`;

export const StyledToolbar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 68px;
  padding: 0 var(--spacing-xl);
  gap: var(--spacing-xl);

  @media (max-width: 768px) {
    height: 60px;
    padding: 0 var(--spacing-lg);
    gap: var(--spacing-md);
  }
`;

export const LogoSection = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-lg);
  flex: 1;
`;

export const Title = styled.h1`
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--color-dark);
  margin: 0;
  letter-spacing: -0.02em;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const ActionsSection = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  margin-left: auto;
`;
