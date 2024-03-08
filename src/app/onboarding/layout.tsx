 
import Navbar from "@/components/navbar";
import SideBar from "@/components/sidebar/sidebar";
import UserAuthWrapper from "@/layouts/auth-layout/auth-wrapper";

export default function AuthenticationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    
    <main>
      <Navbar />

      <div className="flex min-h-[80vh] ">
        <div className="flex justify-start  ms-5 mt-9 w-1/4">
          <SideBar />
        </div>
        <div className="bg-red flex-1 ml-[2%] ">{children}</div>
      </div>
    </main>
     
  );
}
