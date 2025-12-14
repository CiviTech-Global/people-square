import { X, Edit, Trash2, Github, Linkedin, Globe, Link as LinkIcon, FileText } from "lucide-react";
import { FilePreviewWidget } from "./FilePreviewWidget";
import type { Project, ProjectFile } from "../../infrastructure/api/project.service";
import { ProjectService } from "../../infrastructure/api/project.service";
import {
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  ModalTitle,
  ModalChip,
  ModalChipContainer,
  SectionTitle,
  SectionContent,
  SectionDivider,
  ReadmeBox,
  LinksContainer,
  LinkItem,
  FilesContainer,
  EmptyFilesBox,
  ButtonGroup,
  CancelButton,
  DeleteButton,
  EditButton,
  CloseButton,
} from "./ProjectDetailsModal.styles";

interface ProjectDetailsModalProps {
  open: boolean;
  project: Project | null;
  onClose: () => void;
  onEdit?: (project: Project) => void;
  onDelete?: (projectId: string) => void;
  showActions?: boolean;
}

export const ProjectDetailsModal = ({
  open,
  project,
  onClose,
  onEdit,
  onDelete,
  showActions = false,
}: ProjectDetailsModalProps) => {
  if (!project) return null;

  const getInvestmentStatusColor = (status: string) => {
    switch (status) {
      case "self-sponsored":
        return "linear-gradient(135deg, rgba(230, 57, 70, 0.8), rgba(230, 57, 70, 0.6))";
      case "looking-for-first-sponsor":
        return "linear-gradient(135deg, rgba(244, 185, 66, 0.8), rgba(244, 185, 66, 0.6))";
      case "looking-for-more-sponsors":
        return "linear-gradient(135deg, rgba(74, 144, 217, 0.8), rgba(74, 144, 217, 0.6))";
      default:
        return "var(--color-gray-light)";
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

  const handleDownloadFile = (file: ProjectFile) => {
    ProjectService.downloadFile(file.id, file.originalName);
  };

  return (
    <ModalOverlay open={open} onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <div>
            <ModalTitle>{project.title}</ModalTitle>
            <ModalChipContainer>
              <ModalChip>
                {getInvestmentStatusLabel(project.investmentStatus)}
              </ModalChip>
              {project.isRegistered && (
                <ModalChip>
                  Registered
                </ModalChip>
              )}
            </ModalChipContainer>
          </div>
          <ModalCloseButton onClick={onClose}>
            <X size={24} />
          </ModalCloseButton>
        </ModalHeader>

        <ModalBody>
          {/* Description */}
          <div>
            <SectionTitle>Description</SectionTitle>
            <SectionContent>{project.description}</SectionContent>
          </div>

          {/* README */}
          {project.readme && (
            <>
              <SectionDivider />
              <div>
                <SectionTitle>README</SectionTitle>
                <ReadmeBox>
                  <pre>{project.readme}</pre>
                </ReadmeBox>
              </div>
            </>
          )}

          {/* Links */}
          {(project.demoLink || project.links?.github || project.links?.linkedin || project.links?.website) && (
            <>
              <SectionDivider />
              <div>
                <SectionTitle>Links</SectionTitle>
                <LinksContainer>
                  {project.demoLink && (
                    <LinkItem
                      href={project.demoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <LinkIcon size={18} />
                      <span>Demo: {project.demoLink}</span>
                    </LinkItem>
                  )}
                  {project.links?.github && (
                    <LinkItem
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github size={18} />
                      <span>{project.links.github}</span>
                    </LinkItem>
                  )}
                  {project.links?.linkedin && (
                    <LinkItem
                      href={project.links.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Linkedin size={18} />
                      <span>{project.links.linkedin}</span>
                    </LinkItem>
                  )}
                  {project.links?.website && (
                    <LinkItem
                      href={project.links.website}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Globe size={18} />
                      <span>{project.links.website}</span>
                    </LinkItem>
                  )}
                </LinksContainer>
              </div>
            </>
          )}

          {/* Files */}
          {project.files && project.files.length > 0 && (
            <>
              <SectionDivider />
              <div>
                <FilesContainer>
                  <SectionTitle>Attached Files</SectionTitle>
                  <ModalChip>
                    {project.files.length} file{project.files.length > 1 ? "s" : ""}
                  </ModalChip>
                </FilesContainer>
                <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-md)", marginTop: "var(--spacing-md)" }}>
                  {project.files.map((file) => (
                    <FilePreviewWidget
                      key={file.id}
                      file={file}
                      onDownload={handleDownloadFile}
                    />
                  ))}
                </div>
              </div>
            </>
          )}

          {/* No Files Message */}
          {(!project.files || project.files.length === 0) && (
            <>
              <SectionDivider />
              <EmptyFilesBox>
                <FileText size={48} color="var(--color-gray)" />
                <p>No files attached to this project yet</p>
              </EmptyFilesBox>
            </>
          )}
        </ModalBody>

        <ModalFooter>
          {showActions ? (
            <ButtonGroup>
              <CancelButton onClick={onClose}>Close</CancelButton>
              <div style={{ flex: 1 }} />
              <DeleteButton onClick={() => onDelete && onDelete(project.id)}>
                <Trash2 size={18} />
                Delete
              </DeleteButton>
              <EditButton onClick={() => onEdit && onEdit(project)}>
                <Edit size={18} />
                Edit
              </EditButton>
            </ButtonGroup>
          ) : (
            <CloseButton onClick={onClose}>Close</CloseButton>
          )}
        </ModalFooter>
      </ModalContent>
    </ModalOverlay>
  );
};
