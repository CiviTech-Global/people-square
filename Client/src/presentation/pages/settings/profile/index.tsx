import { useState, useRef, type KeyboardEvent, type ChangeEvent } from 'react';
import { Camera, X, Save, MapPin, Building2, Github, Linkedin, Twitter, Globe } from 'lucide-react';
import { useAuth } from '../../../../application/context/AuthContext';
import { UserService } from '../../../../infrastructure/api/user.service';
import type { CompleteProfileData } from '../../../../infrastructure/api/user.service';
import styled from 'styled-components';
import toast from 'react-hot-toast';

/* ── styled components ── */

const Container = styled.div`
  max-width: 760px;
  margin: 0 auto;
`;

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
  margin: 0 0 var(--spacing-xl);
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
`;

const AvatarWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-xl);
  margin-bottom: var(--spacing-xl);

  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

const AvatarCircle = styled.div`
  position: relative;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
  cursor: pointer;

  &:hover .overlay {
    opacity: 1;
  }
`;

const AvatarImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const AvatarFallback = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 2.2rem;
  font-weight: 700;
`;

const AvatarOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity var(--transition-fast);
  color: white;
`;

const AvatarHint = styled.p`
  font-size: 0.85rem;
  color: var(--color-gray);
  margin: 0;
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-lg);

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const FormField = styled.div<{ $full?: boolean }>`
  grid-column: ${p => p.$full ? '1 / -1' : 'auto'};
  margin-bottom: var(--spacing-sm);
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

const TextArea = styled.textarea`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid rgba(10, 94, 176, 0.12);
  border-radius: var(--radius-md);
  font-size: 0.9rem;
  font-family: inherit;
  color: var(--color-dark);
  background: rgba(255, 255, 255, 0.8);
  outline: none;
  resize: vertical;
  min-height: 100px;
  transition: border-color var(--transition-fast);

  &:focus { border-color: var(--color-primary); box-shadow: 0 0 0 3px rgba(10, 94, 176, 0.08); }
`;

const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  border: 1px solid rgba(10, 94, 176, 0.12);
  border-radius: var(--radius-md);
  background: rgba(255, 255, 255, 0.8);
  min-height: 44px;
  cursor: text;
  transition: border-color var(--transition-fast);

  &:focus-within { border-color: var(--color-primary); box-shadow: 0 0 0 3px rgba(10, 94, 176, 0.08); }
`;

const Tag = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 10px;
  background: rgba(10, 94, 176, 0.08);
  color: var(--color-primary);
  border-radius: var(--radius-full);
  font-size: 0.8rem;
  font-weight: 500;
`;

const TagRemove = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  color: var(--color-primary);
  opacity: 0.6;
  transition: opacity var(--transition-fast);

  &:hover { opacity: 1; }
`;

const TagInput = styled.input`
  border: none;
  outline: none;
  background: transparent;
  font-size: 0.9rem;
  font-family: inherit;
  color: var(--color-dark);
  flex: 1;
  min-width: 120px;
  padding: 4px 0;

  &::placeholder { color: var(--color-gray); opacity: 0.5; }
`;

const SocialRow = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-md);

  svg { flex-shrink: 0; color: var(--color-gray); }
`;

const SocialInput = styled(Input)`
  flex: 1;
`;

const SaveBtn = styled.button`
  padding: 12px 32px;
  border-radius: var(--radius-full);
  border: none;
  background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
  color: white;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  transition: all var(--transition-fast);
  box-shadow: 0 4px 14px rgba(10, 94, 176, 0.2);

  &:hover { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(10, 94, 176, 0.3); }
  &:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }
