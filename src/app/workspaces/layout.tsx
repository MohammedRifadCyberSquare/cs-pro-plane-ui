import Navbar from "@/components/navbar";
import SideBar from "@/components/sidebar/sidebar";
import WorkSpaceProjects from "./_components/projects";
import { RouteList } from "@/constants/sidebar";
import DashboardComponent from "./_components/dashboard";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const route = RouteList;
  return (
   <>
      <div className="h-screen w-full overflow-hidden">
        <div className="relative flex h-screen w-full overflow-hidden">
          {/* Leftside section starts here */}
          <div
            className="inset-y-0 z-20 flex h-full flex-shrink-0 flex-grow-0 flex-col border-r  duration-300
          fixed md:relative        
          bg-slate-50
        sm:
        md:ml-0 w-[280px]
        lg:ml-0 w-[280px]
      "
          >
            <div className="flex h-full w-full flex-1 flex-col">
              <div className="flex items-center gap-x-3 gap-y-2 px-4 pt-4">
                <div className="relative h-full flex-grow truncate text-left">
                  <button
                    className="group/menu-button h-full w-full truncate rounded-md text-sm font-medium  hover:bg-slate-200 focus:outline-none"
                    type="button"
                    aria-haspopup="menu"
                    aria-expanded="false"
                  >
                    <div className="flex items-center  gap-x-2 truncate rounded p-1 justify-between">
                      <div className="flex items-center gap-2  truncate">
                        <div className="relative grid h-6 w-6 flex-shrink-0 place-items-center uppercase rounded bg-blue-500 text-white">
                          R
                        </div>
                        <h4 className="truncate text-base font-medium text-zinc-900">
                          {" "}
                          NAME
                        </h4>
                      </div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        className="lucide lucide-chevron-down mx-1 hidden h-4 w-4 flex-shrink-0 group-hover/menu-button:block "
                      >
                        <path d="m6 9 6 6 6-6"></path>
                        <path d="m6 9 6 6 6-6"></path>
                      </svg>
                    </div>
                  </button>
                </div>

                {/* left name style ends  here */}
                {/* right name style starts here  */}
                <div className="relative flex-shrink-0 rounded">
                  <button
                    className="grid place-items-center outline-none rounded bg-blue-500 text-white"
                    type="button"
                    aria-haspopup="menu"
                    aria-expanded="false"
                  >
                    <div
                      className=" grid place-items-center overflow-hidden rounded"
                      style={{ height: "24px", width: "24px" }}
                    >
                      <div className="text-xs grid h-full w-full place-items-center uppercase rounded">
                        E
                      </div>
                    </div>
                  </button>
                </div>
              </div>
              {/* right name style ends  here  */}

              {/* new issue style starts here  */}

              <div className="mt-4 flex w-full cursor-pointer items-center justify-between px-4 gap-2">
                <div className="relative flex w-full cursor-pointer items-center justify-between gap-1 rounded px-2 border-[0.5px] shadow">
                  <button
                    className="relative flex flex-shrink-0 flex-grow items-center gap-2 rounded py-1.5 outline-none "
                    type="button"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      className="lucide lucide-pen-square h-4 w-4 "
                    >
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                      <path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4Z"></path>
                    </svg>
                    <span className="text-sm font-medium">New Issue</span>
                  </button>
                </div>

                <button className="flex flex-shrink-0 items-center rounded p-2 gap-2 outline-none justify-center border-[0.5px] shadow">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="lucide lucide-search h-4 w-4"
                  >
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.3-4.3"></path>
                  </svg>
                </button>
              </div>

              {/* new issue style ends here  */}

              {/* sidebar component starts here  */}
              <div className="w-full cursor-pointer space-y-2 p-4">
                <SideBar />
              </div>
              {/* sidebar component endds here  */}

              {/* workspace_project starts here  */}
              <div className="h-full space-y-2 overflow-y-auto px-4 scrollbar-md" >
                <WorkSpaceProjects />
              </div>

              {/* workspace_project starts here  */}

              {/* pacing_logo starts here  */}
              <div className="flex w-full items-center justify-between gap-1 self-baseline border-t  px-4 py-2 ">
                <div className=" bg-transparent border-2 hover:bg-slate-200 focus:text-gray-200  flex items-center gap-1.5 whitespace-nowrap transition-all justify-center w-1/2 cursor-pointer rounded-2xl px-2.5 py-1.5 text-center text-sm font-medium outline-none">
                  {/* <Navbar/>  */}
                  CS Pro Logo
                </div>
              </div>
              {/* pacing_logo ends here  */}
            </div>
          </div>
          {/* Leftside section ends here */}
          {/* Rightside section stars here */}
          <div className="relative flex h-full w-full flex-col overflow-hidden scrollbar-md">
          <DashboardComponent />
          </div>
          
          {/* Rightside section ends here */}
        </div>
      </div>
      {/* <div className="bg-red flex-1 ml-[2%] ">{children}</div> */}
    </>
  );
}


  