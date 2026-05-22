import { useNavigate, useLocation } from 'react-router-dom';
import { Home, FolderOpen, Settings, Compass, Briefcase, Bookmark, Users, ChevronLeft, ChevronRight } from 'lucide-react';
import { useAuth } from '../../../../application/context/AuthContext';
import * as S from './style';

interface SidebarProps {
  open?: boolean;
  mobileOpen?: boolean;
  onToggle?: () => void;
  onMobileClose?: () => void;
}

interface MenuItem {
  text: string;
  icon: React.ReactNode;
  path: string;
  roles?: string[]; // if undefined, shown to all
}

const menuItems: MenuItem[] = [
  { text: 'Dashboard', icon: <Home size={22} />, path: '/home' },
  { text: 'Discover', icon: <Compass size={22} />, path: '/discover' },
  { text: 'My Projects', icon: <FolderOpen size={22} />, path: '/my-projects', roles: ['startup-owner'] },
  { text: 'Portfolio', icon: <Briefcase size={22} />, path: '/portfolio', roles: ['investor'] },
  { text: 'Saved', icon: <Bookmark size={22} />, path: '/saved', roles: ['investor'] },
  { text: 'Joined Projects', icon: <Users size={22} />, path: '/my-projects', roles: ['organization', 'citizen'] },
  { text: 'Settings', icon: <Settings size={22} />, path: '/settings' },
];

const Sidebar = ({ open = true, mobileOpen = false, onToggle, onMobileClose }: SidebarProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  const filteredItems = menuItems.filter(item => {
    if (!item.roles) return true;
    return user?.role ? item.roles.includes(user.role) : false;
  });

  const handleNavigation = (path: string) => {
    navigate(path);
    onMobileClose?.();
  };

  const userInitials = user?.fullName
    ?.split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2) || 'PS';

  const roleBadge = user?.role?.split('-').map(w => w[0].toUpperCase() + w.slice(1)).join(' ') || '';

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && <S.MobileOverlay onClick={onMobileClose} />}

      <S.SidebarContainer $open={open} $mobileOpen={mobileOpen}>
        {/* User Profile Section */}
        <S.UserSection $open={open}>
          <S.AvatarCircle $open={open}>
            {user?.avatar ? (
              <img src={user.avatar.startsWith('http') ? user.avatar : `http://localhost:3000${user.avatar}`} alt={user.fullName} />
            ) : (
              <span>{userInitials}</span>
            )}
          </S.AvatarCircle>
          {open && (
            <S.UserInfo>
              <S.UserName>{user?.fullName || 'User'}</S.UserName>
              <S.UserRole>{roleBadge}</S.UserRole>
            </S.UserInfo>
          )}
        </S.UserSection>

        {/* Toggle Button */}
        <S.ToggleButton onClick={onToggle} title={open ? 'Collapse' : 'Expand'}>
          {open ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
        </S.ToggleButton>

        {/* Menu Items */}
        <S.MenuList>
          {filteredItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <S.MenuItem key={item.text + item.path}>
                <S.MenuButton
                  $isActive={isActive}
                  onClick={() => handleNavigation(item.path)}
                  title={!open ? item.text : undefined}
                >
                  <S.MenuIcon $isActive={isActive}>{item.icon}</S.MenuIcon>
                  {open && <S.MenuText>{item.text}</S.MenuText>}
                  {isActive && <S.ActiveIndicator />}
                </S.MenuButton>
              </S.MenuItem>
            );
          })}
        </S.MenuList>

        {/* Footer */}
        <S.SidebarFooter>
          <S.FooterText $open={open}>{open ? 'People Square' : 'PS'}</S.FooterText>
        </S.SidebarFooter>
      </S.SidebarContainer>
    </>
  );
};

export default Sidebar;
