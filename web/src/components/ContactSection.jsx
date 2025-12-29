import {
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Send,
  Github,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

export const ContactSection = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name?.value?.trim();
    const email = form.email?.value?.trim();
    const message = form.message?.value?.trim();

    if (!name || !email || !message) {
      toast({ title: "Missing fields", description: "Please fill in all fields." });
      return;
    }

    setIsSubmitting(true);

    try {
      const apiBase = import.meta.env.VITE_API_URL || '';
      const primaryUrl = `${apiBase}/api/contact`;

      // Try primary (build-time) URL first
      let res;
      try {
        res = await fetch(primaryUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, message }),
        });

        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          throw new Error(err.error || 'Failed to send message');
        }
      } catch (primaryErr) {
        // Primary failed (network or server). Retry using deployed backend as fallback.
        console.warn('Primary API failed, trying fallback:', primaryErr.message || primaryErr);
        const FALLBACK_API = 'https://keithardeegithubio-production.up.railway.app';
        const fallbackUrl = `${FALLBACK_API}/api/contact`;

        res = await fetch(fallbackUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, message }),
        });

        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          throw new Error(err.error || 'Failed to send message');
        }
      }

      toast({ title: 'Message sent!', description: "Thank you for your message. I'll get back to you soon." });
      form.reset();
    } catch (err) {
      console.error(err);
      toast({ title: 'Error', description: err.message || 'Failed to send message' });
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <section id="contact" className="py-24 px-4 relative bg-secondary/30">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          Get In <span className="text-primary"> Touch</span>
        </h2>

        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Have a project in mind or want to collaborate? Feel free to reach out.
          I&apos;m always open to discussing new opportunities.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <h3 className="text-2xl font-semibold mb-6">
              {" "}
              Contact Information
            </h3>

            <div className="space-y-4">
              <div className="flex items-start py-3 border-b border-border">
                <div className="w-12 flex-shrink-0 flex items-start justify-center p-2 rounded-full bg-primary/10">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div className="w-36 text-right text-xs text-muted-foreground uppercase tracking-wider pr-4">
                  Email
                </div>
                <div className="flex-1 pl-1">
                  <a
                    href="mailto:hello@gmail.com"
                    className="text-foreground font-medium hover:text-primary transition-colors break-words"
                  >
                    keithardeelazo@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start py-3 border-b border-border">
                <div className="w-12 flex-shrink-0 flex items-start justify-center p-2 rounded-full bg-primary/10">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <div className="w-36 text-right text-xs text-muted-foreground uppercase tracking-wider pr-4">
                  Phone
                </div>
                <div className="flex-1 pl-1">
                  <a
                    href="tel:+11234567890"
                    className="text-foreground font-medium hover:text-primary transition-colors"
                  >
                    +63 915-6938-052
                  </a>
                </div>
              </div>

              <div className="flex items-start py-3">
                <div className="w-12 flex-shrink-0 flex items-start justify-center p-2 rounded-full bg-primary/10">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div className="w-36 text-right text-xs text-muted-foreground uppercase tracking-wider pr-4">
                  Location
                </div>
                <div className="flex-1 pl-1 text-foreground font-medium">
                  Malasiqui, Pangasinan, Philippines
                </div>
              </div>
            </div>

            <div className="pt-8">
              <h4 className="font-medium mb-4"> Connect With Me</h4>
              <div className="flex space-x-4 justify-center">
                <a
                  href="https://www.linkedin.com/in/keith-ardee-lazo-3057bb29b/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Keith Ardee on LinkedIn"
                >
                  <Linkedin />
                </a>
                <a  
                  href="https://www.instagram.com/rdkeytsqnv/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Keith Ardee on LinkedIn">
                  <Instagram />
                </a>
                <a 
                  href="https://github.com/keithardee" 
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Keith Ardee on Github">
                  <Github />
                </a>
              </div>
            </div>
          </div>

          <div className="bg-card p-8 rounded-lg shadow-xs">
            <h3 className="text-2xl font-semibold mb-6"> Send a Message</h3>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium mb-2"
                >
                  {" "}
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-4 py-3 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Keith Ardee..."
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-2"
                >
                  {" "}
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="keith@gmail.com"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium mb-2"
                >
                  {" "}
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  className="w-full px-4 py-3 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  placeholder="Hello, I'd like to talk about..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={cn(
                  "cosmic-button w-full flex items-center justify-center gap-2"
                )}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
                <Send size={16} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
