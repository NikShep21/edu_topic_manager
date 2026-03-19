"use client";

import Link from "next/link";
import styles from "./Sidebar.module.scss";
import { PiStudentFill } from "react-icons/pi";
import { RxHamburgerMenu } from "react-icons/rx";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { NavLink } from "@/shared/ui/nav-link";
import { BREAKPOINTS } from "@/shared/config/breakpoints";
import { useMediaQuery } from "@/shared/hooks/useMediaQuery";

interface Props {
  nav: {
    name: string;
    href: string;
  }[];
}
export const Sidebar = ({ nav }: Props) => {
  const pathName = usePathname();
  const { width: widthScreen } = useMediaQuery();
  console.log(widthScreen);
  const [activeSidebar, setActiveSidebar] = useState<boolean>(
    widthScreen > BREAKPOINTS.tablet,
  );

  useEffect(() => {
    setActiveSidebar(widthScreen > BREAKPOINTS.tablet);
  }, [widthScreen]);

  const toggleSidebar = () => {
    setActiveSidebar(!activeSidebar);
  };

  return (
    <>
      <button
        onClick={toggleSidebar}
        style={{ display: widthScreen > BREAKPOINTS.tablet ? "none" : "block" }}
        className={styles.hamburgerHeader}
      >
        <RxHamburgerMenu size={30} />
      </button>
      <div
        className={clsx(styles.sidebar, {
          [styles.sidebarClose]: !activeSidebar,
        })}
      >
        <div className={styles.sidebarContainer}>
          <div className={styles.header}>
            <Link className={styles.logoLink} href="/">
              <PiStudentFill size={50} />
              <h1 className={styles.logoText}>MyApp</h1>
            </Link>
            <button
              onClick={toggleSidebar}
              style={{ display: widthScreen > BREAKPOINTS.tablet ? "none" : "block" }}
              className={styles.hamburgerSideBar}
            >
              <RxHamburgerMenu size={30} />
            </button>
          </div>
          <main className={styles.content}>
            <nav>
              <ul className={styles.navList}>
                {nav.map((item, index) => {
                  console.log(item.href, pathName);
                  return (
                    <li key={index}>
                      <NavLink isActive={item.href === pathName} href={item.href}>
                        {item.name}
                      </NavLink>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </main>
        </div>
      </div>
    </>
  );
};
