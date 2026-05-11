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
  name: z.string().optional(),
  email: z.string().email().optional().or(z.literal("")),
  rollNo: z.string().optional(),
  department: z.string().optional(),
  message: z.string().min(10, "Please provide at least 10 characters"),
});

type FormValues = z.infer<typeof schema>;

export function FeedbackPageForm({
  formKey,
  title,
}: {
  formKey: string;
  title: string;
}) {
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      rollNo: "",
      department: "",
      message: "",
    },
  });

  function onSubmit(values: FormValues) {
    const to = siteSettings.emails[0] ?? "office@cepoonjar.ac.in";
    const subject = encodeURIComponent(`[${formKey}] ${title}`);
    const lines = [
      `Form: ${formKey}`,
      values.name && `Name: ${values.name}`,
      values.email && `Email: ${values.email}`,
      values.rollNo && `Register no.: ${values.rollNo}`,
      values.department && `Department: ${values.department}`,
      "",
      values.message,
    ].filter(Boolean);
    const body = encodeURIComponent(lines.join("\n"));
    window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
    toast.message("Opening your email app…");
    form.reset();
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="name">Name (optional)</Label>
          <Input id="name" className="mt-1" {...form.register("name")} />
        </div>
        <div>
          <Label htmlFor="email">Email (optional)</Label>
          <Input id="email" type="email" className="mt-1" {...form.register("email")} />
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="rollNo">Register number (optional)</Label>
          <Input id="rollNo" className="mt-1" {...form.register("rollNo")} />
        </div>
        <div>
          <Label htmlFor="department">Department (optional)</Label>
          <Input id="department" className="mt-1" {...form.register("department")} />
        </div>
      </div>
      <div>
        <Label htmlFor="message">Message</Label>
        <Textarea id="message" className="mt-1" rows={5} {...form.register("message")} />
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
