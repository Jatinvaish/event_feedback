import React from "react";
import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "./page-header";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Announcement } from "../announcement";
export default function Hero() {
  return (
    <div className="relative container">
      <PageHeader>
        <Announcement />
        <PageHeaderHeading className="md:block">
          Feedback Management
        </PageHeaderHeading>
        <PageHeaderDescription>
          A Feedback Management System is essential for organizations aiming to foster a culture of continuous improvement and responsiveness to user need.
        </PageHeaderDescription>
        <PageActions>
          <Link
            href="/register"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "rounded-[6px]"
            )}
          >
            Register
          </Link>
          <Link href="/login" className={cn(buttonVariants(), "rounded-[6px]")}>
            Login
          </Link>
        </PageActions>
      </PageHeader>
    </div>
  );
}
