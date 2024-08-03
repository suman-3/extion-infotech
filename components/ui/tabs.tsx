"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface Tab {
  title: string;
  value: string;
  content: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  containerClassName?: string;
  activeTabClassName?: string;
  tabClassName?: string;
  contentClassName?: string;
}

interface FadeInDivProps {
  className?: string;
  activeTab: Tab;
  hovering: boolean;
}

export const Tabs: React.FC<TabsProps> = ({
  tabs: propTabs,
  containerClassName,
  activeTabClassName,
  tabClassName,
  contentClassName,
}) => {
  const [active, setActive] = useState<Tab>(propTabs[0]);
  const [tabs, setTabs] = useState<Tab[]>(propTabs);

  const moveSelectedTabToTop = (idx: number) => {
    const newTabs = [...propTabs];
    const selectedTab = newTabs.splice(idx, 1);
    newTabs.unshift(selectedTab[0]);
    setTabs(newTabs);
    setActive(newTabs[0]);
  };

  const [hovering, setHovering] = useState<boolean>(false);

  return (
    <>
      <div
        className={cn(
          "flex flex-row items-center justify-center overflow-auto sm:overflow-visible no-visible-scrollbar max-w-full w-full h-full",
          containerClassName
        )}
      >
        {propTabs.map((tab, idx) => (
          <button
            key={tab.title}
            onClick={() => {
              moveSelectedTabToTop(idx);
            }}
            className={cn("relative px-2.5 py-2 rounded-full", tabClassName)}
            style={{
              transformStyle: "preserve-3d",
            }}
          >
            {active.value === tab.value && (
              <motion.div
                layoutId="clickedbutton"
                transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
                className={cn(
                  "absolute inset-0 bg-zinc-800 rounded-full",
                  activeTabClassName
                )}
              />
            )}
            <span
              id="team"
              className="relative block text-white"
            >
              {tab.title}
            </span>
          </button>
        ))}
      </div>
     <div className="w-full h-full">
 <FadeInDiv
        activeTab={active}
        hovering={hovering}
        className={cn("mt-10 lg:mt-15", contentClassName)}
      />
     </div>
    </>
  );
};

export const FadeInDiv: React.FC<FadeInDivProps> = ({ className, activeTab, hovering }) => {
  return (
    <div className="relative w-full h-full">
      <motion.div
        key={activeTab.value}
        layoutId={activeTab.value}
        style={{
          scale: 1,
          top: hovering ? -50 : 0,
          zIndex: 0,
          opacity: 1,
        }}
        animate={{
          y: [0, 40, 0],
        }}
        className={cn(
          "w-full h-auto  px-3 lg:px-0",
          className
        )}
      >
        {activeTab.content}
      </motion.div>
    </div>
  );
};
