import { RxHamburgerMenu } from "react-icons/rx";
import styles from "./Header.module.scss";
import { Dropdown } from "@/shared/ui/dropdown";
import { IoMdSettings } from "react-icons/io";
import { ToggleTheme } from "@/features/toggle-theme";
import { Notifications } from "@/features/notifications";
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
      <div className={styles.actions}>
        <ToggleTheme />
        <Notifications />
        <Dropdown
          placement={"bottom-left"}
          trigger={<IoMdSettings className={styles.settingsIcon} />}
        >
          <div className={styles.DropdownSettings}>
            <p>Nothing</p>
          </div>
        </Dropdown>
      </div>
    </header>
  );
};
