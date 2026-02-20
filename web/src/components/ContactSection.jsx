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
import { useContactForm } from "@/hooks/use-contact-form";

export const ContactSection = () => {
  const { isSubmitting, handleSubmit } = useContactForm();
  
  return (
    <section id="contact" className="section-padding relative">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-20">
          <h2 className="section-title">
            Get In <span className="text-primary">Touch</span>
          </h2>
          <p className="section-subtitle">
            I welcome opportunities for collaboration and meaningful conversations. 
            Whether you have a project in mind or simply want to connect, I&apos;d love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Information */}
          <div className="space-y-12">
            <div>
              <h3 className="text-3xl font-bold mb-8 font-serif">
                Contact Information
              </h3>

              <div className="space-y-6">
                <a
                  href="mailto:keithardeelazo@gmail.com"
                  className="elegant-card-hover group flex items-start gap-6 p-6"
                >
                  <div className="p-3 rounded-sm bg-primary/10 flex-shrink-0 group-hover:bg-primary/20 transition-colors duration-300">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-foreground/60 uppercase tracking-wider mb-1">Email</p>
                    <p className="text-foreground/90 font-medium group-hover:text-primary transition-colors duration-300 break-words">
                      keithardeelazo@gmail.com
                    </p>
                  </div>
                </a>

                <a
                  href="tel:+639156938052"
                  className="elegant-card-hover group flex items-start gap-6 p-6"
                >
                  <div className="p-3 rounded-sm bg-primary/10 flex-shrink-0 group-hover:bg-primary/20 transition-colors duration-300">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-foreground/60 uppercase tracking-wider mb-1">Phone</p>
                    <p className="text-foreground/90 font-medium group-hover:text-primary transition-colors duration-300">
                      +63 915-6938-052
                    </p>
                  </div>
                </a>

                <div className="elegant-card flex items-start gap-6 p-6">
                  <div className="p-3 rounded-sm bg-primary/10 flex-shrink-0">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-foreground/60 uppercase tracking-wider mb-1">Location</p>
                    <p className="text-foreground/90 font-medium">
                      Malasiqui, Pangasinan, Philippines
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h4 className="text-xl font-semibold mb-6 font-serif">Connect With Me</h4>
              <div className="flex items-center gap-4">
                <a
                  href="https://www.linkedin.com/in/keith-ardee-lazo-3057bb29b/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-sm bg-accent/30 hover:bg-primary/10 border border-border hover:border-primary/30 transition-all duration-300 group"
                  aria-label="Connect on LinkedIn"
                >
                  <Linkedin className="h-5 w-5 text-foreground/70 group-hover:text-primary transition-colors duration-300" />
                </a>
                <a
                  href="https://www.instagram.com/rdkeytsqnv/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-sm bg-accent/30 hover:bg-primary/10 border border-border hover:border-primary/30 transition-all duration-300 group"
                  aria-label="Follow on Instagram"
                >
                  <Instagram className="h-5 w-5 text-foreground/70 group-hover:text-primary transition-colors duration-300" />
                </a>
                <a
                  href="https://github.com/keithardee"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-sm bg-accent/30 hover:bg-primary/10 border border-border hover:border-primary/30 transition-all duration-300 group"
                  aria-label="View GitHub profile"
                >
                  <Github className="h-5 w-5 text-foreground/70 group-hover:text-primary transition-colors duration-300" />
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="elegant-card">
            <h3 className="text-3xl font-bold mb-8 font-serif">Send a Message</h3>

            <form className="space-y-6" onSubmit={handleSubmit} aria-label="Contact form">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium mb-3 uppercase tracking-wider text-foreground/70"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  autoComplete="name"
                  aria-required="true"
                  aria-describedby="name-description"
                  className="w-full px-4 py-3 rounded-sm border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300 font-light"
                  placeholder="John Doe"
                />
                <span id="name-description" className="sr-only">Enter your full name</span>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-3 uppercase tracking-wider text-foreground/70"
                >
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  autoComplete="email"
                  aria-required="true"
                  aria-describedby="email-description"
                  className="w-full px-4 py-3 rounded-sm border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300 font-light"
                  placeholder="john@example.com"
                />
                <span id="email-description" className="sr-only">Enter your email address</span>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium mb-3 uppercase tracking-wider text-foreground/70"
                >
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  required
                  aria-required="true"
                  aria-describedby="message-description"
                  className="w-full px-4 py-3 rounded-sm border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300 resize-none font-light"
                  placeholder="Hello, I'd like to discuss..."
                />
                <span id="message-description" className="sr-only">Enter your message</span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={cn(
                  "elegant-button w-full flex items-center justify-center gap-3",
                  isSubmitting && "opacity-70 cursor-not-allowed"
                )}
                aria-label={isSubmitting ? "Sending message" : "Send message"}
                aria-busy={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
                <Send className="h-4 w-4" aria-hidden="true" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
