import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Lock, CheckCircle } from 'lucide-react';
import { Input, Button, Logo } from '../../../components';
import { AuthService } from '../../../../infrastructure/api/auth.service';
import * as S from './style';

const SetNewPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || '';

  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: '',
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

  const handleResetPassword = async () => {
    try {
      setLoading(true);
      setError('');

      if (!formData.newPassword || !formData.confirmPassword) {
        setError('Please fill in all fields');
        return;
      }

      if (formData.newPassword !== formData.confirmPassword) {
        setError('Passwords do not match');
        return;
      }

      if (formData.newPassword.length < 8) {
        setError('Password must be at least 8 characters long');
        return;
      }

      await AuthService.resetPassword({
        email,
        newPassword: formData.newPassword,
      });

      navigate('/login');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to reset password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <S.Screen>
      <S.AuthCard>
        <S.LogoContainer>
          <Logo size={60} />
        </S.LogoContainer>

        <S.SuccessIcon>
          <CheckCircle size={48} />
        </S.SuccessIcon>

        <S.AuthHeader>
          <h2>Set New Password</h2>
          <p>Your identity has been verified. Please set your new password</p>
        </S.AuthHeader>

        {error && <S.ErrorAlert>{error}</S.ErrorAlert>}

        <S.AuthForm>
          <Input
            type="password"
            placeholder="New Password"
            value={formData.newPassword}
            onChange={(value) => handleInputChange('newPassword', value)}
            icon={<Lock size={20} />}
          />

          <Input
            type="password"
            placeholder="Confirm New Password"
            value={formData.confirmPassword}
            onChange={(value) => handleInputChange('confirmPassword', value)}
            icon={<Lock size={20} />}
          />

          <Button onClick={handleResetPassword} disabled={loading} loading={loading}>
            Reset Password
          </Button>
        </S.AuthForm>
      </S.AuthCard>

    </S.Screen>
  );
};

export default SetNewPassword;
