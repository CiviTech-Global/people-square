import { useState, useEffect } from 'react';
import { TrendingUp, Clock, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { AppShell } from '../../components';
import { InvestmentInterestService, type InvestmentInterest } from '../../../infrastructure/api/investmentInterest.service';
import styled from 'styled-components';

const StatsRow = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: var(--spacing-lg);
  margin-bottom: var(--spacing-2xl);
`;

const StatBox = styled.div`
  background: rgba(255, 255, 255, 0.92);
  border: 1px solid rgba(10, 94, 176, 0.1);
  border-radius: var(--radius-lg);
  padding: var(--spacing-xl);
  text-align: center;

  h3 { font-size: 1.75rem; color: var(--color-dark); margin: 0; }
  p { font-size: 0.85rem; color: var(--color-gray); margin: 4px 0 0; }
`;

const Tabs = styled.div`
  display: flex;
  gap: 0;
  border-bottom: 1px solid rgba(10, 94, 176, 0.1);
  margin-bottom: var(--spacing-xl);
`;

const Tab = styled.button<{ $active?: boolean }>`
  padding: 12px 20px;
  border: none;
  background: transparent;
  font-weight: ${p => p.$active ? 600 : 500};
  font-size: 0.9rem;
  color: ${p => p.$active ? 'var(--color-primary)' : 'var(--color-gray)'};
  cursor: pointer;
  border-bottom: 2px solid ${p => p.$active ? 'var(--color-primary)' : 'transparent'};
  transition: all var(--transition-fast);
  &:hover { color: var(--color-primary); }
`;

const Card = styled.div`
  background: rgba(255, 255, 255, 0.92);
  border: 1px solid rgba(10, 94, 176, 0.08);
  border-radius: var(--radius-lg);
  padding: var(--spacing-xl);
  margin-bottom: var(--spacing-md);
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  transition: all var(--transition-fast);

  &:hover { transform: translateY(-2px); box-shadow: var(--shadow-md); }
`;

const CardInfo = styled.div`
  flex: 1;
  h3 { margin: 0; font-size: 1.05rem; color: var(--color-dark); }
  p { margin: 4px 0 0; font-size: 0.85rem; color: var(--color-gray); }
`;

const StatusBadge = styled.span<{ $status: string }>`
  padding: 6px 14px;
  border-radius: var(--radius-full);
  font-size: 0.8rem;
  font-weight: 600;
  background: ${p => {
    switch (p.$status) {
      case 'expressed': return 'rgba(10, 94, 176, 0.1)';
      case 'in-discussion': return 'rgba(245, 158, 11, 0.1)';
      case 'committed': return 'rgba(45, 212, 160, 0.1)';
      case 'withdrawn': return 'var(--color-gray-light)';
      default: return 'var(--color-gray-light)';
    }
  }};
  color: ${p => {
    switch (p.$status) {
      case 'expressed': return 'var(--color-primary)';
      case 'in-discussion': return '#d97706';
      case 'committed': return '#0d9668';
      case 'withdrawn': return 'var(--color-gray)';
      default: return 'var(--color-gray)';
    }
  }};
`;

const EmptyState = styled.div`
  text-align: center;
  padding: var(--spacing-3xl);
  color: var(--color-gray);
  h3 { color: var(--color-dark); }
`;

const Portfolio = () => {
  const navigate = useNavigate();
  const [interests, setInterests] = useState<InvestmentInterest[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState('all');

  useEffect(() => {
    loadPortfolio();
  }, []);

  const loadPortfolio = async () => {
    try {
      const res = await InvestmentInterestService.getMyPortfolio();
      setInterests(res.data || []);
    } catch {} finally {
      setLoading(false);
    }
  };

  const filtered = tab === 'all' ? interests : interests.filter(i => i.status === tab);

  return (
    <AppShell title="Portfolio">
      <StatsRow>
        <StatBox>
          <h3>{interests.length}</h3>
          <p>Total Interests</p>
        </StatBox>
        <StatBox>
          <h3>{interests.filter(i => i.status === 'expressed' || i.status === 'in-discussion').length}</h3>
          <p>Active</p>
        </StatBox>
        <StatBox>
          <h3>{interests.filter(i => i.status === 'committed').length}</h3>
          <p>Committed</p>
        </StatBox>
      </StatsRow>

      <Tabs>
        {['all', 'expressed', 'in-discussion', 'committed', 'withdrawn'].map(t => (
          <Tab key={t} $active={tab === t} onClick={() => setTab(t)}>
            {t === 'all' ? 'All' : t.split('-').map(w => w[0].toUpperCase() + w.slice(1)).join(' ')}
          </Tab>
        ))}
      </Tabs>

      {loading ? (
        <EmptyState><p>Loading...</p></EmptyState>
      ) : filtered.length === 0 ? (
        <EmptyState>
          <h3>No investments yet</h3>
          <p>Explore projects and express interest to start building your portfolio</p>
        </EmptyState>
      ) : (
        filtered.map(interest => (
          <Card key={interest.id} onClick={() => navigate(`/projects/${interest.projectId}`)}>
            <CardInfo>
              <h3>{interest.project?.title || 'Project'}</h3>
              <p>{interest.message || 'Interest expressed on ' + new Date(interest.createdAt).toLocaleDateString()}</p>
            </CardInfo>
            <StatusBadge $status={interest.status}>
              {interest.status.split('-').map(w => w[0].toUpperCase() + w.slice(1)).join(' ')}
            </StatusBadge>
          </Card>
        ))
      )}
    </AppShell>
  );
};

export default Portfolio;
