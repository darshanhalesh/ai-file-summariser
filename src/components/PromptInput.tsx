import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Lightbulb, Sparkles } from "lucide-react";

interface PromptInputProps {
  prompt: string;
  onPromptChange: (prompt: string) => void;
  onGenerate: () => void;
  isGenerating: boolean;
  disabled: boolean;
}

const PROMPT_TEMPLATES = [
  {
    title: "Executive Summary",
    prompt: "Create a concise executive summary with key decisions, action items, and next steps in bullet points."
  },
  {
    title: "Action Items Only",
    prompt: "Extract and list only the action items, deadlines, and responsible parties from this meeting."
  },
  {
    title: "Meeting Minutes",
    prompt: "Format this as professional meeting minutes with agenda items, discussions, and outcomes."
  },
  {
    title: "Team Update",
    prompt: "Summarize this meeting for team members who couldn't attend, highlighting important updates and decisions."
  }
];

export const PromptInput = ({ 
  prompt, 
  onPromptChange, 
  onGenerate, 
  isGenerating, 
  disabled 
}: PromptInputProps) => {
  const [showTemplates, setShowTemplates] = useState(false);

  const handleTemplateSelect = (templatePrompt: string) => {
    onPromptChange(templatePrompt);
    setShowTemplates(false);
  };

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="prompt" className="text-base font-semibold">
            Custom Summary Prompt
          </Label>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowTemplates(!showTemplates)}
            className="text-muted-foreground hover:text-primary"
          >
            <Lightbulb className="h-4 w-4 mr-1" />
            Templates
          </Button>
        </div>

        {showTemplates && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-4 bg-muted/50 rounded-lg">
            {PROMPT_TEMPLATES.map((template, index) => (
              <button
                key={index}
                onClick={() => handleTemplateSelect(template.prompt)}
                className="text-left p-3 bg-background rounded-md hover:shadow-soft transition-all duration-200 border border-transparent hover:border-primary/20"
              >
                <h4 className="font-medium text-sm mb-1">{template.title}</h4>
                <p className="text-xs text-muted-foreground line-clamp-2">
                  {template.prompt}
                </p>
              </button>
            ))}
          </div>
        )}

        <div>
          <Textarea
            id="prompt"
            placeholder="Enter your custom prompt for how you'd like the meeting summarized..."
            value={prompt}
            onChange={(e) => onPromptChange(e.target.value)}
            className="min-h-[120px] resize-none"
            disabled={disabled}
          />
        </div>

        <Button
          onClick={onGenerate}
          disabled={disabled || !prompt.trim() || isGenerating}
          className="w-full bg-gradient-primary hover:shadow-soft transition-all duration-300"
          size="lg"
        >
          {isGenerating ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary-foreground border-t-transparent mr-2" />
              Generating Summary...
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4 mr-2" />
              Generate AI Summary
            </>
          )}
        </Button>
      </div>
    </Card>
  );
};