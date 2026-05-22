import { useState } from 'react';
import { useAuth } from '../../../../application/context/AuthContext';
import Sidebar from '../Sidebar/Sidebar';
import GlassAppBar from '../GlassAppBar/GlassAppBar';
import styled from 'styled-components';

interface AppShellProps {
  children: React.ReactNode;
  title: string;
}

const ShellContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background: var(--gradient-background);
`;

const MainContent = styled.div<{ $sidebarOpen: boolean }>`
  flex: 1;
  margin-left: ${p => p.$sidebarOpen ? '260px' : '72px'};
  padding: 0 var(--spacing-2xl) var(--spacing-xl);
  overflow-y: auto;
  overflow-x: hidden;
  transition: margin-left var(--transition-default);

  @media (max-width: 768px) {
    margin-left: 0;
    padding: 0 var(--spacing-lg) var(--spacing-lg);
  }
`;

const PageContent = styled.div`
  margin-top: var(--spacing-lg);
  max-width: 1400px;
`;

const AppShell = ({ children, title }: AppShellProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <ShellContainer>
      <Sidebar
        open={sidebarOpen}
        mobileOpen={mobileOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        onMobileClose={() => setMobileOpen(false)}
      />
      <MainContent $sidebarOpen={sidebarOpen}>
        <GlassAppBar
          title={title}
          onMenuClick={() => setMobileOpen(true)}
        />
        <PageContent>
          {children}
        </PageContent>
      </MainContent>
    </ShellContainer>
  );
};

export default AppShell;
