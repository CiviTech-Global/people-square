import { useNavigate, useLocation } from 'react-router-dom';
import { Home, FolderOpen, Settings } from 'lucide-react';
import * as S from './style';

interface SidebarProps {
  open?: boolean;
}

interface MenuItem {
  text: string;
  icon: React.ReactNode;
  path: string;
}

const menuItems: MenuItem[] = [
  {
    text: 'Dashboard',
    icon: <Home size={22} />,
    path: '/home',
  },
  {
    text: 'My Projects',
    icon: <FolderOpen size={22} />,
    path: '/my-projects',
  },
  {
    text: 'Settings',
    icon: <Settings size={22} />,
    path: '/settings',
  },
];

/**
 * Glass-styled Sidebar Navigation Component
 * Fixed left sidebar with collapsible menu items
 */
const Sidebar = ({ open = true }: SidebarProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <S.SidebarContainer open={open}>
      {/* Logo Section */}
      <S.LogoSection open={open}>
        <S.LogoText open={open}>{open ? 'People Square' : 'PS'}</S.LogoText>
      </S.LogoSection>

      {/* Menu Items */}
      <S.MenuList>
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <S.MenuItem key={item.text}>
              <S.MenuButton
                isActive={isActive}
                onClick={() => handleNavigation(item.path)}
                title={!open ? item.text : undefined}
              >
                <S.MenuIcon>{item.icon}</S.MenuIcon>
                {open && <S.MenuText>{item.text}</S.MenuText>}
                {isActive && <S.ActiveIndicator />}
              </S.MenuButton>
            </S.MenuItem>
          );
        })}
      </S.MenuList>

      {/* Footer */}
      <S.SidebarFooter>
        <S.FooterText open={open}>© 2025</S.FooterText>
      </S.SidebarFooter>
    </S.SidebarContainer>
  );
};

export default Sidebar;
