import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Bookmark, BookmarkCheck, FileText, Users, MessageSquare, ExternalLink, Github, Linkedin, Globe, Send } from 'lucide-react';
import { AppShell } from '../../components';
import { ProjectService, type Project } from '../../../infrastructure/api/project.service';
import { CommentService, type Comment } from '../../../infrastructure/api/comment.service';
import { ProjectMemberService, type ProjectMember } from '../../../infrastructure/api/projectMember.service';
import { BookmarkService } from '../../../infrastructure/api/bookmark.service';
import { useAuth } from '../../../application/context/AuthContext';
import styled from 'styled-components';
import toast from 'react-hot-toast';

const BackBtn = styled.button`
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  background: none;
  border: none;
  color: var(--color-gray);
  font-size: 0.9rem;
  cursor: pointer;
  padding: 0;
  margin-bottom: var(--spacing-xl);
  transition: color var(--transition-fast);
  &:hover { color: var(--color-primary); }
`;

const Hero = styled.div`
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(10, 94, 176, 0.1);
  border-radius: var(--radius-lg);
  padding: var(--spacing-2xl);
  margin-bottom: var(--spacing-xl);
  position: relative;
`;

const HeroTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: var(--spacing-lg);
  margin-bottom: var(--spacing-lg);
  flex-wrap: wrap;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: var(--color-dark);
  margin: 0 0 8px;
`;

const Desc = styled.p`
  font-size: 1rem;
  color: var(--color-gray);
  margin: 0;
  line-height: 1.7;
`;

const ChipRow = styled.div`
  display: flex;
  gap: var(--spacing-sm);
  flex-wrap: wrap;
  margin: var(--spacing-lg) 0;
`;

const Chip = styled.span<{ $variant?: string }>`
  padding: 6px 14px;
  border-radius: var(--radius-full);
  font-size: 0.8rem;
  font-weight: 600;
  background: ${p => p.$variant === 'primary' ? 'rgba(10, 94, 176, 0.1)' : p.$variant === 'accent' ? 'rgba(45, 212, 160, 0.1)' : 'var(--color-gray-light)'};
  color: ${p => p.$variant === 'primary' ? 'var(--color-primary)' : p.$variant === 'accent' ? '#0d9668' : 'var(--color-dark)'};
`;

const ActionBtns = styled.div`
  display: flex;
  gap: var(--spacing-sm);
`;

const BookmarkBtn = styled.button<{ $active?: boolean }>`
  padding: 10px 18px;
  border-radius: var(--radius-full);
  border: 1px solid ${p => p.$active ? 'var(--color-primary)' : 'rgba(10, 94, 176, 0.15)'};
  background: ${p => p.$active ? 'rgba(10, 94, 176, 0.08)' : 'white'};
  color: ${p => p.$active ? 'var(--color-primary)' : 'var(--color-gray)'};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  font-weight: 500;
  font-size: 0.85rem;
  transition: all var(--transition-fast);
  &:hover { border-color: var(--color-primary); color: var(--color-primary); }
`;

const PrimaryBtn = styled.button`
  padding: 10px 20px;
  border-radius: var(--radius-full);
  border: none;
  background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
  color: white;
  font-weight: 600;
  font-size: 0.85rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  box-shadow: 0 4px 14px rgba(10, 94, 176, 0.2);
  transition: all var(--transition-fast);
  &:hover { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(10, 94, 176, 0.3); }
  &:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }
`;

const Tabs = styled.div`
  display: flex;
  gap: 0;
  border-bottom: 1px solid rgba(10, 94, 176, 0.1);
  margin-bottom: var(--spacing-xl);
`;

const Tab = styled.button<{ $active?: boolean }>`
  padding: 12px 20px;
  border: none;
  background: transparent;
  font-weight: ${p => p.$active ? 600 : 500};
  font-size: 0.9rem;
  color: ${p => p.$active ? 'var(--color-primary)' : 'var(--color-gray)'};
  cursor: pointer;
  border-bottom: 2px solid ${p => p.$active ? 'var(--color-primary)' : 'transparent'};
  transition: all var(--transition-fast);
  &:hover { color: var(--color-primary); }
