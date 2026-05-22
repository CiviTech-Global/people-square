import { useState } from 'react';
import { AppShell } from '../../components';
import Profile from './profile';
import Account from './account';
import styled from 'styled-components';

const TabContainer = styled.div`
  display: flex;
  gap: 0;
  border-bottom: 1px solid rgba(10, 94, 176, 0.1);
  margin-bottom: var(--spacing-xl);
`;

const Tab = styled.button<{ $active?: boolean }>`
  padding: 14px 24px;
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

const Settings = () => {
  const [currentTab, setCurrentTab] = useState(0);

  return (
    <AppShell title="Settings">
      <TabContainer>
        <Tab $active={currentTab === 0} onClick={() => setCurrentTab(0)}>Profile</Tab>
        <Tab $active={currentTab === 1} onClick={() => setCurrentTab(1)}>Account</Tab>
      </TabContainer>

      {currentTab === 0 && <Profile />}
      {currentTab === 1 && <Account />}
    </AppShell>
  );
};

export default Settings;
