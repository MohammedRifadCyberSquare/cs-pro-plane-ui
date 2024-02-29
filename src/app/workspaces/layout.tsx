import Navbar from "@/components/navbar";
import SideBar from "@/components/sidebar/sidebar";
import WorkSpaceProjects from "./_components/projects";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <Navbar />

      <div className="flex min-h-[80vh] ">
        <div className="flex justify-center w-1/4">
        <div className="flex h-[70vh] mt-4 ml-20">
      <div className="text-center">
          <SideBar />
          <div>
          <WorkSpaceProjects />
        
          </div>
        
        </div >
        </div>
        </div>
        <div className="bg-red flex-1 ml-[2%] ">{children}</div>
        
      </div>
    </main>

  );
}
