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
        <div className="flex justify-start  ms-5 mt-9 w-1/4">
          <SideBar />
        </div>
        <div className=" flex-1 ml-[2%] ">{children}</div>
      </div>
    </main>
  );
}
