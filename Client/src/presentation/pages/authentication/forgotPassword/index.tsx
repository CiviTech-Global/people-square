import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail } from 'lucide-react';
import { Input, Button, Logo } from '../../../components';
import { AuthService } from '../../../../infrastructure/api/auth.service';
import * as S from './style';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendCode = async () => {
    try {
      setLoading(true);
      setError('');

      if (!email) {
        setError('Please enter your email');
        return;
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setError('Please enter a valid email address');
        return;
      }

      await AuthService.forgotPassword({ email });
      navigate('/forgot-password-verification', { state: { email } });
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to send verification code. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendCode();
    }
  };

  return (
    <S.Screen>
      <S.AuthCard>
        <S.LogoContainer>
          <Logo size={60} />
        </S.LogoContainer>

        <S.BackButton onClick={() => navigate('/login')}>← Back</S.BackButton>

        <S.AuthHeader>
          <h2>Forgot Password?</h2>
          <p>Enter your email and we'll send you a verification code</p>
        </S.AuthHeader>

        {error && <S.ErrorAlert>{error}</S.ErrorAlert>}

        <S.AuthForm>
          <Input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={setEmail}
            icon={<Mail size={20} />}
            onKeyPress={handleKeyPress}
          />

          <Button onClick={handleSendCode} disabled={loading} loading={loading}>
            Send Verification Code
          </Button>
        </S.AuthForm>

        <S.AuthSwitch>
          Remember your password?{' '}
          <button onClick={() => navigate('/login')}>Sign in</button>
        </S.AuthSwitch>
      </S.AuthCard>

      <S.ColorBar />
    </S.Screen>
  );
};

export default ForgotPassword;
