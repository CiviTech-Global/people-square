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

const Card = styled.div`
  background: rgba(255, 255, 255, 0.92);
  border: 1px solid rgba(10, 94, 176, 0.08);
  border-radius: var(--radius-lg);
  padding: var(--spacing-xl);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
`;

const TitleBar = styled(SkeletonBase)`
  height: 20px;
  width: 70%;
`;

const DescLine = styled(SkeletonBase)<{ $w?: string }>`
  height: 14px;
  width: ${p => p.$w || '100%'};
`;

const ChipBar = styled(SkeletonBase)`
  height: 24px;
  width: 100px;
  border-radius: var(--radius-full);
`;

const ChipsRow = styled.div`
  display: flex;
  gap: var(--spacing-sm);
`;

export const ProjectCardSkeleton = () => (
  <Card>
    <TitleBar />
    <DescLine />
    <DescLine $w="80%" />
    <ChipsRow>
      <ChipBar />
      <ChipBar />
    </ChipsRow>
  </Card>
);
