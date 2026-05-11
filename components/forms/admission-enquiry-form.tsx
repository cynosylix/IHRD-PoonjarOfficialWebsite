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
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email required"),
  phone: z.string().min(8, "Phone is required"),
  programInterest: z.string().min(2, "Select or describe programme"),
  message: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

export function AdmissionEnquiryForm() {
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      programInterest: "",
      message: "",
    },
  });

  function onSubmit(values: FormValues) {
    const to = siteSettings.emails[0] ?? "office@cepoonjar.ac.in";
    const subject = encodeURIComponent(
      `Admission enquiry — ${values.programInterest}`,
    );
    const body = encodeURIComponent(
      `Name: ${values.name}\nEmail: ${values.email}\nPhone: ${values.phone}\nProgramme: ${values.programInterest}\n\n${values.message ?? ""}`,
    );
    window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
    toast.message("Opening your email app…");
    form.reset();
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label htmlFor="name">Full name</Label>
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
      <div>
        <Label htmlFor="phone">Phone</Label>
        <Input id="phone" className="mt-1" {...form.register("phone")} />
        {form.formState.errors.phone && (
          <p className="mt-1 text-xs text-red-600">
            {form.formState.errors.phone.message}
          </p>
        )}
      </div>
      <div>
        <Label htmlFor="programInterest">Programme of interest</Label>
        <Input
          id="programInterest"
          placeholder="e.g. B.Tech CSE, MCA, Diploma"
          className="mt-1"
          {...form.register("programInterest")}
        />
        {form.formState.errors.programInterest && (
          <p className="mt-1 text-xs text-red-600">
            {form.formState.errors.programInterest.message}
          </p>
        )}
      </div>
      <div>
        <Label htmlFor="message">Message (optional)</Label>
        <Textarea id="message" className="mt-1" {...form.register("message")} />
      </div>
      <Button type="submit">Open in email app</Button>
    </form>
  );
}
