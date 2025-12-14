import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Lightbulb, Wrench, DollarSign, Compass } from 'lucide-react';
import { Input, Button, Logo } from '../../../components';
import * as S from './style';

interface Role {
  id: string;
  label: string;
  icon: React.ReactNode;
  description: string;
  color: string;
}

const ProfileSetup = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const roles: Role[] = [
    {
      id: 'startup-owner',
      label: 'Idea Owner',
      icon: <Lightbulb size={28} />,
      description: 'I have ideas to share',
      color: '#F4B942',
    },
    {
      id: 'builder',
      label: 'Builder / Developer',
      icon: <Wrench size={28} />,
      description: 'I build and create',
      color: '#4A90D9',
    },
    {
      id: 'investor',
      label: 'Investor / Backer',
      icon: <DollarSign size={28} />,
      description: 'I fund great ideas',
      color: '#2D9E49',
    },
    {
      id: 'citizen',
      label: 'Explorer',
      icon: <Compass size={28} />,
      description: 'Just exploring for now',
      color: '#E63946',
    },
  ];

  const handleFinishSetup = async () => {
    try {
      setLoading(true);
      setError('');

      if (!username || !selectedRole) {
        setError('Please fill in all fields');
        return;
      }

      // TODO: Call API to update user profile with username and role
      // const response = await UserService.updateProfile({
      //   username,
      //   role: selectedRole,
      // });

      // For now, just navigate to home
      navigate('/home');
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

        <S.ProgressBar>
          <S.ProgressFill />
        </S.ProgressBar>

        <S.AuthHeader>
          <h2>Complete Your Profile</h2>
          <p>Tell us a bit about yourself</p>
        </S.AuthHeader>

        {error && <S.ErrorAlert>{error}</S.ErrorAlert>}

        <S.AvatarUpload>
          <S.AvatarPlaceholder>
            <User size={40} />
          </S.AvatarPlaceholder>
          <S.AvatarBtn>Add Photo</S.AvatarBtn>
        </S.AvatarUpload>

        <S.AuthForm>
          <Input
            type="text"
            placeholder="Choose a username"
            value={username}
            onChange={setUsername}
            icon={<span>@</span>}
          />

          <S.RoleSelection>
            <S.RoleLabel>I'm primarily a...</S.RoleLabel>
            <S.RoleGrid>
              {roles.map((role) => (
                <S.RoleCard
                  key={role.id}
                  isSelected={selectedRole === role.id}
                  accentColor={role.color}
                  onClick={() => setSelectedRole(role.id)}
                >
                  <S.RoleIcon>{role.icon}</S.RoleIcon>
                  <S.RoleName>{role.label}</S.RoleName>
                  <S.RoleDesc>{role.description}</S.RoleDesc>
                </S.RoleCard>
              ))}
            </S.RoleGrid>
          </S.RoleSelection>

          <Button
            onClick={handleFinishSetup}
            disabled={!username || !selectedRole || loading}
            loading={loading}
          >
            Finish Setup
          </Button>
        </S.AuthForm>

        <S.SkipBtn onClick={() => navigate('/home')}>Skip for now</S.SkipBtn>
      </S.AuthCard>

    </S.Screen>
  );
};

export default ProfileSetup;
