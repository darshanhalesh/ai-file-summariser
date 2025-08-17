import { useState, useCallback } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, FileText, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface FileUploadProps {
  onFileUpload: (file: File, content: string) => void;
  uploadedFile: File | null;
  onRemoveFile: () => void;
}

export const FileUpload = ({ onFileUpload, uploadedFile, onRemoveFile }: FileUploadProps) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileRead = useCallback((file: File) => {
    console.log('FileUpload: Starting file read for:', file.name);
    setIsLoading(true);
    
    // Simple validation
    if (!file || file.size === 0) {
      console.error('FileUpload: Invalid file');
      setIsLoading(false);
      return;
    }
    
    const reader = new FileReader();
    
    reader.onload = (e) => {
      console.log('FileUpload: File read successful, content length:', e.target?.result?.toString().length);
      const content = e.target?.result as string;
      
      if (!content || content.trim().length === 0) {
        console.error('FileUpload: File content is empty');
        setIsLoading(false);
        return;
      }
      
      console.log('FileUpload: Calling onFileUpload with content length:', content.length);
      onFileUpload(file, content);
      setIsLoading(false);
    };
    
    reader.onerror = (error) => {
      console.error('FileUpload: Error reading file:', error);
      setIsLoading(false);
    };
    
    reader.readAsText(file);
  }, [onFileUpload]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    const file = files[0];
    
    if (file && (file.type === "text/plain" || file.name.endsWith('.txt'))) {
      handleFileRead(file);
    }
  }, [handleFileRead]);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('FileUpload: File input changed, files:', e.target.files);
    const file = e.target.files?.[0];
    if (file) {
      console.log('FileUpload: File selected:', file.name, file.type, file.size);
      handleFileRead(file);
    } else {
      console.log('FileUpload: No file selected');
    }
  };

  if (uploadedFile) {
    return (
      <Card className="p-6 border-2 border-primary/20 bg-gradient-secondary">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <FileText className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="font-medium text-foreground">{uploadedFile.name}</p>
              <p className="text-sm text-muted-foreground">
                {(uploadedFile.size / 1024).toFixed(1)} KB
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onRemoveFile}
            className="h-8 w-8 p-0 hover:bg-destructive/10 hover:text-destructive"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card
      className={cn(
        "p-8 border-2 border-dashed transition-all duration-300 cursor-pointer hover:shadow-soft",
        isDragOver 
          ? "border-primary bg-primary/5" 
          : "border-border hover:border-primary/50"
      )}
      onDrop={handleDrop}
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragOver(true);
      }}
      onDragLeave={() => setIsDragOver(false)}
      onClick={() => {
        // Make the entire card clickable to trigger file selection
        const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
        if (fileInput) {
          console.log('FileUpload: Card clicked, triggering file input');
          fileInput.click();
        }
      }}
    >
      <div className="text-center space-y-4">
        <div className="mx-auto w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
          <Upload className="h-6 w-6 text-primary-foreground" />
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Upload Meeting Transcript</h3>
          <p className="text-muted-foreground mb-4">
            Drag and drop your .txt file here, or click to browse
          </p>
        </div>
        
        {/* Simple file input that's easier to use */}
        <div className="space-y-3">
          <input
            type="file"
            accept=".txt,text/plain"
            onChange={handleFileInput}
            className="block w-full text-sm text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
            disabled={isLoading}
          />
          
          {/* Alternative button approach */}
          <div className="text-sm text-muted-foreground">
            <span>Or drag and drop a .txt file here</span>
          </div>
        </div>
        
        <p className="text-xs text-muted-foreground">
          Supports .txt files up to 10MB
        </p>
        
        {/* Debug section for troubleshooting */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mt-4 p-3 bg-muted/50 rounded-lg text-xs">
            <p className="font-medium mb-2">Debug Info:</p>
            <p>• File input is visible and clickable</p>
            <p>• Drag & drop is enabled</p>
            <p>• Check browser console for detailed logs</p>
            <p>• Current state: {isLoading ? 'Loading...' : 'Ready'}</p>
            
            {/* Test button */}
            <button
              onClick={() => {
                console.log('FileUpload: Test button clicked');
                const testFile = new File(['This is a test file content'], 'test.txt', { type: 'text/plain' });
                console.log('FileUpload: Created test file:', testFile);
                handleFileRead(testFile);
              }}
              className="mt-2 px-2 py-1 bg-primary text-primary-foreground rounded text-xs hover:bg-primary/90"
            >
              Test File Reading
            </button>
          </div>
        )}
      </div>
    </Card>
  );
};