import { useState } from "react";
import { Edit, Save, X, User, Mail, Badge, Calendar } from "lucide-react";
import { useAuth } from "../../../../context/AuthContext";
import { UserService } from "../../../../services/api/user.service";
import {
  ProfileContainer,
  ProfileCard,
  AlertBox,
  HeaderSection,
  AvatarSection,
  Avatar,
  UserInfo,
  UserName,
  RoleBadge,
  EditButton,
  Divider,
  SectionTitle,
  InformationGrid,
  InfoField,
  FieldLabel,
  FieldValue,
  FieldInput,
  ActionButtons,
  CancelButton,
  SaveButton,
  LoadingSpinner,
} from "./style";

const Profile = () => {
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editedFullName, setEditedFullName] = useState(user?.fullName || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleEdit = () => {
    setIsEditing(true);
    setEditedFullName(user?.fullName || "");
    setError(null);
    setSuccess(null);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedFullName(user?.fullName || "");
    setError(null);
    setSuccess(null);
  };

  const handleSave = async () => {
    if (!user) return;

    if (!editedFullName.trim()) {
      setError("Full name cannot be empty");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await UserService.updateProfile(user.id, {
        fullName: editedFullName.trim(),
      });

      updateUser(response.data);
      setSuccess("Profile updated successfully!");
      setIsEditing(false);

      setTimeout(() => setSuccess(null), 3000);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case "startup-owner":
        return "var(--color-primary)";
      case "investor":
        return "#4A90D9";
      case "organization":
        return "#2D9E49";
      case "citizen":
        return "#F4B942";
      default:
        return "var(--color-primary)";
    }
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case "startup-owner":
        return "Startup Owner";
      case "investor":
        return "Investor";
      case "organization":
        return "Organization";
      case "citizen":
        return "Citizen";
      default:
        return role;
    }
  };

  if (!user) {
    return (
      <ProfileContainer>
        <div style={{ textAlign: "center", padding: "var(--spacing-2xl)" }}>
          <p style={{ color: "var(--color-text-secondary)" }}>Loading profile...</p>
        </div>
      </ProfileContainer>
    );
  }

  return (
    <ProfileContainer>
      {error && (
        <AlertBox type="error">
          <span>{error}</span>
          <button onClick={() => setError(null)}>
            <X size={18} />
          </button>
        </AlertBox>
      )}
      {success && (
        <AlertBox type="success">
          <span>{success}</span>
          <button onClick={() => setSuccess(null)}>
            <X size={18} />
          </button>
        </AlertBox>
      )}

      <ProfileCard>
        {/* Header Section */}
        <HeaderSection>
          <AvatarSection>
            <Avatar>{user.fullName.charAt(0).toUpperCase()}</Avatar>
            <UserInfo>
              <UserName>{user.fullName}</UserName>
              <RoleBadge style={{ background: getRoleColor(user.role) }}>
                {getRoleLabel(user.role)}
              </RoleBadge>
            </UserInfo>
          </AvatarSection>

          {!isEditing && (
            <EditButton onClick={handleEdit} disabled={loading}>
              <Edit size={20} />
            </EditButton>
          )}
        </HeaderSection>

        <Divider />

        {/* Profile Information */}
        <SectionTitle>
          <User size={20} />
          Personal Information
        </SectionTitle>

        <InformationGrid>
          <InfoField>
            <FieldLabel>
              <User size={16} />
              Full Name
            </FieldLabel>
            {isEditing ? (
              <FieldInput
                value={editedFullName}
                onChange={(e) => setEditedFullName(e.target.value)}
                placeholder="Enter your full name"
                disabled={loading}
              />
            ) : (
              <FieldValue>{user.fullName}</FieldValue>
            )}
          </InfoField>

          <InfoField>
            <FieldLabel>
              <Mail size={16} />
              Email Address
            </FieldLabel>
            <FieldValue>{user.email}</FieldValue>
          </InfoField>

          <InfoField>
            <FieldLabel>
              <Badge size={16} />
              Role
            </FieldLabel>
            <FieldValue>{getRoleLabel(user.role)}</FieldValue>
          </InfoField>

          <InfoField>
            <FieldLabel>
              <Calendar size={16} />
              Member Since
            </FieldLabel>
            <FieldValue>{formatDate(user.createdAt)}</FieldValue>
          </InfoField>

          <InfoField>
            <FieldLabel>
              <Calendar size={16} />
              Last Updated
            </FieldLabel>
            <FieldValue>{formatDate(user.updatedAt)}</FieldValue>
          </InfoField>
        </InformationGrid>

        {/* Edit Actions */}
        {isEditing && (
          <>
            <Divider />
            <ActionButtons>
              <CancelButton onClick={handleCancel} disabled={loading}>
                <X size={18} />
                Cancel
              </CancelButton>
              <SaveButton onClick={handleSave} disabled={loading}>
                {loading ? <LoadingSpinner /> : <Save size={18} />}
                {loading ? "Saving..." : "Save"}
              </SaveButton>
            </ActionButtons>
          </>
        )}
      </ProfileCard>
    </ProfileContainer>
  );
};

export default Profile;
