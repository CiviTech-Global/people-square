import { useState, useEffect } from "react";
import { LogOut, User, Plus, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Sidebar, GlassAppBar, ProjectDetailsModal } from "../../components";
import { useAuth } from "../../../application/context/AuthContext";
import {
  ProjectService,
  type Project,
} from "../../../infrastructure/api/project.service";
import {
  HomeContainer,
  ContentWrapper,
  HeaderSection,
  ProjectsSection,
  SectionHeader,
  NewProjectButton,
  ProjectsGrid,
  ProjectCard,
  ProjectTitle,
  ProjectDescription,
  ChipsContainer,
  Chip,
  ViewDetailsButton,
  EmptyState,
  CreateButton,
  LoadingText,
  ProfileMenu,
  ProfileMenuItem,
  AppBarActionsContainer,
  IconButtonStyled,
  ColorBar,
} from "./style";

const HomePage = () => {
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  useEffect(() => {
    if (user?.role === "startup-owner") {
      loadProjects();
    } else {
      setLoading(false);
    }
  }, [user]);

  const loadProjects = async () => {
    try {
      const response = await ProjectService.getMyProjects();
      setProjects(response.data);
    } catch (error) {
      console.error("Failed to load projects:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleProfileClick = () => {
    setShowProfileMenu(false);
    navigate("/settings");
  };

  const handleLogout = () => {
    setShowProfileMenu(false);
    logout();
    navigate("/login");
  };

  const handleViewDetails = (project: Project) => {
    setSelectedProject(project);
    setDetailsOpen(true);
  };

  const handleCloseDetails = () => {
    setDetailsOpen(false);
    setSelectedProject(null);
  };

  const getInvestmentStatusColor = (status: string) => {
    switch (status) {
      case "self-sponsored":
        return "linear-gradient(135deg, rgba(230, 57, 70, 0.8), rgba(230, 57, 70, 0.6))";
      case "looking-for-first-sponsor":
        return "linear-gradient(135deg, rgba(244, 185, 66, 0.8), rgba(244, 185, 66, 0.6))";
      case "looking-for-more-sponsors":
        return "linear-gradient(135deg, rgba(74, 144, 217, 0.8), rgba(74, 144, 217, 0.6))";
      default:
        return "rgba(45, 158, 73, 0.2)";
    }
  };

  const getInvestmentStatusLabel = (status: string) => {
    switch (status) {
      case "self-sponsored":
        return "Self Sponsored";
      case "looking-for-first-sponsor":
        return "Looking for First Sponsor";
      case "looking-for-more-sponsors":
        return "Looking for More Sponsors";
      default:
        return status;
    }
  };

  return (
    <HomeContainer>
      <Sidebar />
      <ContentWrapper>
        <GlassAppBar title="Dashboard">
          <AppBarActionsContainer>
            <IconButtonStyled
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              title="Profile"
            >
              <User />
            </IconButtonStyled>
            <IconButtonStyled onClick={handleLogout} title="Logout">
              <LogOut />
            </IconButtonStyled>
            {showProfileMenu && (
              <ProfileMenu>
                <ProfileMenuItem onClick={handleProfileClick}>
                  <User size={20} />
                  Profile Settings
                </ProfileMenuItem>
                <ProfileMenuItem onClick={handleLogout}>
                  <LogOut size={20} />
                  Logout
                </ProfileMenuItem>
              </ProfileMenu>
            )}
          </AppBarActionsContainer>
        </GlassAppBar>

        <HeaderSection>
          <h1>Welcome back, {user?.fullName || "User"}!</h1>
          <p>Manage your projects and track your progress</p>
        </HeaderSection>

        {user?.role === "startup-owner" && (
          <ProjectsSection>
            <SectionHeader>
              <h2>My Projects ({projects.length})</h2>
              <NewProjectButton onClick={() => navigate("/my-projects")}>
                <Plus size={20} />
                New Project
              </NewProjectButton>
            </SectionHeader>

            {loading ? (
              <LoadingText>Loading projects...</LoadingText>
            ) : projects.length === 0 ? (
              <EmptyState>
                <h3>No projects yet</h3>
                <p>
                  Create your first project to get started with People Square
                </p>
                <CreateButton onClick={() => navigate("/my-projects")}>
                  Create Your First Project
                </CreateButton>
              </EmptyState>
            ) : (
              <ProjectsGrid>
                {projects.slice(0, 6).map((project) => (
                  <ProjectCard
                    key={project.id}
                    onClick={() => handleViewDetails(project)}
                  >
                    <ProjectTitle>{project.title}</ProjectTitle>
                    <ProjectDescription>{project.description}</ProjectDescription>
                    <ChipsContainer>
                      <Chip color={getInvestmentStatusColor(project.investmentStatus)}>
                        {getInvestmentStatusLabel(project.investmentStatus)}
                      </Chip>
                      {project.isRegistered && (
                        <Chip color="linear-gradient(135deg, rgba(45, 158, 73, 0.8), rgba(45, 158, 73, 0.6))">
                          Registered
                        </Chip>
                      )}
                      {project.files && project.files.length > 0 && (
                        <Chip color="linear-gradient(135deg, rgba(74, 144, 217, 0.8), rgba(74, 144, 217, 0.6))">
                          <FileText size={14} />
                          {project.files.length} file{project.files.length > 1 ? 's' : ''}
                        </Chip>
                      )}
                    </ChipsContainer>
                    <ViewDetailsButton onClick={() => handleViewDetails(project)}>
                      View Details
                    </ViewDetailsButton>
                  </ProjectCard>
                ))}
              </ProjectsGrid>
            )}
          </ProjectsSection>
        )}
      </ContentWrapper>

      {/* Project Details Modal */}
      <ProjectDetailsModal
        open={detailsOpen}
        project={selectedProject}
        onClose={handleCloseDetails}
        showActions={false}
      />

      {/* Color Bar */}
      <ColorBar />
    </HomeContainer>
  );
};

export default HomePage;
