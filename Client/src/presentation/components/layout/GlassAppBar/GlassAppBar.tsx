import { Logo } from '../../common';
import * as S from './style';

interface GlassAppBarProps {
  title?: string;
  children?: React.ReactNode;
}

/**
 * Glass-styled AppBar Component
 * Sticky top navigation bar with glassmorphic design
 */
const GlassAppBar = ({ title, children }: GlassAppBarProps) => {
  return (
    <S.StyledAppBar>
      <S.StyledToolbar>
        <S.LogoSection>
          <Logo size={40} />
          {title && <S.Title>{title}</S.Title>}
        </S.LogoSection>

        <S.ActionsSection>{children}</S.ActionsSection>
      </S.StyledToolbar>
    </S.StyledAppBar>
  );
};

export default GlassAppBar;
