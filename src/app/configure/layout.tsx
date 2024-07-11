import ConfigurationSteps from "@/components/ConfigurationSteps";
import { ReactNode } from "react";

export default function ConfigurationLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <ConfigurationSteps />
      {children}
    </>
  );
}
