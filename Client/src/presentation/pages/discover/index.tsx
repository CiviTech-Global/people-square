import { useState, useEffect } from 'react';
import { Search, Filter, Eye } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AppShell } from '../../components';
import { ProjectService, type Project } from '../../../infrastructure/api/project.service';
import styled from 'styled-components';

const TopBar = styled.div`
  display: flex;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-xl);
  flex-wrap: wrap;
`;

const SearchBox = styled.div`
  flex: 1;
  min-width: 280px;
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(10, 94, 176, 0.12);
  border-radius: var(--radius-full);
  padding: 10px 20px;

  &:focus-within {
    border-color: var(--color-primary);
    box-shadow: 0 0 0 3px rgba(10, 94, 176, 0.08);
  }

  input {
    flex: 1;
    border: none;
    background: transparent;
    font-size: 0.95rem;
    color: var(--color-dark);
    outline: none;
    font-family: inherit;
    &::placeholder { color: var(--color-gray); }
  }
`;

const FilterChip = styled.button<{ $active?: boolean }>`
  padding: 8px 16px;
  border-radius: var(--radius-full);
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  transition: all var(--transition-fast);
  border: 1px solid ${p => p.$active ? 'var(--color-primary)' : 'rgba(10, 94, 176, 0.12)'};
  background: ${p => p.$active ? 'rgba(10, 94, 176, 0.08)' : 'white'};
  color: ${p => p.$active ? 'var(--color-primary)' : 'var(--color-gray)'};

  &:hover {
    border-color: var(--color-primary);
    color: var(--color-primary);
  }
`;

const FiltersRow = styled.div`
  display: flex;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-xl);
  flex-wrap: wrap;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: var(--spacing-xl);

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div`
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(10, 94, 176, 0.1);
  border-radius: var(--radius-lg);
  padding: var(--spacing-xl);
  cursor: pointer;
  transition: all var(--transition-default);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);

  &:hover {
    transform: translateY(-3px);
    box-shadow: var(--shadow-lg);
    border-color: rgba(10, 94, 176, 0.2);
  }
`;

const CardTitle = styled.h3`
  font-size: 1.15rem;
  font-weight: 600;
  color: var(--color-dark);
  margin: 0;
`;

const CardDesc = styled.p`
  font-size: 0.9rem;
  color: var(--color-gray);
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  flex: 1;
`;

const CardChips = styled.div`
  display: flex;
  gap: var(--spacing-sm);
  flex-wrap: wrap;
`;

const Chip = styled.span<{ $variant?: string }>`
  padding: 4px 10px;
  border-radius: var(--radius-sm);
  font-size: 0.75rem;
  font-weight: 600;
  background: ${p => {
    switch (p.$variant) {
      case 'sponsor': return 'rgba(10, 94, 176, 0.1)';
      case 'accent': return 'rgba(45, 212, 160, 0.1)';
      default: return 'var(--color-gray-light)';
    }
  }};
  color: ${p => {
    switch (p.$variant) {
      case 'sponsor': return 'var(--color-primary)';
      case 'accent': return 'var(--color-accent)';
      default: return 'var(--color-gray)';
    }
  }};
`;

const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: var(--spacing-sm);
  border-top: 1px solid rgba(10, 94, 176, 0.06);
`;

const OwnerInfo = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  font-size: 0.8rem;
  color: var(--color-gray);
`;

const OwnerAvatar = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 0.6rem;
  font-weight: 700;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: var(--spacing-3xl);
  color: var(--color-gray);

  h3 { color: var(--color-dark); margin-bottom: var(--spacing-sm); }
`;

const STATUSES = ['all', 'looking-for-first-sponsor', 'looking-for-more-sponsors', 'self-sponsored'] as const;

const Discover = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      setLoading(true);
      const response = await ProjectService.getAllProjects();
      setProjects(response.data);
    } catch {
      // silent
    } finally {
      setLoading(false);
    }
  };

  const filtered = projects.filter(p => {
    const matchesSearch = !search ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'all' || p.investmentStatus === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusLabel = (s: string) => {
    if (s === 'all') return 'All';
    return s.split('-').map(w => w[0].toUpperCase() + w.slice(1)).join(' ');
  };

  return (
    <AppShell title="Discover">
      <TopBar>
        <SearchBox>
          <Search size={18} color="var(--color-gray)" />
          <input
            placeholder="Search projects..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </SearchBox>
      </TopBar>

      <FiltersRow>
        {STATUSES.map(s => (
          <FilterChip
            key={s}
            $active={statusFilter === s}
            onClick={() => setStatusFilter(s)}
          >
            {getStatusLabel(s)}
          </FilterChip>
        ))}
      </FiltersRow>

      {loading ? (
        <EmptyState><p>Loading projects...</p></EmptyState>
      ) : filtered.length === 0 ? (
        <EmptyState>
          <h3>No projects found</h3>
          <p>Try adjusting your search or filters</p>
        </EmptyState>
      ) : (
        <Grid>
          {filtered.map(project => (
            <Card key={project.id} onClick={() => navigate(`/projects/${project.id}`)}>
              <CardTitle>{project.title}</CardTitle>
              <CardDesc>{project.description}</CardDesc>
              <CardChips>
                <Chip $variant={project.investmentStatus !== 'self-sponsored' ? 'sponsor' : undefined}>
                  {getStatusLabel(project.investmentStatus)}
                </Chip>
                {project.isRegistered && <Chip $variant="accent">Registered</Chip>}
              </CardChips>
              <CardFooter>
                <OwnerInfo>
                  <OwnerAvatar>
                    {(project as any).owner?.fullName?.[0]?.toUpperCase() || 'U'}
                  </OwnerAvatar>
                  {(project as any).owner?.fullName || 'Unknown'}
                </OwnerInfo>
              </CardFooter>
            </Card>
          ))}
        </Grid>
      )}
    </AppShell>
  );
};

export default Discover;
