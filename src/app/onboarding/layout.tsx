import Navbar from "@/components/navbar";
import SideBar from "@/components/sidebar/sidebar";

export default function AuthenticationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <Navbar />

      <div className="flex min-h-[80vh] ">
        <div className="flex justify-center w-1/4">
          {/* <SideBar /> */}
        </div>
        <div className="bg-red flex-1 ml-[2%] ">{children}</div>
      </div>
    </main>
  );
}
