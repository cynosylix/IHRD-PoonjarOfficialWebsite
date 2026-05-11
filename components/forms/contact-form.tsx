"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { siteSettings } from "@/data/site-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  subject: z.string().optional(),
  message: z.string().min(10),
});

type FormValues = z.infer<typeof schema>;

function buildMailto(values: FormValues) {
  const to = siteSettings.emails[0] ?? "office@cepoonjar.ac.in";
  const subject = encodeURIComponent(values.subject || "Website contact");
  const body = encodeURIComponent(
    `Name: ${values.name}\nEmail: ${values.email}\nPhone: ${values.phone || "-"}\n\n${values.message}`,
  );
  return `mailto:${to}?subject=${subject}&body=${body}`;
}

export function ContactForm() {
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  });

  function onSubmit(values: FormValues) {
    window.location.href = buildMailto(values);
    toast.message("Opening your email app…", {
      description: "Send the message from your mail client.",
    });
    form.reset();
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input id="name" className="mt-1" {...form.register("name")} />
          {form.formState.errors.name && (
            <p className="mt-1 text-xs text-red-600">
              {form.formState.errors.name.message}
            </p>
          )}
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" className="mt-1" {...form.register("email")} />
          {form.formState.errors.email && (
            <p className="mt-1 text-xs text-red-600">
              {form.formState.errors.email.message}
            </p>
          )}
        </div>
      </div>
      <div>
        <Label htmlFor="phone">Phone (optional)</Label>
        <Input id="phone" className="mt-1" {...form.register("phone")} />
      </div>
      <div>
        <Label htmlFor="subject">Subject (optional)</Label>
        <Input id="subject" className="mt-1" {...form.register("subject")} />
      </div>
      <div>
        <Label htmlFor="message">Message</Label>
        <Textarea id="message" rows={5} className="mt-1" {...form.register("message")} />
        {form.formState.errors.message && (
          <p className="mt-1 text-xs text-red-600">
            {form.formState.errors.message.message}
          </p>
        )}
      </div>
      <Button type="submit">Open in email app</Button>
    </form>
  );
}
