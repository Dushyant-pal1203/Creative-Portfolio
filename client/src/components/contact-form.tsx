import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import type { InsertContact } from "@/types/contact";

export default function ContactForm() {
  const [formData, setFormData] = useState<InsertContact>({
    name: "",
    email: "",
    message: "",
  });

  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsPending(true);
    setIsError(false);

    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to send");

      setFormData({ name: "", email: "", message: "" });
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (error) {
      setIsError(true);
      setErrorMessage("Failed to send message. Please try again.");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.3 }}
      onSubmit={handleSubmit}
      className="bg-[#0a0a0a45] border border-border p-8 md:p-12 max-w-2xl"
    >
      <h3 className="text-2xl font-display font-bold mb-8 text-white">
        Send a Message
      </h3>

      {isSuccess && (
        <div
          className="mb-6 p-4 bg-primary/10 border border-primary flex items-center gap-3"
          data-testid="success-message"
        >
          <CheckCircle2 className="w-5 h-5 text-primary" />
          <p className="text-sm text-primary">
            Message sent successfully! I'll get back to you soon.
          </p>
        </div>
      )}

      {isError && (
        <div
          className="mb-6 p-4 bg-destructive/10 border border-destructive flex items-center gap-3"
          data-testid="error-message"
        >
          <AlertCircle className="w-5 h-5 text-destructive" />
          <p className="text-sm text-destructive">{errorMessage}</p>
        </div>
      )}

      <div className="space-y-6">
        <div>
          <label
            htmlFor="name"
            className="block text-xs font-mono text-muted-foreground mb-2 uppercase tracking-widest"
          >
            Name
          </label>
          <Input
            id="name"
            data-testid="input-name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="bg-background border-border focus:border-primary text-white"
            required
            disabled={isPending}
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-xs font-mono text-muted-foreground mb-2 uppercase tracking-widest"
          >
            Email
          </label>
          <Input
            id="email"
            type="email"
            data-testid="input-email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="bg-background border-border focus:border-primary text-white"
            required
            disabled={isPending}
          />
        </div>

        <div>
          <label
            htmlFor="message"
            className="block text-xs font-mono text-muted-foreground mb-2 uppercase tracking-widest"
          >
            Message
          </label>
          <Textarea
            id="message"
            data-testid="input-message"
            value={formData.message}
            onChange={(e) =>
              setFormData({ ...formData, message: e.target.value })
            }
            className="bg-background border-border focus:border-primary text-white min-h-[150px] resize-none"
            required
            disabled={isPending}
          />
        </div>

        <Button
          type="submit"
          data-testid="button-submit"
          disabled={isPending}
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-bold py-6 text-base transition-all duration-300 hover:scale-[1.02]"
        >
          {isPending ? (
            "SENDING..."
          ) : (
            <>
              SEND MESSAGE <Send className="ml-2 w-4 h-4" />
            </>
          )}
        </Button>
      </div>
    </motion.form>
  );
}
