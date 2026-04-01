"use client";
import { IoLogOut } from "react-icons/io5";
import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { RxCross2 } from "react-icons/rx";
import { PiStudentFill } from "react-icons/pi";
import { CgProfile } from "react-icons/cg";
import styles from "./Sidebar.module.scss";
import { NavLink } from "@/shared/ui/nav-link";
import type { SidebarNavItem } from "../model/types";
import { UserBadge, type UserData } from "@/entities/user";
import { Dropdown, DropdownMenu, DropdownMenuItem } from "@/shared/ui/dropdown";
import { useLogout } from "@/features/logout";

interface SidebarProps {
  nav: SidebarNavItem[];
  isOpen: boolean;
  onClose: () => void;
  userData?: UserData;
}

export const Sidebar = ({ nav, isOpen, onClose, userData }: SidebarProps) => {
  const pathname = usePathname();
  const { logout, isPending } = useLogout();
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
            <Dropdown
              placement="top-center"
              className={styles.userDropdown}
              trigger={
                <button
                  type="button"
                  className={styles.userButton}
                  aria-label="User menu"
                >
                  <UserBadge userData={userData} />
                </button>
              }
            >
              <DropdownMenu>
                <DropdownMenuItem icon={<CgProfile size={17} />}>
                  Профиль
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={logout}
                  disabled={isPending}
                  icon={<IoLogOut size={17} />}
                  danger
                >
                  Выйти
                </DropdownMenuItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
      </aside>
    </>
  );
};