`;

const Section = styled.div`
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(10, 94, 176, 0.08);
  border-radius: var(--radius-lg);
  padding: var(--spacing-xl);
`;

const LinksGrid = styled.div`
  display: flex;
  gap: var(--spacing-md);
  flex-wrap: wrap;
  margin-top: var(--spacing-lg);
`;

const LinkBtn = styled.a`
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: 8px 16px;
  border: 1px solid rgba(10, 94, 176, 0.12);
  border-radius: var(--radius-full);
  color: var(--color-primary);
  text-decoration: none;
  font-size: 0.85rem;
  font-weight: 500;
  transition: all var(--transition-fast);
  &:hover { background: rgba(10, 94, 176, 0.04); }
`;

const FileCard = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-lg);
  border: 1px solid rgba(10, 94, 176, 0.08);
  border-radius: var(--radius-md);
  margin-bottom: var(--spacing-md);

  svg { color: var(--color-primary); flex-shrink: 0; }
`;

const MemberCard = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-md);
  border-radius: var(--radius-md);
  border: 1px solid rgba(10, 94, 176, 0.06);
  margin-bottom: var(--spacing-sm);
`;

const MemberAvatar = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 0.75rem;
  font-weight: 700;
  flex-shrink: 0;
`;

const CommentBox = styled.div`
  display: flex;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-xl);
`;

const CommentInput = styled.textarea`
  flex: 1;
  min-height: 80px;
  padding: var(--spacing-md);
  border: 1px solid rgba(10, 94, 176, 0.12);
  border-radius: var(--radius-md);
  font-family: inherit;
  font-size: 0.9rem;
  resize: vertical;
  outline: none;
  &:focus { border-color: var(--color-primary); }
`;

const CommentItem = styled.div`
  padding: var(--spacing-lg) 0;
  border-bottom: 1px solid rgba(10, 94, 176, 0.06);
`;

const CommentHeader = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-sm);
  font-size: 0.85rem;
`;

const CommentAuthor = styled.span`
  font-weight: 600;
  color: var(--color-dark);
`;

const CommentTime = styled.span`
  color: var(--color-gray);
  font-size: 0.8rem;
`;

const CommentContent = styled.p`
  margin: 0;
  font-size: 0.9rem;
  color: var(--color-dark);
  line-height: 1.6;
`;

const ReadmeContent = styled.div`
  white-space: pre-wrap;
  font-size: 0.95rem;
  line-height: 1.7;
  color: var(--color-dark);
`;

const EmptyTab = styled.p`
  color: var(--color-gray);
  text-align: center;
  padding: var(--spacing-2xl);
