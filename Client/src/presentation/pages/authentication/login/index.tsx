import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock } from 'lucide-react';
import { Input, Button, Logo, SocialButton } from '../../../components';
import { useAuth } from '../../../../application/context/AuthContext';
import { AuthService } from '../../../../infrastructure/api/auth.service';
import * as S from './style';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    setError('');
  };

  const handleLogin = async () => {
    try {
      setLoading(true);
      setError('');

      if (!formData.email || !formData.password) {
        setError('Please fill in all fields');
        return;
      }

      const response = await AuthService.login({
        email: formData.email,
        password: formData.password,
      });

      if (response.success) {
        login(response.data.token, response.data.user);
        navigate('/home');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    navigate('/forgot-password');
  };

  const handleSignUp = () => {
    navigate('/register');
  };

  return (
    <S.Screen>
      <S.AuthCard>
        <S.BackButton onClick={() => navigate('/')}>← Back</S.BackButton>

        <S.AuthHeader>
          <Logo size={60} />
          <h2>Welcome Back</h2>
          <p>Sign in to continue your journey</p>
        </S.AuthHeader>

        {error && <S.ErrorAlert>{error}</S.ErrorAlert>}

        <S.AuthForm>
          <Input
            type="email"
            placeholder="Email address"
            value={formData.email}
            onChange={(value) => handleInputChange('email', value)}
            icon={<Mail size={20} />}
          />

          <Input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(value) => handleInputChange('password', value)}
            icon={<Lock size={20} />}
          />

          <S.ForgotLink onClick={handleForgotPassword}>Forgot password?</S.ForgotLink>

          <Button onClick={handleLogin} disabled={loading} loading={loading}>
            Sign In
          </Button>
        </S.AuthForm>

        <S.AuthDivider>
          <span>or continue with</span>
        </S.AuthDivider>

        <S.SocialButtons>
          <SocialButton provider="google" />
          <SocialButton provider="github" />
          <SocialButton provider="linkedin" />
        </S.SocialButtons>

        <S.AuthSwitch>
          Don't have an account?{' '}
          <button onClick={handleSignUp}>Sign up</button>
        </S.AuthSwitch>
      </S.AuthCard>

    </S.Screen>
  );
};

export default Login;
