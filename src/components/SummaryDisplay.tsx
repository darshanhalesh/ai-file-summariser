import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Copy, Edit3, Check, Share, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SummaryDisplayProps {
  summary: string;
  onSummaryEdit: (newSummary: string) => void;
  onShare: () => void;
  isSharing: boolean;
}

export const SummaryDisplay = ({ 
  summary, 
  onSummaryEdit, 
  onShare, 
  isSharing 
}: SummaryDisplayProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedSummary, setEditedSummary] = useState(summary);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleSave = () => {
    onSummaryEdit(editedSummary);
    setIsEditing(false);
    toast({
      title: "Summary updated",
      description: "Your changes have been saved successfully.",
    });
  };

  const handleCancel = () => {
    setEditedSummary(summary);
    setIsEditing(false);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
      toast({
        title: "Copied to clipboard",
        description: "The summary has been copied to your clipboard.",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast({
        title: "Failed to copy",
        description: "Unable to copy to clipboard. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            <Label className="text-base font-semibold">AI Generated Summary</Label>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopy}
              className="transition-all duration-200"
            >
              {copied ? (
                <Check className="h-4 w-4 text-green-600" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditing(!isEditing)}
              className="transition-all duration-200"
            >
              <Edit3 className="h-4 w-4" />
              {isEditing ? "Cancel" : "Edit"}
            </Button>
          </div>
        </div>

        {isEditing ? (
          <div className="space-y-4">
            <Textarea
              value={editedSummary}
              onChange={(e) => setEditedSummary(e.target.value)}
              className="min-h-[300px] resize-none"
              placeholder="Edit your summary..."
            />
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
              <Button onClick={handleSave} variant="gradient">
                Save Changes
              </Button>
            </div>
          </div>
        ) : (
          <div className="bg-muted/30 rounded-lg p-4 border">
            <div className="prose max-w-none">
              <pre className="whitespace-pre-wrap text-sm font-mono text-foreground">
                {summary}
              </pre>
            </div>
          </div>
        )}

        <div className="flex justify-center pt-4">
          <Button
            onClick={onShare}
            disabled={isSharing}
            className="bg-gradient-primary hover:shadow-soft transition-all duration-300"
            size="lg"
          >
            {isSharing ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary-foreground border-t-transparent mr-2" />
                Sending...
              </>
            ) : (
              <>
                <Share className="h-4 w-4 mr-2" />
                Share via Email
              </>
            )}
          </Button>
        </div>
      </div>
    </Card>
  );
};