import { useState } from 'react';
import { Lock, Trash2 } from 'lucide-react';
import { useAuth } from '../../../../application/context/AuthContext';
import styled from 'styled-components';
import toast from 'react-hot-toast';

const Section = styled.div`
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(10, 94, 176, 0.08);
  border-radius: var(--radius-lg);
  padding: var(--spacing-2xl);
  margin-bottom: var(--spacing-xl);
`;

const SectionTitle = styled.h2`
  font-size: 1.15rem;
  font-weight: 600;
  color: var(--color-dark);
  margin: 0 0 var(--spacing-lg);
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
`;

const FormField = styled.div`
  margin-bottom: var(--spacing-lg);
`;

const Label = styled.label`
  display: block;
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--color-dark);
  margin-bottom: 6px;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid rgba(10, 94, 176, 0.12);
  border-radius: var(--radius-md);
  font-size: 0.9rem;
  font-family: inherit;
  color: var(--color-dark);
  background: rgba(255, 255, 255, 0.8);
  outline: none;
  transition: border-color var(--transition-fast);

  &:focus { border-color: var(--color-primary); box-shadow: 0 0 0 3px rgba(10, 94, 176, 0.08); }
`;

const SaveBtn = styled.button`
  padding: 12px 24px;
  border-radius: var(--radius-full);
  border: none;
  background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
  color: white;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all var(--transition-fast);
  box-shadow: 0 4px 14px rgba(10, 94, 176, 0.2);

  &:hover { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(10, 94, 176, 0.3); }
  &:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }
`;

const DangerBtn = styled.button`
  padding: 12px 24px;
  border-radius: var(--radius-full);
  border: 1px solid rgba(239, 68, 68, 0.3);
  background: rgba(239, 68, 68, 0.06);
  color: #ef4444;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  transition: all var(--transition-fast);

  &:hover { background: rgba(239, 68, 68, 0.1); }
`;

const Account = () => {
  const { user } = useAuth();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error('Please fill all fields');
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    if (newPassword.length < 8) {
      toast.error('Password must be at least 8 characters');
      return;
    }
    toast.success('Password change feature coming soon');
  };

  return (
    <>
      <Section>
        <SectionTitle><Lock size={20} /> Change Password</SectionTitle>
        <FormField>
          <Label>Current Password</Label>
          <Input type="password" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} placeholder="Enter current password" />
        </FormField>
        <FormField>
          <Label>New Password</Label>
          <Input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} placeholder="Enter new password" />
        </FormField>
        <FormField>
          <Label>Confirm New Password</Label>
          <Input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="Confirm new password" />
        </FormField>
        <SaveBtn onClick={handleChangePassword}>Update Password</SaveBtn>
      </Section>

      <Section>
        <SectionTitle style={{ color: '#ef4444' }}><Trash2 size={20} /> Danger Zone</SectionTitle>
        <p style={{ color: 'var(--color-gray)', fontSize: '0.9rem', marginBottom: 'var(--spacing-lg)' }}>
          Once you delete your account, there is no going back. This action is permanent.
        </p>
        <DangerBtn onClick={() => toast.error('Account deletion is not yet available')}>
          <Trash2 size={16} /> Delete Account
        </DangerBtn>
      </Section>
    </>
  );
};

export default Account;