`;

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState('overview');
  const [bookmarked, setBookmarked] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [members, setMembers] = useState<ProjectMember[]>([]);
  const [newComment, setNewComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (id) loadProject();
  }, [id]);

  const loadProject = async () => {
    try {
      setLoading(true);
      const res = await ProjectService.getProject(id!);
      setProject(res.data);

      // Load bookmark status
      try {
        const bRes = await BookmarkService.checkBookmark(id!);
        setBookmarked(bRes.data?.bookmarked || false);
      } catch {}

      // Load comments
      try {
        const cRes = await CommentService.getComments(id!);
        setComments(cRes.data?.comments || cRes.data || []);
      } catch {}

      // Load members
      try {
        const mRes = await ProjectMemberService.getMembers(id!);
        setMembers(mRes.data || []);
      } catch {}
    } catch {
      toast.error('Failed to load project');
    } finally {
      setLoading(false);
    }
  };

  const handleBookmark = async () => {
    try {
      const res = await BookmarkService.toggle(id!);
      setBookmarked(res.data?.bookmarked ?? !bookmarked);
      toast.success(bookmarked ? 'Removed from saved' : 'Saved to bookmarks');
    } catch {
      toast.error('Failed to update bookmark');
    }
  };

  const handleComment = async () => {
    if (!newComment.trim()) return;
    try {
      setSubmitting(true);
      await CommentService.createComment(id!, newComment.trim());
      setNewComment('');
      const cRes = await CommentService.getComments(id!);
      setComments(cRes.data?.comments || cRes.data || []);
      toast.success('Comment posted');
    } catch {
      toast.error('Failed to post comment');
    } finally {
      setSubmitting(false);
    }
  };

  const handleJoin = async () => {
    try {
      await ProjectMemberService.requestToJoin(id!);
      toast.success('Join request sent!');
      const mRes = await ProjectMemberService.getMembers(id!);
      setMembers(mRes.data || []);
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to send request');
    }
  };

  const isOwner = project?.ownerId === user?.id;
  const isMember = members.some(m => m.userId === user?.id);
  const hasPendingRequest = members.some(m => m.userId === user?.id && m.status === 'pending');

  const formatDate = (d: string) => new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  if (loading) return <AppShell title="Project"><EmptyTab>Loading...</EmptyTab></AppShell>;
  if (!project) return <AppShell title="Project"><EmptyTab>Project not found</EmptyTab></AppShell>;

  return (
    <AppShell title="Project Details">
      <BackBtn onClick={() => navigate(-1)}>
        <ArrowLeft size={18} /> Back
      </BackBtn>

      <Hero>
        <HeroTop>
          <div style={{ flex: 1 }}>
            <Title>{project.title}</Title>
            <ChipRow>
              <Chip $variant="primary">{project.investmentStatus.replace(/-/g, ' ')}</Chip>
              {project.isRegistered && <Chip $variant="accent">Registered</Chip>}
            </ChipRow>
          </div>
          <ActionBtns>
            <BookmarkBtn $active={bookmarked} onClick={handleBookmark}>
              {bookmarked ? <BookmarkCheck size={18} /> : <Bookmark size={18} />}
              {bookmarked ? 'Saved' : 'Save'}
            </BookmarkBtn>
            {!isOwner && !isMember && !hasPendingRequest && (
              <PrimaryBtn onClick={handleJoin}>
                <Users size={18} /> Join Team
              </PrimaryBtn>
            )}
            {hasPendingRequest && (
              <PrimaryBtn disabled>Request Pending</PrimaryBtn>
            )}
          </ActionBtns>
        </HeroTop>
        <Desc>{project.description}</Desc>
      </Hero>

      <Tabs>
        <Tab $active={tab === 'overview'} onClick={() => setTab('overview')}>Overview</Tab>
        {project.readme && <Tab $active={tab === 'readme'} onClick={() => setTab('readme')}>README</Tab>}
        <Tab $active={tab === 'files'} onClick={() => setTab('files')}>Files ({project.files?.length || 0})</Tab>
        <Tab $active={tab === 'team'} onClick={() => setTab('team')}>Team ({members.filter(m => m.status === 'active').length})</Tab>
        <Tab $active={tab === 'comments'} onClick={() => setTab('comments')}>Comments ({comments.length})</Tab>
      </Tabs>

      {tab === 'overview' && (
        <Section>
          <Desc>{project.description}</Desc>
          {(project.links?.github || project.links?.linkedin || project.links?.website || project.demoLink) && (
            <LinksGrid>
              {project.demoLink && <LinkBtn href={project.demoLink} target="_blank" rel="noopener"><ExternalLink size={16} /> Demo</LinkBtn>}
              {project.links?.github && <LinkBtn href={project.links.github} target="_blank" rel="noopener"><Github size={16} /> GitHub</LinkBtn>}
              {project.links?.linkedin && <LinkBtn href={project.links.linkedin} target="_blank" rel="noopener"><Linkedin size={16} /> LinkedIn</LinkBtn>}
              {project.links?.website && <LinkBtn href={project.links.website} target="_blank" rel="noopener"><Globe size={16} /> Website</LinkBtn>}
            </LinksGrid>
          )}
        </Section>
      )}

      {tab === 'readme' && project.readme && (
        <Section>
          <ReadmeContent>{project.readme}</ReadmeContent>
        </Section>
      )}

      {tab === 'files' && (
        <Section>
          {!project.files || project.files.length === 0 ? (
            <EmptyTab>No files attached</EmptyTab>
          ) : (
            project.files.map((f: any) => (
              <FileCard key={f.id}>
                <FileText size={24} />
                <div style={{ flex: 1 }}>
                  <p style={{ margin: 0, fontWeight: 600, color: 'var(--color-dark)' }}>{f.originalName}</p>
                  <p style={{ margin: '2px 0 0', fontSize: '0.8rem', color: 'var(--color-gray)' }}>{f.fileType} &middot; {(f.fileSize / 1024).toFixed(0)} KB</p>
                </div>
              </FileCard>
            ))
          )}
        </Section>
      )}

      {tab === 'team' && (
        <Section>
          {members.filter(m => m.status === 'active').length === 0 ? (
            <EmptyTab>No team members yet</EmptyTab>
          ) : (
            members.filter(m => m.status === 'active').map(m => (
              <MemberCard key={m.id}>
                <MemberAvatar>{m.user?.fullName?.[0]?.toUpperCase() || 'U'}</MemberAvatar>
                <div style={{ flex: 1 }}>
                  <p style={{ margin: 0, fontWeight: 600, fontSize: '0.9rem', color: 'var(--color-dark)' }}>{m.user?.fullName || 'Unknown'}</p>
                  <p style={{ margin: '2px 0 0', fontSize: '0.8rem', color: 'var(--color-gray)' }}>{m.role}</p>
                </div>
                <Chip>{m.role}</Chip>
              </MemberCard>
            ))
          )}

          {isOwner && members.filter(m => m.status === 'pending').length > 0 && (
            <>
              <h3 style={{ margin: 'var(--spacing-xl) 0 var(--spacing-md)', fontSize: '1rem', color: 'var(--color-dark)' }}>Pending Requests</h3>
              {members.filter(m => m.status === 'pending').map(m => (
                <MemberCard key={m.id}>
                  <MemberAvatar>{m.user?.fullName?.[0]?.toUpperCase() || 'U'}</MemberAvatar>
                  <div style={{ flex: 1 }}>
                    <p style={{ margin: 0, fontWeight: 600, fontSize: '0.9rem' }}>{m.user?.fullName || 'Unknown'}</p>
                  </div>
                  <PrimaryBtn onClick={async () => { await ProjectMemberService.approveMember(m.id); loadProject(); toast.success('Approved'); }} style={{ padding: '6px 14px', fontSize: '0.8rem' }}>Approve</PrimaryBtn>
                  <BookmarkBtn onClick={async () => { await ProjectMemberService.rejectMember(m.id); loadProject(); toast.success('Rejected'); }} style={{ padding: '6px 14px', fontSize: '0.8rem' }}>Reject</BookmarkBtn>
                </MemberCard>
              ))}
            </>
          )}
        </Section>
      )}

      {tab === 'comments' && (
        <Section>
          <CommentBox>
            <CommentInput
              placeholder="Write a comment..."
              value={newComment}
              onChange={e => setNewComment(e.target.value)}
            />
            <PrimaryBtn onClick={handleComment} disabled={submitting || !newComment.trim()} style={{ alignSelf: 'flex-end' }}>
              <Send size={16} /> Post
            </PrimaryBtn>
          </CommentBox>

          {comments.length === 0 ? (
            <EmptyTab>No comments yet. Be the first!</EmptyTab>
          ) : (
            comments.map(c => (
              <CommentItem key={c.id}>
                <CommentHeader>
                  <MemberAvatar style={{ width: 28, height: 28, fontSize: '0.65rem' }}>
                    {c.author?.fullName?.[0]?.toUpperCase() || 'U'}
                  </MemberAvatar>
                  <CommentAuthor>{c.author?.fullName || 'User'}</CommentAuthor>
                  <CommentTime>{formatDate(c.createdAt)}</CommentTime>
                </CommentHeader>
                <CommentContent>{c.content}</CommentContent>
              </CommentItem>
            ))
          )}
        </Section>
      )}
    </AppShell>
  );
};

export default ProjectDetail;
