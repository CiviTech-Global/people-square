import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Camera,
  MapPin,
  Building2,
  Github,
  Linkedin,
  Twitter,
  Globe,
  X,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Tag as TagIcon,
  CheckCircle2,
} from 'lucide-react';
import { Input, Button } from '../../../components';
import { useAuth } from '../../../../application/context/AuthContext';
import { UserService } from '../../../../infrastructure/api/user.service';
import * as S from './style';

const STEP_META = [
  { title: 'Your Identity', description: 'Add a photo and a headline that represents you' },
  { title: 'About You', description: 'Tell the community who you are' },
  { title: 'Skills & Interests', description: 'Help us connect you with the right people' },
  { title: 'Social Links', description: 'Let others find you across the web' },
];

const ProfileSetup = () => {
  const navigate = useNavigate();
  const { user, updateUser } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    headline: '',
    bio: '',
    location: '',
    company: '',
    skills: [] as string[],
    interests: [] as string[],
    socialLinks: {
      github: '',
      linkedin: '',
      twitter: '',
      website: '',
    },
  });

  const [skillInput, setSkillInput] = useState('');
  const [interestInput, setInterestInput] = useState('');

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSocialLinkChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      socialLinks: { ...prev.socialLinks, [field]: value },
    }));
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setAvatarFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatarPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const addTag = (type: 'skills' | 'interests', value: string) => {
    const trimmed = value.trim().toLowerCase();
    if (!trimmed) return;
    if (formData[type].includes(trimmed)) return;
    if (formData[type].length >= 10) return;

    setFormData((prev) => ({
      ...prev,
      [type]: [...prev[type], trimmed],
    }));

    if (type === 'skills') setSkillInput('');
    else setInterestInput('');
  };

  const removeTag = (type: 'skills' | 'interests', index: number) => {
    setFormData((prev) => ({
      ...prev,
      [type]: prev[type].filter((_, i) => i !== index),
    }));
  };

  const handleTagKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    type: 'skills' | 'interests',
    value: string,
  ) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag(type, value);
    }
  };

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleComplete = async () => {
    if (!user) return;

    try {
      setLoading(true);

      if (avatarFile) {
        await UserService.uploadAvatar(user.id, avatarFile);
      }

      const profileData = {
        headline: formData.headline || undefined,
        bio: formData.bio || undefined,
        location: formData.location || undefined,
        company: formData.company || undefined,
        skills: formData.skills.length > 0 ? formData.skills : undefined,
        interests: formData.interests.length > 0 ? formData.interests : undefined,
        socialLinks:
          formData.socialLinks.github ||
          formData.socialLinks.linkedin ||
          formData.socialLinks.twitter ||
          formData.socialLinks.website
            ? formData.socialLinks
            : undefined,
      };

      const response = await UserService.completeProfile(user.id, profileData);

      if (response.success) {
        updateUser({ ...user, ...response.data, profileCompleted: true });
      }

      navigate('/home');
    } catch {
      navigate('/home');
    } finally {
      setLoading(false);
    }
  };

  const currentMeta = STEP_META[step - 1];

  return (
    <S.Screen>
      <S.SetupCard>
        <S.StepIndicator>
          {[1, 2, 3, 4].map((s) => (
            <S.StepDot
              key={s}
              $active={step === s}
              $completed={step > s}
              onClick={() => step > s && setStep(s)}
            />
          ))}
        </S.StepIndicator>

        <S.StepTitle>{currentMeta.title}</S.StepTitle>
        <S.StepDescription>{currentMeta.description}</S.StepDescription>

        {/* Step 1: Avatar + Headline */}
        {step === 1 && (
          <S.FormGroup>
            <S.AvatarUpload>
              <S.AvatarPreview $hasImage={!!avatarPreview} onClick={handleAvatarClick}>
                {avatarPreview ? (
                  <img src={avatarPreview} alt="Avatar preview" />
                ) : (
                  <Camera size={36} />
                )}
              </S.AvatarPreview>
              <S.SkipButton onClick={handleAvatarClick}>
                {avatarPreview ? 'Change photo' : 'Upload photo'}
              </S.SkipButton>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                style={{ display: 'none' }}
              />
            </S.AvatarUpload>

            <Input
              type="text"
              placeholder="Your headline (e.g. Full-Stack Developer)"
              value={formData.headline}
              onChange={(value) => handleInputChange('headline', value)}
              icon={<Sparkles size={20} />}
            />
          </S.FormGroup>
        )}

        {/* Step 2: Bio + Location + Company */}
        {step === 2 && (
          <S.FormGroup>
            <div>
              <S.FieldLabel>Bio</S.FieldLabel>
              <S.TextArea
                placeholder="Write a short bio about yourself..."
                value={formData.bio}
                onChange={(e) => handleInputChange('bio', e.target.value)}
                maxLength={500}
              />
            </div>

            <Input
              type="text"
              placeholder="Location (e.g. San Francisco, CA)"
              value={formData.location}
              onChange={(value) => handleInputChange('location', value)}
              icon={<MapPin size={20} />}
            />

            <Input
              type="text"
              placeholder="Company or organization"
              value={formData.company}
              onChange={(value) => handleInputChange('company', value)}
              icon={<Building2 size={20} />}
            />
          </S.FormGroup>
        )}

        {/* Step 3: Skills + Interests */}
        {step === 3 && (
          <S.FormGroup>
            <div>
              <S.FieldLabel>Skills</S.FieldLabel>
              <S.TagInput>
                {formData.skills.map((skill, i) => (
                  <S.Tag key={skill}>
                    {skill}
                    <button onClick={() => removeTag('skills', i)} type="button">
                      <X size={12} />
                    </button>
                  </S.Tag>
                ))}
                <input
                  type="text"
                  placeholder={formData.skills.length === 0 ? 'Type a skill and press Enter...' : 'Add more...'}
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyDown={(e) => handleTagKeyDown(e, 'skills', skillInput)}
                />
              </S.TagInput>
            </div>

            <div>
              <S.FieldLabel>Interests</S.FieldLabel>
              <S.TagInput>
                {formData.interests.map((interest, i) => (
                  <S.Tag key={interest}>
                    {interest}
                    <button onClick={() => removeTag('interests', i)} type="button">
                      <X size={12} />
                    </button>
                  </S.Tag>
                ))}
                <input
                  type="text"
                  placeholder={formData.interests.length === 0 ? 'Type an interest and press Enter...' : 'Add more...'}
                  value={interestInput}
                  onChange={(e) => setInterestInput(e.target.value)}
                  onKeyDown={(e) => handleTagKeyDown(e, 'interests', interestInput)}
                />
              </S.TagInput>
            </div>
          </S.FormGroup>
        )}

        {/* Step 4: Social Links */}
        {step === 4 && (
          <S.FormGroup>
            <S.SocialLinkRow>
              <Github size={22} />
              <Input
                type="url"
                placeholder="https://github.com/username"
                value={formData.socialLinks.github}
                onChange={(value) => handleSocialLinkChange('github', value)}
              />
            </S.SocialLinkRow>

            <S.SocialLinkRow>
              <Linkedin size={22} />
              <Input
                type="url"
                placeholder="https://linkedin.com/in/username"
                value={formData.socialLinks.linkedin}
                onChange={(value) => handleSocialLinkChange('linkedin', value)}
              />
            </S.SocialLinkRow>

            <S.SocialLinkRow>
              <Twitter size={22} />
              <Input
                type="url"
                placeholder="https://twitter.com/username"
                value={formData.socialLinks.twitter}
                onChange={(value) => handleSocialLinkChange('twitter', value)}
              />
            </S.SocialLinkRow>

            <S.SocialLinkRow>
              <Globe size={22} />
              <Input
                type="url"
                placeholder="https://yourwebsite.com"
                value={formData.socialLinks.website}
                onChange={(value) => handleSocialLinkChange('website', value)}
              />
            </S.SocialLinkRow>
          </S.FormGroup>
        )}

        <S.ButtonRow>
          {step > 1 ? (
            <Button variant="outline" onClick={handleBack} fullWidth={false} icon={<ArrowLeft size={16} />}>
              Back
            </Button>
          ) : (
            <S.SkipButton onClick={() => navigate('/home')}>Skip for now</S.SkipButton>
          )}

          {step < 4 ? (
            <Button onClick={handleNext} fullWidth={false} icon={<ArrowRight size={16} />} iconPosition="right">
              Continue
            </Button>
          ) : (
            <Button
              onClick={handleComplete}
              fullWidth={false}
              loading={loading}
              disabled={loading}
              icon={<CheckCircle2 size={16} />}
            >
              Complete Setup
            </Button>
          )}
        </S.ButtonRow>

        {step > 1 && step < 4 && (
          <S.SkipButton onClick={handleNext} style={{ display: 'block', textAlign: 'center', width: '100%', marginTop: '12px' }}>
            Skip this step
          </S.SkipButton>
        )}

        {step === 4 && (
          <S.SkipButton onClick={() => navigate('/home')} style={{ display: 'block', textAlign: 'center', width: '100%', marginTop: '12px' }}>
            Skip and go to home
          </S.SkipButton>
        )}
      </S.SetupCard>
    </S.Screen>
  );
};

export default ProfileSetup;
