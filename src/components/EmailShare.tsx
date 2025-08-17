import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { X, Plus, Mail, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface EmailShareProps {
  summary: string;
  onSend: (emails: string[], subject: string, message: string) => Promise<void>;
  onBack: () => void;
  isLoading: boolean;
  useMockEmail: boolean;
  onToggleMockEmail: (useMock: boolean) => void;
}

export const EmailShare = ({ summary, onSend, onBack, isLoading, useMockEmail, onToggleMockEmail }: EmailShareProps) => {
  const [emails, setEmails] = useState<string[]>([""]);
  const [subject, setSubject] = useState("Meeting Summary");
  const [message, setMessage] = useState(`Hi there,

Please find the meeting summary below:

${summary}

Best regards`);
  const { toast } = useToast();

  const addEmailField = () => {
    setEmails([...emails, ""]);
  };

  const removeEmailField = (index: number) => {
    setEmails(emails.filter((_, i) => i !== index));
  };

  const updateEmail = (index: number, value: string) => {
    const newEmails = [...emails];
    newEmails[index] = value;
    setEmails(newEmails);
  };

  const handleSend = async () => {
    const validEmails = emails.filter(email => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email.trim());
    });

    if (validEmails.length === 0) {
      toast({
        title: "Invalid emails",
        description: "Please enter at least one valid email address.",
        variant: "destructive",
      });
      return;
    }

    if (!subject.trim()) {
      toast({
        title: "Subject required",
        description: "Please enter a subject for the email.",
        variant: "destructive",
      });
      return;
    }

    try {
      await onSend(validEmails, subject, message);
      toast({
        title: "Email sent successfully",
        description: `Summary shared with ${validEmails.length} recipient(s).`,
      });
    } catch (error) {
      toast({
        title: "Failed to send email",
        description: "There was an error sending the email. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="outline" size="sm" onClick={onBack}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="flex items-center gap-2">
          <Mail className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold">Share Summary via Email</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <div className="space-y-4">
            {/* Email Mode Toggle */}
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">Email Mode</span>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-xs ${useMockEmail ? 'text-muted-foreground' : 'text-primary'}`}>Real Email</span>
                <button
                  onClick={() => onToggleMockEmail(!useMockEmail)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    useMockEmail ? 'bg-primary' : 'bg-muted'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      useMockEmail ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
                <span className={`text-xs ${useMockEmail ? 'text-primary' : 'text-muted-foreground'}`}>Mock Email</span>
              </div>
            </div>
            
            <div>
              <Label htmlFor="subject" className="text-base font-medium">
                Email Subject
              </Label>
              <Input
                id="subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Enter email subject"
                className="mt-1"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <Label className="text-base font-medium">Recipients</Label>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={addEmailField}
                  className="text-xs"
                >
                  <Plus className="h-3 w-3 mr-1" />
                  Add
                </Button>
              </div>
              <div className="space-y-2">
                {emails.map((email, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      type="email"
                      placeholder="Enter email address"
                      value={email}
                      onChange={(e) => updateEmail(index, e.target.value)}
                      className="flex-1"
                    />
                    {emails.length > 1 && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeEmailField(index)}
                        className="px-2"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="message" className="text-base font-medium">
                Email Message
              </Label>
              <Textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Enter your message"
                className="mt-1 min-h-[200px] resize-none"
              />
            </div>

            <Button
              onClick={handleSend}
              disabled={isLoading}
              className="w-full bg-gradient-primary hover:shadow-soft transition-all duration-300"
              size="lg"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary-foreground border-t-transparent mr-2" />
                  Sending Email...
                </>
              ) : (
                <>
                  <Mail className="h-4 w-4 mr-2" />
                  Send Summary
                </>
              )}
            </Button>
          </div>
        </Card>

        <Card className="p-6 bg-muted/30">
          <div>
            <h3 className="font-medium mb-3">Email Preview</h3>
            <div className="space-y-3 text-sm">
              <div>
                <span className="font-medium text-muted-foreground">To:</span>{" "}
                {emails.filter(email => email.trim()).join(", ") || "Recipients"}
              </div>
              <div>
                <span className="font-medium text-muted-foreground">Subject:</span>{" "}
                {subject || "Email subject"}
              </div>
              <div className="border-t pt-3">
                <div className="bg-background p-3 rounded border max-h-[300px] overflow-y-auto">
                  <pre className="whitespace-pre-wrap text-xs font-mono">
                    {message}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};