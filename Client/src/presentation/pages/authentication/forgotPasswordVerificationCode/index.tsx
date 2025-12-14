import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail } from 'lucide-react';
import { CodeInput, Button, Logo } from '../../../components';
import * as S from './style';

const EmailVerification = () => {
  const navigate = useNavigate();
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const isCodeComplete = code.every((digit) => digit !== '');

  const handleVerify = async () => {
    try {
      setLoading(true);
      setError('');

      if (!isCodeComplete) {
        setError('Please enter all 6 digits');
        return;
      }

      // const codeString = code.join('');
      // TODO: Call verification API
      // const response = await AuthService.verifyCode(codeString);
      // if (response.success) {
      navigate('/set-new-password');
      // }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Verification failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = () => {
    console.log('Resend verification code');
    // Resend code logic will be implemented later
  };

  return (
    <S.Screen>
      <S.AuthCard>
        <S.LogoContainer>
          <Logo size={60} />
        </S.LogoContainer>

        <S.BackButton onClick={() => navigate('/forgot-password')}>← Back</S.BackButton>

        <S.VerificationIcon>
          <S.EmailSentIcon>
            <Mail size={32} />
            <S.CheckBadge>✓</S.CheckBadge>
          </S.EmailSentIcon>
        </S.VerificationIcon>

        <S.AuthHeader>
          <h2>Verify Your Email</h2>
          <p>We've sent a 6-digit code to your@email.com</p>
        </S.AuthHeader>

        {error && <S.ErrorAlert>{error}</S.ErrorAlert>}

        <CodeInput value={code} onChange={setCode} />

        <Button onClick={handleVerify} disabled={!isCodeComplete || loading} loading={loading}>
          Verify & Continue
        </Button>

        <S.ResendText>
          Didn't receive the code?{' '}
          <button onClick={handleResendCode}>Resend</button>
        </S.ResendText>
      </S.AuthCard>

    </S.Screen>
  );
};

export default EmailVerification;
