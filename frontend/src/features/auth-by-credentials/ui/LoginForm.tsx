import { Input } from "@/shared/ui/input";
import styles from "./LoginForm.module.scss";
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { Button } from "@/shared/ui/button";
import { PasswordInput } from "@/shared/ui/password-input";
export const LoginForm = () => {
  return (
    <div className={styles.formContainer}>
      <h1 className={styles.title}>Вход в систему</h1>
      <p className={styles.titleDescription}>Введите логин и пароль для продолжения</p>
      <form className={styles.form} action="#">
        <Input startContent={<FaUser size={20} />} placeholder="Логин" />
        <PasswordInput startContent={<FaLock size={20} />} placeholder="Пароль" />
        <div className={styles.options}>
          <label className={styles.checkbox}>
            <input className={styles.checkboxInput} type="checkbox" />
            <span>Запомнить меня</span>
          </label>
          <a href="#" className={styles.forgotLink}>
            Забыли пароль?
          </a>
        </div>
        <Button className={styles.loginButton}>Войти</Button>
        <p className={styles.description}>Учетчые записи создаются администратором</p>
      </form>
    </div>
  );
};
