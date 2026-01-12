import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export function useContactForm() {
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
         const FALLBACK_API = 'https://keithardeegithubio-production.up.railway.app';
         const envApi = import.meta.env.VITE_API_URL;
         const isLocalHost = typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
         const apiBase = envApi || (isLocalHost ? 'http://localhost:4000' : FALLBACK_API);
         const primaryUrl = `${apiBase.replace(/\/$/, '')}/api/contact`;

         let res;
         try {
         res = await fetch(primaryUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, message }),
         });

         if (!res.ok) {
            const err = await res.json().catch(() => ({}));
            const e = new Error(err.error || 'Failed to send message');
            e.detail = err.detail || null;
            throw e;
         }
         } catch (primaryErr) {
         console.warn('Primary API failed, trying fallback:', primaryErr.message || primaryErr);
         const fallbackUrl = `${FALLBACK_API}/api/contact`;

         res = await fetch(fallbackUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, message }),
         });

         if (!res.ok) {
            const err = await res.json().catch(() => ({}));
            const e = new Error(err.error || 'Failed to send message');
            e.detail = err.detail || null;
            throw e;
         }
         }

         toast({ title: 'Message sent!', description: "Thank you for your message. I'll get back to you soon." });
         form.reset();
      } catch (err) {
         console.error(err);
         const desc = err && (err.detail || err.message) ? (err.detail || err.message) : 'Failed to send message';
         toast({ title: 'Error', description: desc });
      } finally {
         setIsSubmitting(false);
      }
   };

   return { isSubmitting, handleSubmit };
}

export default useContactForm;
