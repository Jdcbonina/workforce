type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <main className="grid h-auto min-h-[calc(100dvh-128px)] place-items-center">
        {children}
      </main>
    </>
  );
};

export default Layout;
