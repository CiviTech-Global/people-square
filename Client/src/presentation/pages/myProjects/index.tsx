import { useState, useEffect } from "react";
import { Plus, X, FileText, Loader } from "lucide-react";
import { Sidebar, GlassAppBar, ProjectDetailsModal } from "../../components";
import {
  ProjectService,
  type Project,
  type CreateProjectData,
} from "../../../infrastructure/api/project.service";
import {
  MyProjectsContainer,
  ContentWrapper,
  PageHeader,
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
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormField,
  FormLabel,
  FormInput,
  FormTextarea,
  FormSelect,
  ErrorMessage,
  FileUploadArea,
  FileUploadPlaceholder,
  FileUploadedInfo,
  RemoveFileButton,
  FormRow,
  CheckboxField,
  ButtonGroup,
  CancelButton,
  SubmitButton,
  AlertBox,
  LoadingOverlay,
  LoadingSpinner,
  ColorBar,
} from "./style";

interface FormErrors {
  title?: string;
  description?: string;
  demoLink?: string;
  github?: string;
  linkedin?: string;
  website?: string;
}

const MyProjectsPage = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const [formData, setFormData] = useState<CreateProjectData>({
    title: "",
    description: "",
    readme: "",
    demoLink: "",
    links: {
      github: "",
      linkedin: "",
      website: "",
      demo: "",
    },
    investmentStatus: "self-sponsored",
    isRegistered: false,
  });

  const [proposalFile, setProposalFile] = useState<File | null>(null);
  const [whitepaperFile, setWhitepaperFile] = useState<File | null>(null);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      setLoading(true);
      const response = await ProjectService.getMyProjects();
      setProjects(response.data);
    } catch (err) {
      setError("Failed to load projects");
    } finally {
      setLoading(false);
    }
  };

  const validateForm = (): boolean => {
    const errors: FormErrors = {};

    if (!formData.title || formData.title.trim().length < 3) {
      errors.title = "Title must be at least 3 characters long";
    }

    if (!formData.description || formData.description.trim().length < 10) {
      errors.description = "Description must be at least 10 characters long";
    }

    if (formData.demoLink && formData.demoLink.trim()) {
      const urlPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
      if (!urlPattern.test(formData.demoLink)) {
        errors.demoLink = "Invalid URL format";
      }
    }

    if (formData.links?.github && formData.links.github.trim()) {
      if (!formData.links.github.includes("github.com")) {
        errors.github = "Invalid GitHub URL";
      }
    }

    if (formData.links?.linkedin && formData.links.linkedin.trim()) {
      if (!formData.links.linkedin.includes("linkedin.com")) {
        errors.linkedin = "Invalid LinkedIn URL";
      }
    }

    if (formData.links?.website && formData.links.website.trim()) {
      const urlPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
      if (!urlPattern.test(formData.links.website)) {
        errors.website = "Invalid website URL";
      }
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleOpenDialog = (project?: Project) => {
    if (project) {
      setEditingProject(project);
      setFormData({
        title: project.title,
        description: project.description,
        readme: project.readme || "",
        demoLink: project.demoLink || "",
        links: project.links || {
          github: "",
          linkedin: "",
          website: "",
          demo: "",
        },
        investmentStatus: project.investmentStatus,
        isRegistered: project.isRegistered,
      });
    } else {
      setEditingProject(null);
      setFormData({
        title: "",
        description: "",
        readme: "",
        demoLink: "",
        links: { github: "", linkedin: "", website: "", demo: "" },
        investmentStatus: "self-sponsored",
        isRegistered: false,
      });
    }
    setProposalFile(null);
    setWhitepaperFile(null);
    setFormErrors({});
    setOpenDialog(true);
    setError("");
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingProject(null);
    setProposalFile(null);
    setWhitepaperFile(null);
    setFormErrors({});
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      setError("Please fix the validation errors before submitting");
      return;
    }

    try {
      setSubmitting(true);
      setError("");

      const dataToSubmit: CreateProjectData = {
        ...formData,
        proposalFile: proposalFile || undefined,
        whitepaperFile: whitepaperFile || undefined,
      };

      if (editingProject) {
        await ProjectService.updateProject(editingProject.id, dataToSubmit);
        setSuccess("Project updated successfully!");
      } else {
        await ProjectService.createProject(dataToSubmit);
        setSuccess("Project created successfully!");
      }

      handleCloseDialog();
      loadProjects();
      setTimeout(() => setSuccess(""), 5000);
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          err.response?.data?.error ||
          "Failed to save project"
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this project?"))
      return;

    try {
      await ProjectService.deleteProject(id);
      setSuccess("Project deleted successfully!");
      handleCloseDetails();
      loadProjects();
      setTimeout(() => setSuccess(""), 5000);
    } catch (err) {
      setError("Failed to delete project");
    }
  };

  const handleViewDetails = (project: Project) => {
    setSelectedProject(project);
    setDetailsOpen(true);
  };

  const handleCloseDetails = () => {
    setDetailsOpen(false);
    setSelectedProject(null);
  };

  const handleEditFromDetails = (project: Project) => {
    handleCloseDetails();
    handleOpenDialog(project);
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

  const getFileByType = (project: Project, fileType: string) => {
    return project.files?.find((f) => f.fileType === fileType);
  };

  return (
    <MyProjectsContainer>
      <Sidebar />
      <ContentWrapper>
        <GlassAppBar title="My Projects" />

        {error && (
          <AlertBox type="error">
            <span>{error}</span>
            <button onClick={() => setError("")}>
              <X size={18} />
            </button>
          </AlertBox>
        )}
        {success && (
          <AlertBox type="success">
            <span>{success}</span>
            <button onClick={() => setSuccess("")}>
              <X size={18} />
            </button>
          </AlertBox>
        )}

        <PageHeader>
          <h1>All Projects ({projects.length})</h1>
          <NewProjectButton onClick={() => handleOpenDialog()}>
            <Plus size={20} />
            New Project
          </NewProjectButton>
        </PageHeader>

        {loading ? (
          <LoadingText>Loading projects...</LoadingText>
        ) : projects.length === 0 ? (
          <EmptyState>
            <h3>No projects yet</h3>
            <p>Create your first project to get started with People Square</p>
            <CreateButton onClick={() => handleOpenDialog()}>
              <Plus size={16} style={{ marginRight: "8px" }} />
              Create Your First Project
            </CreateButton>
          </EmptyState>
        ) : (
          <ProjectsGrid>
            {projects.map((project) => (
              <ProjectCard key={project.id}>
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
                      {project.files.length} file{project.files.length > 1 ? "s" : ""}
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
      </ContentWrapper>

      {/* Create/Edit Modal */}
      <ModalOverlay open={openDialog} onClick={handleCloseDialog}>
        <ModalContent onClick={(e) => e.stopPropagation()}>
          <ModalHeader>
            <h2>{editingProject ? "Edit Project" : "Create New Project"}</h2>
            <ModalCloseButton onClick={handleCloseDialog}>
              <X size={24} />
            </ModalCloseButton>
          </ModalHeader>

          <ModalBody>
            {!editingProject && (
              <div
                style={{
                  background: "linear-gradient(135deg, rgba(45, 158, 73, 0.1), rgba(45, 158, 73, 0.05))",
                  border: "1px solid rgba(45, 158, 73, 0.2)",
                  borderRadius: "var(--radius-lg)",
                  padding: "var(--spacing-lg)",
                  display: "flex",
                  gap: "var(--spacing-md)",
                  alignItems: "flex-start",
                }}
              >
                <FileText size={32} color="var(--color-primary)" style={{ marginTop: "4px" }} />
                <div>
                  <p style={{ fontWeight: 700, margin: "0 0 var(--spacing-xs) 0", color: "var(--color-text-primary)" }}>
                    Ready to upload your files!
                  </p>
                  <p style={{ margin: 0, fontSize: "0.9rem", color: "var(--color-text-secondary)" }}>
                    You can attach proposal and white paper documents (PDF, DOC, DOCX, PPT, PPTX). Files will be
                    uploaded when you create the project.
                  </p>
                </div>
              </div>
            )}

            <FormField>
              <FormLabel htmlFor="title">Project Title *</FormLabel>
              <FormInput
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Enter project title"
                className={formErrors.title ? "error" : ""}
              />
              {formErrors.title && <ErrorMessage>{formErrors.title}</ErrorMessage>}
            </FormField>

            <FormField>
              <FormLabel htmlFor="description">Description *</FormLabel>
              <FormTextarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Enter project description"
                className={formErrors.description ? "error" : ""}
                style={{ minHeight: "100px" }}
              />
              {formErrors.description && <ErrorMessage>{formErrors.description}</ErrorMessage>}
            </FormField>

            <FormField>
              <FormLabel htmlFor="readme">README</FormLabel>
              <FormTextarea
                id="readme"
                value={formData.readme}
                onChange={(e) => setFormData({ ...formData, readme: e.target.value })}
                placeholder="Detailed project information, setup instructions, etc."
                style={{ minHeight: "120px" }}
              />
            </FormField>

            {/* Proposal File Upload */}
            <FormField>
              <FormLabel>Proposal File</FormLabel>
              <FileUploadArea
                htmlFor="proposal"
                role="button"
                tabIndex={0}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    (document.getElementById("proposal") as HTMLInputElement)?.click();
                  }
                }}
              >
                <input
                  id="proposal"
                  type="file"
                  accept=".pdf,.doc,.docx,.ppt,.pptx"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) setProposalFile(file);
                  }}
                />
                {proposalFile ? (
                  <FileUploadedInfo>
                    <FileText size={48} color="var(--color-primary)" />
                    <p>{proposalFile.name}</p>
                    <span>{(proposalFile.size / 1024 / 1024).toFixed(2)} MB</span>
                    <RemoveFileButton
                      onClick={(e) => {
                        e.preventDefault();
                        setProposalFile(null);
                      }}
                    >
                      Remove file
                    </RemoveFileButton>
                  </FileUploadedInfo>
                ) : editingProject && getFileByType(editingProject, "proposal") ? (
                  <FileUploadedInfo>
                    <FileText size={48} color="var(--color-text-secondary)" />
                    <p style={{ color: "var(--color-text-secondary)" }}>
                      Current: {getFileByType(editingProject, "proposal")?.originalName}
                    </p>
                    <span style={{ color: "var(--color-primary)" }}>Click to replace</span>
                  </FileUploadedInfo>
                ) : (
                  <FileUploadPlaceholder>
                    <FileText size={48} color="var(--color-primary)" />
                    <p>Drop proposal file here or click to browse</p>
                    <span>Supports: PDF, DOC, DOCX, PPT, PPTX (Max 10MB)</span>
                  </FileUploadPlaceholder>
                )}
              </FileUploadArea>
            </FormField>

            {/* White Paper File Upload */}
            <FormField>
              <FormLabel>White Paper</FormLabel>
              <FileUploadArea
                htmlFor="whitepaper"
                role="button"
                tabIndex={0}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    (document.getElementById("whitepaper") as HTMLInputElement)?.click();
                  }
                }}
              >
                <input
                  id="whitepaper"
                  type="file"
                  accept=".pdf,.doc,.docx,.ppt,.pptx"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) setWhitepaperFile(file);
                  }}
                />
                {whitepaperFile ? (
                  <FileUploadedInfo>
                    <FileText size={48} color="var(--color-primary)" />
                    <p>{whitepaperFile.name}</p>
                    <span>{(whitepaperFile.size / 1024 / 1024).toFixed(2)} MB</span>
                    <RemoveFileButton
                      onClick={(e) => {
                        e.preventDefault();
                        setWhitepaperFile(null);
                      }}
                    >
                      Remove file
                    </RemoveFileButton>
                  </FileUploadedInfo>
                ) : editingProject && getFileByType(editingProject, "whitepaper") ? (
                  <FileUploadedInfo>
                    <FileText size={48} color="var(--color-text-secondary)" />
                    <p style={{ color: "var(--color-text-secondary)" }}>
                      Current: {getFileByType(editingProject, "whitepaper")?.originalName}
                    </p>
                    <span style={{ color: "var(--color-primary)" }}>Click to replace</span>
                  </FileUploadedInfo>
                ) : (
                  <FileUploadPlaceholder>
                    <FileText size={48} color="var(--color-primary)" />
                    <p>Drop white paper here or click to browse</p>
                    <span>Supports: PDF, DOC, DOCX, PPT, PPTX (Max 10MB)</span>
                  </FileUploadPlaceholder>
                )}
              </FileUploadArea>
            </FormField>

            <FormField>
              <FormLabel htmlFor="demo">Demo Link</FormLabel>
              <FormInput
                id="demo"
                value={formData.demoLink}
                onChange={(e) => setFormData({ ...formData, demoLink: e.target.value })}
                placeholder="https://demo.yourproject.com"
                className={formErrors.demoLink ? "error" : ""}
              />
              {formErrors.demoLink && <ErrorMessage>{formErrors.demoLink}</ErrorMessage>}
            </FormField>

            <FormRow>
              <FormField>
                <FormLabel htmlFor="github">GitHub URL</FormLabel>
                <FormInput
                  id="github"
                  value={formData.links?.github || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      links: { ...formData.links, github: e.target.value },
                    })
                  }
                  placeholder="https://github.com/username/repo"
                  className={formErrors.github ? "error" : ""}
                />
                {formErrors.github && <ErrorMessage>{formErrors.github}</ErrorMessage>}
              </FormField>

              <FormField>
                <FormLabel htmlFor="linkedin">LinkedIn URL</FormLabel>
                <FormInput
                  id="linkedin"
                  value={formData.links?.linkedin || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      links: { ...formData.links, linkedin: e.target.value },
                    })
                  }
                  placeholder="https://linkedin.com/in/username"
                  className={formErrors.linkedin ? "error" : ""}
                />
                {formErrors.linkedin && <ErrorMessage>{formErrors.linkedin}</ErrorMessage>}
              </FormField>
            </FormRow>

            <FormRow>
              <FormField>
                <FormLabel htmlFor="website">Website URL</FormLabel>
                <FormInput
                  id="website"
                  value={formData.links?.website || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      links: { ...formData.links, website: e.target.value },
                    })
                  }
                  placeholder="https://yourproject.com"
                  className={formErrors.website ? "error" : ""}
                />
                {formErrors.website && <ErrorMessage>{formErrors.website}</ErrorMessage>}
              </FormField>

              <FormField>
                <FormLabel htmlFor="status">Investment Status</FormLabel>
                <FormSelect
                  id="status"
                  value={formData.investmentStatus}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      investmentStatus: e.target.value as any,
                    })
                  }
                >
                  <option value="self-sponsored">Self Sponsored</option>
                  <option value="looking-for-first-sponsor">Looking for First Sponsor</option>
                  <option value="looking-for-more-sponsors">Looking for More Sponsors</option>
                </FormSelect>
              </FormField>
            </FormRow>

            <CheckboxField>
              <input
                id="registered"
                type="checkbox"
                checked={formData.isRegistered}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    isRegistered: e.target.checked,
                  })
                }
              />
              <label htmlFor="registered">Registered Project</label>
            </CheckboxField>
          </ModalBody>

          <ModalFooter>
            <ButtonGroup>
              <CancelButton onClick={handleCloseDialog} disabled={submitting}>
                Cancel
              </CancelButton>
              <SubmitButton onClick={handleSubmit} disabled={submitting}>
                {submitting && <Loader size={20} style={{ animation: "spin 1s linear infinite" }} />}
                {submitting
                  ? "Uploading..."
                  : editingProject
                  ? "Update Project"
                  : "Create Project"}
              </SubmitButton>
            </ButtonGroup>
          </ModalFooter>
        </ModalContent>
      </ModalOverlay>

      {/* Loading Overlay */}
      <LoadingOverlay visible={submitting}>
        <LoadingSpinner />
        <h3 style={{ color: "var(--color-text-primary)", margin: "var(--spacing-lg) 0 0 0" }}>
          {editingProject ? "Updating project..." : "Creating project..."}
        </h3>
        {(proposalFile || whitepaperFile) && (
          <p style={{ color: "var(--color-text-secondary)", margin: "var(--spacing-sm) 0 0 0" }}>
            Uploading files, please wait...
          </p>
        )}
      </LoadingOverlay>

      {/* Project Details Modal */}
      <ProjectDetailsModal
        open={detailsOpen}
        project={selectedProject}
        onClose={handleCloseDetails}
        onEdit={handleEditFromDetails}
        onDelete={handleDelete}
        showActions={true}
      />

      {/* Color Bar */}
      <ColorBar />
    </MyProjectsContainer>
  );
};

export default MyProjectsPage;
