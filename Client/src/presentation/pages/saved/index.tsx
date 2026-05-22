import { useState, useEffect } from 'react';
import { Bookmark, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { AppShell } from '../../components';
import { BookmarkService } from '../../../infrastructure/api/bookmark.service';
import styled from 'styled-components';
import toast from 'react-hot-toast';

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: var(--spacing-xl);
  @media (max-width: 768px) { grid-template-columns: 1fr; }
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
  position: relative;

  &:hover {
    transform: translateY(-3px);
    box-shadow: var(--shadow-lg);
  }
`;

const CardTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--color-dark);
  margin: 0;
  padding-right: 40px;
`;

const CardDesc = styled.p`
  font-size: 0.9rem;
  color: var(--color-gray);
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  flex: 1;
`;

const RemoveBtn = styled.button`
  position: absolute;
  top: var(--spacing-md);
  right: var(--spacing-md);
  background: none;
  border: none;
  color: var(--color-gray);
  cursor: pointer;
  padding: 6px;
  border-radius: 50%;
  transition: all var(--transition-fast);
  &:hover { background: rgba(239, 68, 68, 0.1); color: #ef4444; }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: var(--spacing-3xl);
  color: var(--color-gray);
  h3 { color: var(--color-dark); margin-bottom: var(--spacing-sm); }
`;

const Chip = styled.span`
  display: inline-block;
  padding: 4px 10px;
  background: rgba(10, 94, 176, 0.08);
  color: var(--color-primary);
  border-radius: var(--radius-sm);
  font-size: 0.75rem;
  font-weight: 600;
`;

const SavedProjects = () => {
  const navigate = useNavigate();
  const [bookmarks, setBookmarks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBookmarks();
  }, []);

  const loadBookmarks = async () => {
    try {
      const res = await BookmarkService.getMyBookmarks();
      setBookmarks(res.data || []);
    } catch {} finally {
      setLoading(false);
    }
  };

  const handleRemove = async (e: React.MouseEvent, projectId: string) => {
    e.stopPropagation();
    try {
      await BookmarkService.toggle(projectId);
      setBookmarks(prev => prev.filter(b => (b.projectId || b.project?.id) !== projectId));
      toast.success('Removed from saved');
    } catch {
      toast.error('Failed to remove bookmark');
    }
  };

  return (
    <AppShell title="Saved Projects">
      {loading ? (
        <EmptyState><p>Loading...</p></EmptyState>
      ) : bookmarks.length === 0 ? (
        <EmptyState>
          <Bookmark size={48} style={{ color: 'var(--color-gray-light)', marginBottom: '16px' }} />
          <h3>No saved projects yet</h3>
          <p>Browse projects and save them for later</p>
        </EmptyState>
      ) : (
        <Grid>
          {bookmarks.map(b => {
            const project = b.project || b;
            return (
              <Card key={b.id} onClick={() => navigate(`/projects/${project.id || b.projectId}`)}>
                <RemoveBtn onClick={(e) => handleRemove(e, project.id || b.projectId)}>
                  <Trash2 size={18} />
                </RemoveBtn>
                <CardTitle>{project.title || 'Project'}</CardTitle>
                <CardDesc>{project.description || ''}</CardDesc>
                {project.investmentStatus && (
                  <Chip>{project.investmentStatus.replace(/-/g, ' ')}</Chip>
                )}
              </Card>
            );
          })}
        </Grid>
      )}
    </AppShell>
  );
};

export default SavedProjects;
