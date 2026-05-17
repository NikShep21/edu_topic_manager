"use client";

import { Controller } from "react-hook-form";
import { FiArrowLeft } from "react-icons/fi";
import Link from "next/link";

import { DeleteTopicButton } from "@/features/delete-topic";
import { TopicFiles } from "@/features/topic-files";
import { TopicSteps } from "@/features/topic-steps";
import { Button } from "@/shared/ui/button";
import { FieldError } from "@/shared/ui/field-error";
import { Input } from "@/shared/ui/input";
import { Panel, PanelContent, PanelHeader } from "@/shared/ui/panel";
import { Textarea } from "@/shared/ui/textarea";
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

  const { form, isEdit, isPending, handleSubmit } = useTopicForm(props);

  const topicId = props.mode === "edit" ? props.initialData.id : null;
  const onDeleteSuccess = props.mode === "edit" ? props.onDeleteSuccess : undefined;

  const {
    register,
    control,
    formState: { errors },
  } = form;

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.headerForm}>
        <div className={styles.topLink}>
          <Link href="/teacher/topics" className={styles.topLinkAnchor}>
            <FiArrowLeft size={18} />
            <span>К моим темам</span>
          </Link>
        </div>

        <p className={styles.subtitle}>
          {isEdit
            ? "Обновите основную информацию, чтобы студенты видели актуальные данные о теме"
            : "Заполните основную информацию, чтобы студенты могли выбрать тему"}
        </p>
      </div>

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
            <Textarea
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
                className={styles.steps}
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
                className={styles.files}
              />
            )}
          />
        </div>
      </div>

      {errors.root?.message && (
        <FieldError message={errors.root.message} className={styles.rootError} />
      )}

      <div className={styles.footer}>
        <div className={styles.footerLeft}>
          {topicId && (
            <DeleteTopicButton
              topicId={topicId}
              disabled={isPending}
              onSuccess={onDeleteSuccess}
            />
          )}
        </div>

        <div className={styles.footerRight}>
          <Button
            type="button"
            variant="secondary"
            onClick={onCancel}
            disabled={isPending}
          >
            Отмена
          </Button>

          <Button
            isLoading={isPending}
            className={styles.coreBtn}
            size="lg"
            type="submit"
            disabled={isPending}
          >
            {isEdit ? "Сохранить изменения" : "Создать тему"}
          </Button>
        </div>
      </div>
    </form>
  );
};
