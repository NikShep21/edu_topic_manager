import type { InputHTMLAttributes } from "react";
import { IoIosSearch } from "react-icons/io";
import { Input } from "@/shared/ui/input/Input";
import styles from "./SearchInput.module.scss";

type SearchInputProps = InputHTMLAttributes<HTMLInputElement>;

export const SearchInput = ({ className, ...props }: SearchInputProps) => {
  return (
    <Input
      {...props}
      className={className}
      inputClassName={styles.searchInput}
      startContent={<IoIosSearch size={20} />}
      isError={false}
    />
  );
};
