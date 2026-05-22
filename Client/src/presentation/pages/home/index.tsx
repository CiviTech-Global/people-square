import { useState, useEffect } from 'react';
import { FolderOpen, Eye, TrendingUp, Bookmark } from 'lucide-react';
import { AppShell } from '../../components';
import { StatCard, ProjectCarousel, QuickActions } from '../../components/dashboard';
import { useAuth } from '../../../application/context/AuthContext';
import { ProjectService, type Project } from '../../../infrastructure/api/project.service';
import styled from 'styled-components';

const WelcomeSection = styled.div`
  margin-bottom: var(--spacing-2xl);

  h1 {
    font-size: 2rem;
    font-weight: 700;
    color: var(--color-dark);
    margin: 0 0 4px;
  }

  p {
    font-size: 1rem;
    color: var(--color-gray);
    margin: 0 0 var(--spacing-lg);
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--spacing-lg);
  margin-bottom: var(--spacing-2xl);
`;

const SectionTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--color-dark);
  margin: 0 0 var(--spacing-lg);
`;

const Section = styled.div`
  margin-bottom: var(--spacing-2xl);
`;

const HomePage = () => {
  const { user } = useAuth();
  const [myProjects, setMyProjects] = useState<Project[]>([]);
  const [allProjects, setAllProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, [user]);

  const loadData = async () => {
    try {
      setLoading(true);
      const [allRes] = await Promise.all([
        ProjectService.getAllProjects(),
      ]);
      setAllProjects(allRes.data);

      if (user?.role === 'startup-owner') {
        const myRes = await ProjectService.getMyProjects();
        setMyProjects(myRes.data);
      }
    } catch {
      // silent fail
    } finally {
      setLoading(false);
    }
  };

  const sponsorProjects = allProjects.filter(
    p => p.investmentStatus === 'looking-for-first-sponsor' || p.investmentStatus === 'looking-for-more-sponsors'
  );

  return (
    <AppShell title="Dashboard">
      <WelcomeSection>
        <h1>Welcome back, {user?.fullName?.split(' ')[0] || 'User'}!</h1>
        <p>Here's what's happening in People Square</p>
        <QuickActions role={user?.role} />
      </WelcomeSection>

      {user?.role === 'startup-owner' && (
        <>
          <StatsGrid>
            <StatCard icon={<FolderOpen size={24} />} label="My Projects" value={myProjects.length} />
            <StatCard icon={<Eye size={24} />} label="Total Views" value={myProjects.reduce((a, p) => a + ((p as any).viewCount || 0), 0)} color="rgba(91, 181, 240, 0.12)" />
          </StatsGrid>
          <Section>
            <SectionTitle>My Projects</SectionTitle>
            <ProjectCarousel projects={myProjects.slice(0, 6)} emptyText="Create your first project to get started!" />
          </Section>
        </>
      )}

      {user?.role === 'investor' && (
        <>
          <StatsGrid>
            <StatCard icon={<TrendingUp size={24} />} label="Projects Available" value={sponsorProjects.length} />
            <StatCard icon={<Bookmark size={24} />} label="Saved" value={0} color="rgba(45, 212, 160, 0.12)" />
          </StatsGrid>
          <Section>
            <SectionTitle>Projects Seeking Investment</SectionTitle>
            <ProjectCarousel projects={sponsorProjects.slice(0, 6)} emptyText="No projects seeking investment right now" />
          </Section>
        </>
      )}

      {(user?.role === 'organization' || user?.role === 'citizen') && (
        <>
          <StatsGrid>
            <StatCard icon={<FolderOpen size={24} />} label="Total Projects" value={allProjects.length} />
            <StatCard icon={<TrendingUp size={24} />} label="Seeking Sponsors" value={sponsorProjects.length} color="rgba(91, 181, 240, 0.12)" />
          </StatsGrid>
        </>
      )}

      <Section>
        <SectionTitle>Recent Projects</SectionTitle>
        <ProjectCarousel projects={allProjects.slice(0, 8)} emptyText="No projects yet" />
      </Section>
    </AppShell>
  );
};

export default HomePage;
