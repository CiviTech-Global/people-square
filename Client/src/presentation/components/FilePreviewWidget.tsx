import { useState } from "react";
import { FileText, Download, Eye, X } from "lucide-react";
import type { ProjectFile } from "../../infrastructure/api/project.service";
import {
  FileWidgetContainer,
  FileIconBox,
  FileInfo,
  FileName,
  FileSize,
  FileTypeLabel,
  FileActions,
  IconButton,
  PreviewModalOverlay,
  PreviewModalContent,
  PreviewModalHeader,
  PreviewModalCloseButton,
  PreviewModalBody,
  PreviewModalFooter,
  PreviewButton,
  PreviewLoadingBox,
} from "./FilePreviewWidget.styles";

interface FilePreviewWidgetProps {
  file: ProjectFile;
  onDownload?: (file: ProjectFile) => void;
}

export const FilePreviewWidget = ({ file, onDownload }: FilePreviewWidgetProps) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const getFileTypeLabel = () => {
    if (file.fileType === "proposal") return "Proposal";
    if (file.fileType === "whitepaper") return "White Paper";
    return "Document";
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const handleDownload = () => {
    if (onDownload) {
      onDownload(file);
    }
  };

  const handlePreview = () => {
    setPreviewOpen(true);
    setLoading(true);
  };

  const isPdf = file.mimeType.includes("pdf");

  return (
    <>
      <FileWidgetContainer>
        <FileIconBox>
          <FileText size={32} color="var(--color-dark)" />
        </FileIconBox>

        <FileInfo>
          <FileTypeLabel>{getFileTypeLabel()}</FileTypeLabel>
          <FileName>{file.originalName}</FileName>
          <FileSize>{formatFileSize(file.fileSize)}</FileSize>
        </FileInfo>

        <FileActions>
          {isPdf && (
            <IconButton onClick={handlePreview} title="Preview PDF">
              <Eye size={18} />
            </IconButton>
          )}
          <IconButton onClick={handleDownload} title="Download File">
            <Download size={18} />
          </IconButton>
        </FileActions>
      </FileWidgetContainer>

      {/* PDF Preview Modal */}
      {isPdf && (
        <PreviewModalOverlay open={previewOpen} onClick={() => setPreviewOpen(false)}>
          <PreviewModalContent onClick={(e) => e.stopPropagation()}>
            <PreviewModalHeader>
              <div>
                <h3>{getFileTypeLabel()} Preview</h3>
                <p>{file.originalName}</p>
              </div>
              <PreviewModalCloseButton onClick={() => setPreviewOpen(false)}>
                <X size={24} />
              </PreviewModalCloseButton>
            </PreviewModalHeader>
            <PreviewModalBody>
              {loading && (
                <PreviewLoadingBox>
                  <div className="spinner" />
                  <p>Loading PDF...</p>
                </PreviewLoadingBox>
              )}
              <iframe
                src={`${import.meta.env.VITE_API_BASE_URL || "http://localhost:3000"}${file.filePath}`}
                style={{
                  width: "100%",
                  height: "100%",
                  border: "none",
                  flex: 1,
                  display: loading ? "none" : "block",
                }}
                title={file.originalName}
                onLoad={() => setLoading(false)}
              />
            </PreviewModalBody>
            <PreviewModalFooter>
              <PreviewButton onClick={handleDownload}>
                <Download size={18} />
                Download
              </PreviewButton>
              <PreviewButton variant="outline" onClick={() => setPreviewOpen(false)}>
                Close
              </PreviewButton>
            </PreviewModalFooter>
          </PreviewModalContent>
        </PreviewModalOverlay>
      )}
    </>
  );
};
