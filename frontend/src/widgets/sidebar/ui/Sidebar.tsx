"use client";

import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { RxCross2 } from "react-icons/rx";
import { PiStudentFill } from "react-icons/pi";

import styles from "./Sidebar.module.scss";
import { NavLink } from "@/shared/ui/nav-link";
import type { SidebarNavItem } from "../model/types";
import { UserBadge } from "@/entities/user";

interface SidebarProps {
  nav: SidebarNavItem[];
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar = ({ nav, isOpen, onClose }: SidebarProps) => {
  const pathname = usePathname();

  return (
    <>
      <button
        type="button"
        className={clsx(styles.overlay, {
          [styles.overlayVisible]: isOpen,
        })}
        onClick={onClose}
        aria-label="Close sidebar overlay"
      />

      <aside
        className={clsx(styles.sidebar, {
          [styles.sidebarOpen]: isOpen,
        })}
        aria-label="Sidebar"
      >
        <div className={styles.topPart}>
          <div className={styles.sidebarHeader}>
            <Link className={styles.logoLink} href="/">
              <PiStudentFill className={styles.logoIcon} />
              <span className={styles.logoText}>MyApp</span>
            </Link>

            <button
              type="button"
              className={styles.closeButton}
              onClick={onClose}
              aria-label="Close sidebar"
            >
              <RxCross2 />
            </button>
          </div>

          <div className={styles.sidebarBody}>
            <nav className={styles.nav} aria-label="Main navigation">
              <ul className={styles.navList}>
                {nav.map((item) => {
                  const Icon = item.icon;
                  const isActive =
                    pathname === item.href || pathname.startsWith(`${item.href}/`);

                  return (
                    <li key={item.href} className={styles.navItem}>
                      <NavLink isActive={isActive} href={item.href}>
                        <span className={styles.navLinkInner}>
                          {Icon && <Icon className={styles.navIcon} />}
                          <span>{item.name}</span>
                        </span>
                      </NavLink>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>
        </div>
        <div className={styles.bottomPart}>
          <div className={styles.sidebarFooter}>
            <UserBadge firstName={"Лев"} lastName={"Клименко"} role="Admin" />
          </div>
        </div>
      </aside>
    </>
  );
};
