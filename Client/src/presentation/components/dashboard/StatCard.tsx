import styled from 'styled-components';

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  color?: string;
}

const Card = styled.div`
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(10, 94, 176, 0.1);
  border-radius: var(--radius-lg);
  padding: var(--spacing-xl);
  display: flex;
  align-items: center;
  gap: var(--spacing-lg);
  transition: all var(--transition-fast);

  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
  }
`;

const IconWrap = styled.div<{ $color?: string }>`
  width: 48px;
  height: 48px;
  border-radius: var(--radius-md);
  background: ${p => p.$color || 'rgba(10, 94, 176, 0.08)'};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: var(--color-primary);
`;

const Info = styled.div``;

const Value = styled.p`
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--color-dark);
  margin: 0;
  line-height: 1;
`;

const Label = styled.p`
  font-size: 0.85rem;
  color: var(--color-gray);
  margin: 4px 0 0;
`;

export const StatCard = ({ icon, label, value, color }: StatCardProps) => (
  <Card>
    <IconWrap $color={color}>{icon}</IconWrap>
    <Info>
      <Value>{value}</Value>
      <Label>{label}</Label>
    </Info>
  </Card>
);
