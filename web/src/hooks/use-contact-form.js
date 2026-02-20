import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import emailjs from '@emailjs/browser';

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

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
         toast({ title: "Invalid email", description: "Please enter a valid email address." });
         return;
      }

      setIsSubmitting(true);

      try {
         // EmailJS configuration - get these from your EmailJS dashboard
         const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
         const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
         const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

         // Validate EmailJS configuration
         if (!serviceId || !templateId || !publicKey) {
            throw new Error('Contact form is not configured. Please contact me directly at keithardeelazo@gmail.com');
         }

         // Initialize EmailJS with your public key
         emailjs.init(publicKey);

         // Send email using EmailJS
         const response = await emailjs.send(
            serviceId,
            templateId,
            {
               from_name: name,
               from_email: email,
               message: message,
               to_email: 'keithardeelazo@gmail.com', // Your Gmail address
               reply_to: email,
            },
            publicKey
         );

         if (response.status === 200) {
            toast({ 
               title: 'Message sent!', 
               description: "Thank you for your message. I'll get back to you soon." 
            });
            form.reset();
         } else {
            throw new Error('Failed to send message');
         }
      } catch (err) {
         console.error('EmailJS error:', err);
         // User-friendly error messages
         let errorMessage = 'Unable to send message. Please try again later.';
         
         if (err.message && err.message.includes('not configured')) {
            errorMessage = 'Contact form is not configured. Please email me directly at keithardeelazo@gmail.com';
         } else if (err.text) {
            // EmailJS specific errors
            errorMessage = 'Failed to send message. Please try again or contact me directly at keithardeelazo@gmail.com';
         } else if (err.message && !err.message.includes('environment variables')) {
            // Only show non-technical error messages
            errorMessage = err.message;
         }
         
         toast({ 
            title: 'Unable to send', 
            description: errorMessage 
         });
      } finally {
         setIsSubmitting(false);
      }
   };

   return { isSubmitting, handleSubmit };
}

export default useContactForm;
