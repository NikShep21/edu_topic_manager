interface LayoutProps {
  children: React.ReactNode;
}
const layout = async ({ children }: LayoutProps) => {
  // await requireAccess("guest")
  return <>{children}</>;
};

export default layout;
