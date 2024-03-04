import { Button } from "@/components/ui/button";
import { LayoutGrid, LucideIcon } from "lucide-react";
import React, { FC } from "react";

type Props = {
  icon: LucideIcon;
  title: string
};
const WorkSpaceHeader: FC<Props> = (props) => {
  const { icon: HeaderIcon, title } = props;
  return (
    <div className="relative z-[15] flex h-[3.75rem] w-full flex-shrink-0 flex-row items-center justify-between gap-x-2 gap-y-4 border-b p-4 ">
      {/* display of current sidebar text and icons starts on left-side */}
      <div className="flex items-center gap-2 overflow-ellipsis whitespace-nowrap">
        {/* for icon  */}
        <div className=" flex flex-wrap items-center gap-2.5">
          <div className="flex cursor-default items-center gap-1 text-sm font-medium ">
            <div className="iconflex h-6 w-6 items-center justify-center overflow-hidden">
              <HeaderIcon />
            </div>
            <div className="relative line-clamp-1 block max-w-[150px] overflow-hidden truncate">
              {title}
            </div>
          </div>
        </div>
      </div>
      {/* display of current sidebar text and icons ends  */}
      {/* right-side of the header starts  */}
      <div className="flex items-center gap-3 px-2">
        <a
          href="#"
          className="flex flex-shrink-0  flex-row items-center gap-1.5 rounded bg-slate-200 px-3 hover: hover:bg-zinc-50   py-1.5"
        >
          <span className="hidden text-xs font-medium sm:hidden md:block">
           { title == 'Projects' && (
            <Button size="sm">
              +Add Project
            </Button>
           )}
          </span>
        </a>
        <a
          href=""
          className="flex flex-shrink-0 flex-row items-center gap-1.5  bg-slate-200 hover:bg-zinc-50   rounded px-3 py-1.5"
        >
          <span className="hidden text-xs font-medium sm:hidden md:block">
           
          </span>
        </a>
      </div>
      {/* right-side of the header starts  */}
    </div>
  );
};

export default WorkSpaceHeader;
