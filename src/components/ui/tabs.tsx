import { ReactNode, useState, useRef, useEffect, useMemo } from "react";
import { cn } from "@/lib/utils";

interface TabsProps {
  /**
   * list of menus in exact order they will appear
   */
  menus: string[];
  children?: ReactNode[];
}

export const Tabs = ({ menus, children }: TabsProps) => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [widths, setWidths] = useState<number[]>();

  const divref = useRef<HTMLDivElement>(null);

  /**
   * useEffect to get the widths of the each tabs menu
   */
  useEffect(() => {
    const widths = Array.from(divref.current?.children || []).map(
      (e) => (e as HTMLElement).clientWidth,
    );
    setWidths(widths.slice(0, widths.length - 1));
  }, []);

  const margin = useMemo(() => {
    return widths?.slice(0, activeTab).reduce((acc, curr) => acc + curr, 0);
  }, [activeTab,widths]);

  return (
    <div>
      <div
        className="relative flex w-full border-b border-r border-zinc-400 dark:border-zinc-600"
        ref={divref}
      >
        {menus.map((e, index) => (
         
            <button
              key={index}
              className={cn(
                "flex-grow min-w-24 px-4 py-2 font-medium capitalize text-zinc-500 transition-colors dark:text-zinc-400",
                index === activeTab
                  ? "text-blue-500 dark:text-blue-500"
                  : "hover:text-gray-900 hover:dark:text-zinc-300",
              )}
              onClick={() => setActiveTab(index)}
            >
              {e}
            </button>
          
        ))}
        <div
          className={cn("absolute bottom-0 left-0 -mb-[1px] h-0.5 bg-blue-500 transition-all duration-300")}
          style={{ width: `${widths?.[activeTab]}px` , marginLeft: `${margin}px`}}
        />
      </div>
      <div>
        {children?.map((content, index) => (
          <div
            key={index}
            className={`w-full ${index === activeTab ? "block" : "hidden"}`}
          >
            <TabContent>{content}</TabContent>
          </div>
        ))}
      </div>
    </div>
  );
};

export const TabContent = ({ children }: { children: ReactNode }) => {
  return <>{children}</>;
};

export default Tabs;