`;

/* ── component ── */

const Profile = () => {
  const { user, updateUser } = useAuth();

  const [fullName, setFullName] = useState(user?.fullName || '');
  const [headline, setHeadline] = useState(user?.headline || '');
  const [bio, setBio] = useState(user?.bio || '');
  const [skills, setSkills] = useState<string[]>(user?.skills || []);
  const [interests, setInterests] = useState<string[]>(user?.interests || []);
  const [location, setLocation] = useState(user?.location || '');
  const [company, setCompany] = useState(user?.company || '');
  const [socialLinks, setSocialLinks] = useState({
    github: user?.socialLinks?.github || '',
    linkedin: user?.socialLinks?.linkedin || '',
    twitter: user?.socialLinks?.twitter || '',
    website: user?.socialLinks?.website || '',
  });
  const [avatarPreview, setAvatarPreview] = useState<string | null>(user?.avatar || null);

  const [skillInput, setSkillInput] = useState('');
  const [interestInput, setInterestInput] = useState('');
  const [saving, setSaving] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleAvatarChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image must be under 5MB');
      return;
    }

    // Show local preview immediately
    const reader = new FileReader();
    reader.onload = () => setAvatarPreview(reader.result as string);
    reader.readAsDataURL(file);

    try {
      const res = await UserService.uploadAvatar(user.id, file);
      updateUser(res.data);
      toast.success('Avatar updated');
    } catch {
      toast.error('Failed to upload avatar');
      setAvatarPreview(user.avatar || null);
    }
  };

  const handleSkillKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const val = skillInput.trim();
      if (val && !skills.includes(val)) {
        setSkills([...skills, val]);
      }
      setSkillInput('');
    }
  };

  const removeSkill = (s: string) => setSkills(skills.filter(x => x !== s));

  const handleInterestKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const val = interestInput.trim();
      if (val && !interests.includes(val)) {
        setInterests([...interests, val]);
      }
      setInterestInput('');
    }
  };

  const removeInterest = (s: string) => setInterests(interests.filter(x => x !== s));

  const handleSocialChange = (key: string, value: string) => {
    setSocialLinks(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    if (!user) return;

    if (!fullName.trim()) {
      toast.error('Full name is required');
      return;
    }

    setSaving(true);
    try {
      // Update basic info (fullName)
      await UserService.updateProfile(user.id, { fullName: fullName.trim() });

      // Update extended profile
      const profileData: CompleteProfileData = {
        headline: headline.trim() || undefined,
        bio: bio.trim() || undefined,
        skills: skills.length > 0 ? skills : undefined,
        interests: interests.length > 0 ? interests : undefined,
        location: location.trim() || undefined,
        company: company.trim() || undefined,
        socialLinks: {
          github: socialLinks.github.trim() || undefined,
          linkedin: socialLinks.linkedin.trim() || undefined,
          twitter: socialLinks.twitter.trim() || undefined,
          website: socialLinks.website.trim() || undefined,
        },
      };

      const res = await UserService.completeProfile(user.id, profileData);
      updateUser(res.data);
      toast.success('Profile saved successfully');
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to save profile');
    } finally {
      setSaving(false);
    }
  };

  if (!user) return null;

  return (
    <Container>
      {/* Avatar + Basic Info */}
      <Section>
        <AvatarWrapper>
          <AvatarCircle onClick={handleAvatarClick}>
            {avatarPreview ? (
              <AvatarImage src={avatarPreview} alt={user.fullName} />
            ) : (
              <AvatarFallback>{user.fullName.charAt(0).toUpperCase()}</AvatarFallback>
            )}
            <AvatarOverlay className="overlay">
              <Camera size={24} />
            </AvatarOverlay>
          </AvatarCircle>
          <div>
            <AvatarHint>Click to upload a new photo</AvatarHint>
            <AvatarHint>JPG, PNG or GIF. Max 5MB.</AvatarHint>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleAvatarChange}
            style={{ display: 'none' }}
          />
        </AvatarWrapper>

        <FormGrid>
          <FormField>
            <Label>Full Name</Label>
            <Input value={fullName} onChange={e => setFullName(e.target.value)} placeholder="Your full name" />
          </FormField>
          <FormField>
            <Label>Headline</Label>
            <Input value={headline} onChange={e => setHeadline(e.target.value)} placeholder="e.g. Full Stack Developer" />
          </FormField>
          <FormField $full>
            <Label>Bio</Label>
            <TextArea value={bio} onChange={e => setBio(e.target.value)} placeholder="Tell us about yourself..." />
          </FormField>
        </FormGrid>
      </Section>

      {/* Skills & Interests */}
      <Section>
        <SectionTitle>Skills &amp; Interests</SectionTitle>
        <FormField>
          <Label>Skills</Label>
          <TagContainer onClick={() => document.getElementById('skill-input')?.focus()}>
            {skills.map(s => (
              <Tag key={s}>
                {s}
                <TagRemove type="button" onClick={(e) => { e.stopPropagation(); removeSkill(s); }}>
                  <X size={12} />
                </TagRemove>
              </Tag>
            ))}
            <TagInput
              id="skill-input"
              value={skillInput}
              onChange={e => setSkillInput(e.target.value)}
              onKeyDown={handleSkillKey}
              placeholder={skills.length === 0 ? 'Type a skill and press Enter' : 'Add more...'}
            />
          </TagContainer>
        </FormField>

        <FormField>
          <Label>Interests</Label>
          <TagContainer onClick={() => document.getElementById('interest-input')?.focus()}>
            {interests.map(s => (
              <Tag key={s}>
                {s}
                <TagRemove type="button" onClick={(e) => { e.stopPropagation(); removeInterest(s); }}>
                  <X size={12} />
                </TagRemove>
              </Tag>
            ))}
            <TagInput
              id="interest-input"
              value={interestInput}
              onChange={e => setInterestInput(e.target.value)}
              onKeyDown={handleInterestKey}
              placeholder={interests.length === 0 ? 'Type an interest and press Enter' : 'Add more...'}
            />
          </TagContainer>
        </FormField>
      </Section>

      {/* Location & Company */}
      <Section>
        <SectionTitle>Details</SectionTitle>
        <FormGrid>
          <FormField>
            <Label><MapPin size={14} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 4 }} />Location</Label>
            <Input value={location} onChange={e => setLocation(e.target.value)} placeholder="e.g. San Francisco, CA" />
          </FormField>
          <FormField>
            <Label><Building2 size={14} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 4 }} />Company</Label>
            <Input value={company} onChange={e => setCompany(e.target.value)} placeholder="e.g. Acme Inc." />
          </FormField>
        </FormGrid>
      </Section>

      {/* Social Links */}
      <Section>
        <SectionTitle>Social Links</SectionTitle>
        <SocialRow>
          <Github size={20} />
          <SocialInput value={socialLinks.github} onChange={e => handleSocialChange('github', e.target.value)} placeholder="https://github.com/username" />
        </SocialRow>
        <SocialRow>
          <Linkedin size={20} />
          <SocialInput value={socialLinks.linkedin} onChange={e => handleSocialChange('linkedin', e.target.value)} placeholder="https://linkedin.com/in/username" />
        </SocialRow>
        <SocialRow>
          <Twitter size={20} />
          <SocialInput value={socialLinks.twitter} onChange={e => handleSocialChange('twitter', e.target.value)} placeholder="https://twitter.com/username" />
        </SocialRow>
        <SocialRow>
          <Globe size={20} />
          <SocialInput value={socialLinks.website} onChange={e => handleSocialChange('website', e.target.value)} placeholder="https://yourwebsite.com" />
        </SocialRow>
      </Section>

      {/* Save */}
      <SaveBtn onClick={handleSave} disabled={saving}>
        <Save size={18} />
        {saving ? 'Saving...' : 'Save Profile'}
      </SaveBtn>
    </Container>
  );
};

export default Profile;
