import FullWidthWrapper from "./FullWidthWrapper";

export default function Footer() {
  return (
    <footer className="h-20 border-t bg-background py-4">
      <FullWidthWrapper className="flex h-full flex-col items-center justify-between gap-4 md:flex-row">
        <p className="text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} All rights reserved
        </p>
        <div className="flex gap-5 text-center text-sm text-muted-foreground">
          <p>Terms of Service</p>
          <p>Privacy Policy</p>
          <p>Help and FAQ</p>
        </div>
      </FullWidthWrapper>
    </footer>
  );
}
