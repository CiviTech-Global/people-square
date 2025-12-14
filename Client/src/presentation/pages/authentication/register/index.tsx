import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Lock } from 'lucide-react';
import { Input, Button, Logo, SocialButton } from '../../../components';
import { useAuth } from '../../../../application/context/AuthContext';
import { AuthService } from '../../../../infrastructure/api/auth.service';
import * as S from './style';

const Register = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    setError('');
  };

  const handleRegister = async () => {
    try {
      setLoading(true);
      setError('');

      if (!formData.fullName || !formData.email || !formData.password || !formData.confirmPassword) {
        setError('Please fill in all fields');
        return;
      }

      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match');
        return;
      }

      if (formData.password.length < 8) {
        setError('Password must be at least 8 characters long');
        return;
      }

      if (!termsAccepted) {
        setError('Please accept the Terms and Privacy Policy');
        return;
      }

      const response = await AuthService.register({
        fullName: formData.fullName,
        email: formData.email,
        role: 'citizen', // Default role
        password: formData.password,
      });

      if (response.success) {
        login(response.data.token, response.data.user);
        // Navigate to profile setup or home based on your flow
        navigate('/home');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || err.response?.data?.errors?.join(', ') || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <S.Screen>
      <S.AuthCard>
        <S.BackButton onClick={() => navigate('/')}>← Back</S.BackButton>

        <S.AuthHeader>
          <Logo size={60} />
          <h2>Join the Square</h2>
          <p>Create your account to get started</p>
        </S.AuthHeader>

        {error && <S.ErrorAlert>{error}</S.ErrorAlert>}

        <S.AuthForm>
          <Input
            type="text"
            placeholder="Full name"
            value={formData.fullName}
            onChange={(value) => handleInputChange('fullName', value)}
            icon={<User size={20} />}
          />

          <Input
            type="email"
            placeholder="Email address"
            value={formData.email}
            onChange={(value) => handleInputChange('email', value)}
            icon={<Mail size={20} />}
          />

          <Input
            type="password"
            placeholder="Create password"
            value={formData.password}
            onChange={(value) => handleInputChange('password', value)}
            icon={<Lock size={20} />}
          />

          <Input
            type="password"
            placeholder="Confirm password"
            value={formData.confirmPassword}
            onChange={(value) => handleInputChange('confirmPassword', value)}
            icon={<Lock size={20} />}
          />

          <S.TermsCheck>
            <input
              type="checkbox"
              id="terms"
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
            />
            <label htmlFor="terms">
              I agree to the <a href="#">Terms</a> and <a href="#">Privacy Policy</a>
            </label>
          </S.TermsCheck>

          <Button onClick={handleRegister} disabled={loading || !termsAccepted} loading={loading}>
            Create Account
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
          Already have an account?{' '}
          <button onClick={() => navigate('/login')}>Sign in</button>
        </S.AuthSwitch>
      </S.AuthCard>

      <S.ColorBar />
    </S.Screen>
  );
};

export default Register;
