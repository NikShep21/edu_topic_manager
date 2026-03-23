import LayoutShell from "@/app/teacher/_providers/LayoutShell";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  // await requireAccess("teacher")

  return <LayoutShell>{children}</LayoutShell>;
};

export default Layout;
