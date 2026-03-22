import { RxHamburgerMenu } from "react-icons/rx";
import styles from "./Header.module.scss";
interface HeaderProps {
  title: string;
  onOpenSidebar: () => void;
}
export const Header = ({ title, onOpenSidebar }: HeaderProps) => {
  return (
    <header className={styles.header}>
      <button onClick={onOpenSidebar} className={styles.burger}>
        <RxHamburgerMenu size={25} />
      </button>
      <h2 className={styles.textHeader}>{title}</h2>
    </header>
  );
};
