import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { motion, cubicBezier } from "framer-motion";

import { Icon } from "@iconify/react/dist/iconify.js";
import { routes } from "@/Routes/Route";

interface HomeTypes {
  /**
   * Variable that watches if darkmode is enabled.
   */
  dark: boolean;
  /**
   * Function that changes the theme.
   */
  changeTheme: () => void;
}

const Home = ({ dark, changeTheme }: HomeTypes) => {
  // ri:moon-fill
  return (
    <div className="h-screen bg-white p-4 py-8 transition-colors dark:bg-zinc-900 md:p-36 md:py-12">
      <div className="flex justify-between">
        <h1 className="mb-6 flex space-x-4 text-3xl font-black capitalize text-black dark:text-white xl:text-6xl">
          <span>My testing ground</span>
          <Icon icon={"simple-icons:typescript"} className=" text-blue-500 " />
        </h1>
        <button className="text-2xl" onClick={changeTheme}>
          <>
            {dark ? (
              <motion.div
                key={"moon"}
                initial={{ rotate: 90, scale: 0 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{
                  duration: 0.15,
                  ease: cubicBezier(0.4, 0, 0.2, 1),
                }}
                exit={{ rotate: -90, scale: 0 }}
                className="absolute right-6 flex items-center justify-center min-[600px]:right-12 md:right-32"
                // className="rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
              >
                <Icon icon={"ph:moon-light"} className="text-zinc-200" />
              </motion.div>
            ) : (
              <motion.div
                key={"sun"}
                initial={{ rotate: 90, scale: 0 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{
                  duration: 0.15,
                  ease: cubicBezier(0.4, 0, 0.2, 1),
                }}
                exit={{ rotate: -90, scale: 0 }}
                className="absolute right-6 flex items-center justify-center min-[600px]:right-12 md:right-32"
              >
                <Icon icon={"radix-icons:sun"} className="text-zinc-700" />
              </motion.div>
            )}
            {/* {dark ? (
            <Icon icon={"ph:moon-light"} className="text-zinc-200" />
          ) : (
            <Icon icon={"radix-icons:sun"} className="text-zinc-700" />
          )} */}
          </>
        </button>
      </div>
      <ul className="list-inside list-disc">
        {routes.map((e) => (
          <li className="flex items-center space-x-2">
            <div
              className={cn(
                "mx-1 size-2 rounded-full",
                dark ? "bg-white" : "bg-black",
              )}
            />
            <Link
              className="text-zinc-500 transition-all hover:text-blue-600 dark:text-zinc-400"
              to={e.path}
            >
              {e.name}
            </Link>

            <Icon
              icon={"tabler:link"}
              className="text-zinc-400 dark:text-zinc-500"
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
