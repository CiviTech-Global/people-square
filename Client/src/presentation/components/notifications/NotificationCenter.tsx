import { useEffect } from 'react';
import { Bell, CheckCheck, MessageSquare, Users, TrendingUp, Folder } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useNotificationStore } from '../../../application/stores/notificationStore';
import type { Notification } from '../../../infrastructure/api/notification.service';
import styled from 'styled-components';

const Container = styled.div`
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  width: 380px;
  max-height: 480px;
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(16px);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-xl);
  border: 1px solid rgba(10, 94, 176, 0.1);
  overflow: hidden;
  z-index: 1000;
  animation: slideDown 0.15s ease-out;

  @keyframes slideDown {
    from { opacity: 0; transform: translateY(-8px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @media (max-width: 480px) {
    width: calc(100vw - 32px);
    right: -60px;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-lg);
  border-bottom: 1px solid rgba(10, 94, 176, 0.08);

  h3 { margin: 0; font-size: 1rem; font-weight: 600; color: var(--color-dark); }
`;

const MarkAllBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 4px;
  background: none;
  border: none;
  color: var(--color-primary);
  font-size: 0.8rem;
  font-weight: 500;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: var(--radius-sm);
  transition: background var(--transition-fast);
  &:hover { background: rgba(10, 94, 176, 0.06); }
`;

const List = styled.div`
  max-height: 380px;
  overflow-y: auto;
`;

const NotifItem = styled.div<{ $unread?: boolean }>`
  display: flex;
  gap: var(--spacing-md);
  padding: var(--spacing-md) var(--spacing-lg);
  cursor: pointer;
  background: ${p => p.$unread ? 'rgba(10, 94, 176, 0.03)' : 'transparent'};
  border-left: 3px solid ${p => p.$unread ? 'var(--color-primary)' : 'transparent'};
  transition: background var(--transition-fast);

  &:hover { background: rgba(10, 94, 176, 0.06); }

  & + & { border-top: 1px solid rgba(10, 94, 176, 0.04); }
`;

const NotifIcon = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgba(10, 94, 176, 0.08);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: var(--color-primary);
`;

const NotifContent = styled.div`
  flex: 1;
  min-width: 0;
`;

const NotifTitle = styled.p`
  margin: 0;
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--color-dark);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const NotifTime = styled.p`
  margin: 2px 0 0;
  font-size: 0.75rem;
  color: var(--color-gray);
`;

const EmptyState = styled.div`
  padding: var(--spacing-2xl);
  text-align: center;
  color: var(--color-gray);
  font-size: 0.9rem;
`;

const getIcon = (type: string) => {
  switch (type) {
    case 'new_comment':
    case 'comment_reply': return <MessageSquare size={18} />;
    case 'join_request':
    case 'join_approved':
    case 'join_rejected':
    case 'member_added': return <Users size={18} />;
    case 'interest_expressed': return <TrendingUp size={18} />;
    case 'project_update': return <Folder size={18} />;
    default: return <Bell size={18} />;
  }
};

const timeAgo = (date: string) => {
  const diff = Date.now() - new Date(date).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'Just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
};

interface NotificationCenterProps {
  onClose: () => void;
}

export const NotificationCenter = ({ onClose }: NotificationCenterProps) => {
  const navigate = useNavigate();
  const { notifications, fetchNotifications, markAsRead, markAllAsRead } = useNotificationStore();

  useEffect(() => {
    fetchNotifications();
  }, []);

  const handleClick = (notif: Notification) => {
    if (!notif.isRead) markAsRead(notif.id);

    if (notif.metadata?.projectId) {
      navigate(`/projects/${notif.metadata.projectId}`);
    }
    onClose();
  };

  return (
    <Container>
      <Header>
        <h3>Notifications</h3>
        <MarkAllBtn onClick={markAllAsRead}>
          <CheckCheck size={14} /> Mark all read
        </MarkAllBtn>
      </Header>
      <List>
        {notifications.length === 0 ? (
          <EmptyState>No notifications yet</EmptyState>
        ) : (
          notifications.map(n => (
            <NotifItem key={n.id} $unread={!n.isRead} onClick={() => handleClick(n)}>
              <NotifIcon>{getIcon(n.type)}</NotifIcon>
              <NotifContent>
                <NotifTitle>{n.title}</NotifTitle>
                <NotifTime>{timeAgo(n.createdAt)}</NotifTime>
              </NotifContent>
            </NotifItem>
          ))
        )}
      </List>
    </Container>
  );
};
