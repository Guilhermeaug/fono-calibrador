import { Navbar } from "@/components/nav-bar";
import * as React from "react";

type Props = {
  children: React.ReactNode;
};

export default function ContentLayout({ children }: Props) {
  return (
    <React.Fragment>
      <Navbar />
      <div className="relative flex-grow">{children}</div>
    </React.Fragment>
  );
}
