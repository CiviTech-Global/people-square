import styled from 'styled-components';
import { Plus, Compass, Bookmark } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  gap: var(--spacing-md);
  flex-wrap: wrap;
`;

const ActionBtn = styled.button`
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: 12px 20px;
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%);
  color: white;
  border: none;
  border-radius: var(--radius-full);
  font-weight: 600;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all var(--transition-fast);
  box-shadow: 0 4px 14px rgba(10, 94, 176, 0.2);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(10, 94, 176, 0.3);
  }
`;

const SecondaryBtn = styled(ActionBtn)`
  background: var(--color-white);
  color: var(--color-primary);
  border: 1px solid rgba(10, 94, 176, 0.15);
  box-shadow: none;

  &:hover {
    background: rgba(10, 94, 176, 0.04);
    box-shadow: var(--shadow-sm);
  }
`;

interface QuickActionsProps {
  role?: string;
}

export const QuickActions = ({ role }: QuickActionsProps) => {
  const navigate = useNavigate();

  return (
    <Container>
      {role === 'startup-owner' && (
        <ActionBtn onClick={() => navigate('/my-projects')}>
          <Plus size={18} /> Create Project
        </ActionBtn>
      )}
      <SecondaryBtn onClick={() => navigate('/discover')}>
        <Compass size={18} /> Discover
      </SecondaryBtn>
      {role === 'investor' && (
        <SecondaryBtn onClick={() => navigate('/saved')}>
          <Bookmark size={18} /> Saved
        </SecondaryBtn>
      )}
    </Container>
  );
};
