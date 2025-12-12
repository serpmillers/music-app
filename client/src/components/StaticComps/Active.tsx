// to handle active display

import Home from "../Pages/Home";
import Browse from "../Pages/Browse";
import TaskList from "../Pages/TaskList";
import Settings from "../Pages/Settings";
import Playlist from "../Pages/Playlist";
import { AnimatePresence, motion, useReducedMotion, type Variants } from "framer-motion";

type PageType = "home" | "browse" | "task" | "settings" | "playlist";

type Props = {
  activePage: PageType;
  slideDirection?: "left" | "right" | "up" | "down";
  playlistData?: any;
  onNavigate?: (page: PageType, data?: any) => void;
};

const Active = ({ activePage, playlistData, onNavigate, slideDirection = "left" }: Props) => {
  const handlePlaylistClick = (data: any) => {
    onNavigate?.("playlist", data);
  };

  const shouldReduceMotion = useReducedMotion();

  const isVertical = slideDirection === "up" || slideDirection === "down";
  const horizontalSign = slideDirection === "right" ? -1 : 1;
  const verticalSign = slideDirection === "down" ? 1 : -1;

  const pageVariants: Variants = {
    enter: (dir: number) =>
      isVertical
        ? { y: `${dir * 100}%`, opacity: 0, scale: 0.995 }
        : { x: `${dir * 100}%`, opacity: 0, scale: 0.995 },
    center: {
      x: 0,
      y: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.36, ease: [0.2, 0.9, 0.3, 1] }
    },
    exit: (dir: number) =>
      isVertical
        ? { y: `${-dir * 100}%`, opacity: 0, scale: 0.995, transition: { duration: 0.28, ease: [0.2, 0.9, 0.3, 1] } }
        : { x: `${-dir * 100}%`, opacity: 0, scale: 0.995, transition: { duration: 0.28, ease: [0.2, 0.9, 0.3, 1] } }
  };

  const pageKey = activePage === "playlist" ? `playlist-${playlistData?.id ?? "unknown"}` : activePage;

  return (
    <div className="flex flex-col grow component min-h-0 relative overflow-hidden animate-fade-in">
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={pageKey}
          custom={isVertical ? verticalSign : horizontalSign}
          variants={pageVariants}
          initial={shouldReduceMotion ? { opacity: 1, x: 0, y: 0 } : "enter"}
          animate={shouldReduceMotion ? { opacity: 1, x: 0, y: 0 } : "center"}
          exit={shouldReduceMotion ? { opacity: 1, x: 0, y: 0 } : "exit"}
          style={{ position: "relative", width: "100%", height: "100%" }}
        >
          {activePage === "home" && (
            // to handle task item clicks in home page
            <Home
              onPlaylistClick={handlePlaylistClick}
              navigateTo={onNavigate}
            />
          )}
          {activePage === "browse" && <Browse onPlaylistClick={handlePlaylistClick} />}
          {activePage === "task" && <TaskList />}
          {activePage === "settings" && <Settings />}
          {activePage === "playlist" && <Playlist playlistData={playlistData} />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Active;
