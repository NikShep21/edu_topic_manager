import clsx from "clsx";
import styles from "./MyLink.module.scss";
import Link, { LinkProps } from "next/link";
import { PropsWithChildren } from "react";

interface NavLinkProps extends LinkProps, PropsWithChildren {
  className?: string;
  isActive?: boolean;
}
export const NavLink = ({
  children,
  className,
  isActive = false,
  href,
  ...props
}: NavLinkProps) => {
  return (
    <Link
      {...props}
      className={clsx(styles.link, className, { [styles.activeLink]: isActive })}
      href={href}
    >
      {children}
    </Link>
  );
};
