import ConfigurationSteps from "@/components/ConfigurationSteps";
import FullWidthWrapper from "@/components/FullWidthWrapper";
import { ReactNode } from "react";

export default function ConfigurationLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <FullWidthWrapper className="flex flex-1 flex-col">
      <ConfigurationSteps />
      <div className="flex flex-1">{children}</div>
    </FullWidthWrapper>
  );
}
