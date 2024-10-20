import Sidebar from '@/components/Sidebar/sidebar';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen">
      <Sidebar>
        {children}
      </Sidebar>
    </div>
  );
};

export default MainLayout;
