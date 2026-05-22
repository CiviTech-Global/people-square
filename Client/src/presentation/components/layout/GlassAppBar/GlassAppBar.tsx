import { useState, useRef, useEffect } from 'react';
import { Search, Bell, User, LogOut, Settings, Menu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../../application/context/AuthContext';
import { useNotificationStore } from '../../../../application/stores/notificationStore';
import { NotificationCenter } from '../../notifications/NotificationCenter';
import * as S from './style';

interface GlassAppBarProps {
  title?: string;
  onMenuClick?: () => void;
  children?: React.ReactNode;
}

const GlassAppBar = ({ title, onMenuClick, children }: GlassAppBarProps) => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);
  const { unreadCount, fetchUnreadCount } = useNotificationStore();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    fetchUnreadCount();
    const interval = setInterval(fetchUnreadCount, 30000);
    return () => clearInterval(interval);
  }, [fetchUnreadCount]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/discover?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const userInitials = user?.fullName
    ?.split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2) || 'PS';

  return (
    <S.StyledAppBar>
      <S.StyledToolbar>
        <S.LeftSection>
          <S.MobileMenuButton onClick={onMenuClick}>
            <Menu size={22} />
          </S.MobileMenuButton>
          {title && <S.Title>{title}</S.Title>}
        </S.LeftSection>

        <S.CenterSection>
          <S.SearchForm onSubmit={handleSearch}>
            <Search size={18} />
            <S.SearchInput
              type="text"
              placeholder="Search projects, people..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </S.SearchForm>
        </S.CenterSection>

        <S.RightSection>
          {children}
          <S.NotifArea ref={notifRef}>
            <S.IconBtn onClick={() => setShowNotifications(!showNotifications)} title="Notifications">
              <Bell size={20} />
              {unreadCount > 0 && <S.UnreadBadge>{unreadCount > 9 ? '9+' : unreadCount}</S.UnreadBadge>}
            </S.IconBtn>
            {showNotifications && (
              <NotificationCenter onClose={() => setShowNotifications(false)} />
            )}
          </S.NotifArea>
          <S.ProfileArea ref={dropdownRef}>
            <S.ProfileButton onClick={() => setShowDropdown(!showDropdown)}>
              <S.SmallAvatar>
                {user?.avatar ? (
                  <img src={user.avatar.startsWith('http') ? user.avatar : `http://localhost:3000${user.avatar}`} alt="" />
                ) : (
                  <span>{userInitials}</span>
                )}
              </S.SmallAvatar>
            </S.ProfileButton>
            {showDropdown && (
              <S.DropdownMenu>
                <S.DropdownItem onClick={() => { navigate('/settings'); setShowDropdown(false); }}>
                  <User size={18} /> Profile
                </S.DropdownItem>
                <S.DropdownItem onClick={() => { navigate('/settings'); setShowDropdown(false); }}>
                  <Settings size={18} /> Settings
                </S.DropdownItem>
                <S.DropdownDivider />
                <S.DropdownItem onClick={handleLogout}>
                  <LogOut size={18} /> Logout
                </S.DropdownItem>
              </S.DropdownMenu>
            )}
          </S.ProfileArea>
        </S.RightSection>
      </S.StyledToolbar>
    </S.StyledAppBar>
  );
};

export default GlassAppBar;
