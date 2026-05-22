import styled, { keyframes } from 'styled-components';

const shimmer = keyframes`
  0% { background-position: -200px 0; }
  100% { background-position: calc(200px + 100%) 0; }
`;

const SkeletonBase = styled.div`
  background: linear-gradient(90deg, rgba(10, 94, 176, 0.04) 25%, rgba(10, 94, 176, 0.08) 50%, rgba(10, 94, 176, 0.04) 75%);
  background-size: 200px 100%;
  animation: ${shimmer} 1.5s infinite;
  border-radius: var(--radius-sm);
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xl);
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--spacing-lg);
`;

const StatCard = styled.div`
  background: rgba(255, 255, 255, 0.92);
  border: 1px solid rgba(10, 94, 176, 0.08);
  border-radius: var(--radius-lg);
  padding: var(--spacing-xl);
  display: flex;
  align-items: center;
  gap: var(--spacing-lg);
`;

const Circle = styled(SkeletonBase)`
  width: 48px;
  height: 48px;
  border-radius: var(--radius-md);
`;

const Line = styled(SkeletonBase)<{ $h?: string; $w?: string }>`
  height: ${p => p.$h || '16px'};
  width: ${p => p.$w || '100%'};
`;

const CardsRow = styled.div`
  display: flex;
  gap: var(--spacing-lg);
  overflow: hidden;
`;

const MiniCard = styled.div`
  min-width: 280px;
  background: rgba(255, 255, 255, 0.92);
  border: 1px solid rgba(10, 94, 176, 0.08);
  border-radius: var(--radius-lg);
  padding: var(--spacing-xl);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
`;

export const DashboardSkeleton = () => (
  <Container>
    <div>
      <Line $h="28px" $w="300px" />
      <Line $h="16px" $w="200px" style={{ marginTop: '8px' }} />
    </div>
    <StatsGrid>
      {[1, 2, 3].map(i => (
        <StatCard key={i}>
          <Circle />
          <div style={{ flex: 1 }}>
            <Line $h="24px" $w="60px" />
            <Line $h="12px" $w="80px" style={{ marginTop: '6px' }} />
          </div>
        </StatCard>
      ))}
    </StatsGrid>
    <div>
      <Line $h="20px" $w="150px" style={{ marginBottom: '16px' }} />
      <CardsRow>
        {[1, 2, 3].map(i => (
          <MiniCard key={i}>
            <Line $h="18px" $w="80%" />
            <Line $h="14px" />
            <Line $h="14px" $w="70%" />
          </MiniCard>
        ))}
      </CardsRow>
    </div>
  </Container>
);
