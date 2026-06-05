import type { Metadata } from "next";
import Link from "next/link";
import { COMMUNITY_KINDS } from "@/lib/constants";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Community",
  description: "Alumni, PTA, Senate, IEEE, IEDC, and NSS at CEPoonjar.",
};

export default function CommunityHubPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-brand-950">Community</h1>
      <p className="mt-3 max-w-2xl text-slate-600">
        Engage with campus bodies and associations — explore events, members, and initiatives
        for each group below.
      </p>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {COMMUNITY_KINDS.map((c) => (
          <Link key={c.href} href={c.href}>
            <Card className="h-full hover:border-brand-300">
              <CardHeader>
                <CardTitle>{c.label}</CardTitle>
                <CardDescription>Events, members, and highlights.</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
