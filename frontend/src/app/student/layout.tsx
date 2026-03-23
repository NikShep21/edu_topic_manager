import LayoutShell from "@/app/student/_providers/LayoutShell";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  // await requireAccess("student")

  return <LayoutShell>{children}</LayoutShell>;
};

export default Layout;
