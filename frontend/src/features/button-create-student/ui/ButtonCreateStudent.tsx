"use client";

import { useState } from "react";
import { GoPlus } from "react-icons/go";

import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Modal, ModalDefaultActions } from "@/shared/ui/modal";

import styles from "./ButtonCreateStudent.module.scss";
import { useForm } from "react-hook-form";
import {
  createStudentSchema,
  type CreateStudentValues,
} from "@/features/button-create-student/model/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateStudent } from "@/features/button-create-student/model/useCreateStudent";
import { FieldError } from "@/shared/ui/field-error";
import { ApiError } from "@/shared/api";

export const ButtonCreateStudent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<CreateStudentValues>({
    resolver: zodResolver(createStudentSchema),
  });

  const { error, isPending, mutate } = useCreateStudent();
  const submit = (formData: CreateStudentValues) => {
    const data = { ...formData, role: "student" } as const;
    mutate(data);
  };
  const createError =
    error instanceof ApiError && (error.status === 401 || error.status === 400)
      ? error
      : null;

  return (
    <>
      <Button onClick={() => setIsOpen(true)} className={styles.button}>
        <span className={styles.icon}>
          <GoPlus size={30} />
        </span>
        <span className={styles.text}>Создать студента</span>
      </Button>

      <Modal
        onClose={() => setIsOpen(false)}
        isOpen={isOpen}
        title="Создание студента"
        className={styles.modal}
      >
        <form id="form" onSubmit={handleSubmit(submit)} className={styles.form}>
          <div className={styles.field}>
            <label htmlFor="student-username" className={styles.label}>
              Логин
            </label>
            <Input
              id="student-username"
              placeholder="Введите логин"
              error={errors.username?.message}
              {...register("username")}
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="student-first-name" className={styles.label}>
              Имя
            </label>
            <Input
              id="student-first-name"
              placeholder="Введите имя"
              error={errors.first_name?.message}
              {...register("first_name")}
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="student-last-name" className={styles.label}>
              Фамилия
            </label>
            <Input
              error={errors.last_name?.message}
              id="student-last-name"
              placeholder="Введите фамилию"
              {...register("last_name")}
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="student-middle-name" className={styles.label}>
              Отчество
            </label>
            <Input
              id="student-middle-name"
              placeholder="Введите отчество"
              error={errors.middle_name?.message}
              {...register("middle_name")}
            />
          </div>

          <div className={styles.row}>
            <div className={styles.field}>
              <label htmlFor="student-course" className={styles.label}>
                Курс
              </label>
              <Input
                error={errors.course?.message}
                {...register("course", { valueAsNumber: true })}
                id="student-course"
                placeholder="Введите курс"
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="student-group" className={styles.label}>
                Группа
              </label>
              <Input
                error={errors.group?.message}
                {...register("group")}
                id="student-group"
                placeholder="Введите группу"
              />
            </div>
          </div>

          <div className={styles.field}>
            <label htmlFor="student-password" className={styles.label}>
              Пароль
            </label>
            <Input
              error={errors.password?.message}
              {...register("password")}
              id="student-password"
              type="password"
              placeholder="Введите пароль"
              autoComplete="new-password"
            />
          </div>
        </form>
        <FieldError message={createError?.message} />
        <div className={styles.actions}>
          <ModalDefaultActions
            isLoading={isPending}
            formId="form"
            onClose={() => setIsOpen(false)}
            text="Создать студента"
          />
        </div>
      </Modal>
    </>
  );
};
