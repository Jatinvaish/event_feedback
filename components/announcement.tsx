import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { ArrowRightIcon } from "lucide-react";

export function Announcement() {
  return (
    <Link
      href="/"
      className="inline-flex items-center rounded-lg bg-muted px-3 py-1 text-sm font-medium"
    >
      🎉 <Separator className="mx-2 h-4" orientation="vertical" />{" "}
      <span className="">Introducing </span>
      {/* <ArrowRightIcon className="ml-1 h-4 w-4" /> */}
    </Link>
  );
}
