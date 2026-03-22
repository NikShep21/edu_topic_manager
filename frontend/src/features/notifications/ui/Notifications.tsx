import { Dropdown } from "@/shared/ui/dropdown";
import styles from "./Notifications.module.scss";
import { IoMdNotifications } from "react-icons/io";
export const Notifications = () => {
  return (
    <div className={styles.wrapper}>
      <Dropdown trigger={<IoMdNotifications className={styles.notifyIcon} />}>
        <div>hi</div>
      </Dropdown>
    </div>
  );
};
