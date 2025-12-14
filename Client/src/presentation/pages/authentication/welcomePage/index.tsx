import { useNavigate } from 'react-router-dom';
import { Logo, Button } from '../../../components';
import * as S from './style';

const WelcomePage = () => {
  const navigate = useNavigate();

  return (
    <S.Screen>
      <S.LandingContent>
        <S.LogoContainer>
          <Logo size={120} />
          <S.BrandName>People Square</S.BrandName>
          <S.Tagline>Where ideas meet opportunity</S.Tagline>
        </S.LogoContainer>

        <S.QuadrantDecoration>
          <S.Quad quadColor="red" />
          <S.Quad quadColor="yellow" />
          <S.Quad quadColor="green" />
          <S.Quad quadColor="blue" />
        </S.QuadrantDecoration>

        <S.LandingButtons>
          <Button onClick={() => navigate('/login')} variant="primary">
            Sign In
          </Button>
          <Button onClick={() => navigate('/register')} variant="outline">
            Create Account
          </Button>
        </S.LandingButtons>

        <S.LandingFooter>Connect • Collaborate • Create</S.LandingFooter>
      </S.LandingContent>
    </S.Screen>
  );
};

export default WelcomePage;
