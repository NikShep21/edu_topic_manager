"use client";

import { Controller } from "react-hook-form";
import { FiArrowLeft } from "react-icons/fi";
import Link from "next/link";

import { TopicFiles } from "@/features/topic-files";
import { TopicSteps } from "@/features/topic-steps";
import { Button } from "@/shared/ui/button";
import { FieldError } from "@/shared/ui/field-error";
import { Input } from "@/shared/ui/input";
import { Panel, PanelContent, PanelHeader } from "@/shared/ui/panel";
import { TextArea } from "@/shared/ui/textarea/Textarea";
import { ToggleGroup } from "@/shared/ui/toggle-group";

import { useTopicForm } from "../model/useTopicForm";
import type { TopicFormProps } from "../model/types";

import styles from "./TopicForm.module.scss";

const TOPIC_TYPE_OPTIONS = [
  { value: "vkr", label: "ВКР" },
  { value: "coursework", label: "Курсовая работа" },
];

export const TopicForm = (props: TopicFormProps) => {
  const { onCancel } = props;

  const { form, isEdit, isPending, handleSubmit, handleDelete } = useTopicForm(props);

  const {
    register,
    control,
    formState: { errors },
  } = form;

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.topLink}>
        <Link href="/teacher/topics" className={styles.topLinkAnchor}>
          <FiArrowLeft size={18} />
          <span>К моим темам</span>
        </Link>
      </div>

      <p className={styles.subtitle}>
        Заполните основную информацию, чтобы студенты могли выбрать тему
      </p>

      <Panel>
        <PanelHeader title="Основная информация" />

        <PanelContent className={styles.mainContent}>
          <div className={styles.field}>
            <label className={styles.label}>Название темы</label>
            <Input
              {...register("title")}
              placeholder="Введите название работы"
              error={errors.title?.message}
              disabled={isPending}
            />
          </div>

          {!isEdit && (
            <div className={styles.field}>
              <label className={styles.label}>Тип работы</label>
              <Controller
                control={control}
                name="type"
                render={({ field }) => (
                  <ToggleGroup
                    value={field.value}
                    options={TOPIC_TYPE_OPTIONS}
                    onChange={field.onChange}
                    aria-label="Тип темы"
                  />
                )}
              />
            </div>
          )}

          <div className={styles.field}>
            <label className={styles.label}>Описание темы</label>
            <TextArea
              {...register("description")}
              placeholder="Введите описание работы"
              disabled={isPending}
              error={errors.description?.message}
            />
          </div>
        </PanelContent>
      </Panel>

      <div className={styles.stepsAndFiles}>
        <div className={styles.stepsWrapper}>
          <Controller
            control={control}
            name="steps"
            render={({ field }) => (
              <TopicSteps
                error={errors.steps?.message}
                steps={field.value}
                onChange={field.onChange}
              />
            )}
          />
        </div>

        <div className={styles.filesWrapper}>
          <Controller
            control={control}
            name="filesState"
            render={({ field }) => (
              <TopicFiles
                value={field.value}
                onChange={field.onChange}
                error={errors.filesState?.message}
              />
            )}
          />
        </div>
      </div>

      {errors.root?.message && (
        <FieldError message={errors.root.message} className={styles.rootError} />
      )}

      <div className={styles.footer}>
        {isEdit && (
          <Button
            type="button"
            variant="secondary"
            onClick={handleDelete}
            disabled={isPending}
          >
            Удалить тему
          </Button>
        )}

        <Button type="button" variant="secondary" onClick={onCancel} disabled={isPending}>
          Отмена
        </Button>

        <Button className={styles.coreBtn} size="lg" type="submit" disabled={isPending}>
          {isEdit ? "Сохранить изменения" : "Создать тему"}
        </Button>
      </div>
    </form>
  );
};
