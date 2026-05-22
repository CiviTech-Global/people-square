import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import type { Project } from '../../../infrastructure/api/project.service';

const Container = styled.div`
  display: flex;
  gap: var(--spacing-lg);
  overflow-x: auto;
  padding-bottom: var(--spacing-sm);
  scroll-snap-type: x mandatory;

  &::-webkit-scrollbar { height: 4px; }
  &::-webkit-scrollbar-thumb { background: var(--color-gray-light); border-radius: 4px; }
`;

const Card = styled.div`
  min-width: 280px;
  max-width: 320px;
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(10, 94, 176, 0.1);
  border-radius: var(--radius-lg);
  padding: var(--spacing-xl);
  cursor: pointer;
  scroll-snap-align: start;
  transition: all var(--transition-fast);

  &:hover {
    transform: translateY(-3px);
    box-shadow: var(--shadow-lg);
    border-color: var(--color-primary);
  }
`;

const CardTitle = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-dark);
  margin: 0 0 8px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const CardDesc = styled.p`
  font-size: 0.85rem;
  color: var(--color-gray);
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const Chip = styled.span`
  display: inline-block;
  padding: 4px 10px;
  background: rgba(10, 94, 176, 0.08);
  color: var(--color-primary);
  border-radius: var(--radius-sm);
  font-size: 0.75rem;
  font-weight: 600;
  margin-top: 12px;
`;

interface ProjectCarouselProps {
  projects: Project[];
  emptyText?: string;
}

export const ProjectCarousel = ({ projects, emptyText = 'No projects yet' }: ProjectCarouselProps) => {
  const navigate = useNavigate();

  if (projects.length === 0) {
    return <p style={{ color: 'var(--color-gray)', fontSize: '0.9rem' }}>{emptyText}</p>;
  }

  return (
    <Container>
      {projects.map(p => (
        <Card key={p.id} onClick={() => navigate(`/projects/${p.id}`)}>
          <CardTitle>{p.title}</CardTitle>
          <CardDesc>{p.description}</CardDesc>
          <Chip>{p.investmentStatus.replace(/-/g, ' ')}</Chip>
        </Card>
      ))}
    </Container>
  );
};
