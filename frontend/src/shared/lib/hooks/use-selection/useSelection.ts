"use client";

import { useCallback, useState } from "react";

type EntityId = string | number;

interface EntityWithId {
  id: EntityId;
}

export const useSelection = <T extends EntityWithId>(items: T[]) => {
  const [selectedIds, setSelectedIds] = useState<EntityId[]>([]);

  const handleSelectOne = useCallback((id: EntityId, checked: boolean) => {
    setSelectedIds((prevIds) => {
      if (checked) {
        if (prevIds.includes(id)) {
          return prevIds;
        }

        return [...prevIds, id];
      }

      return prevIds.filter((selectedId) => selectedId !== id);
    });
  }, []);

  const handleSelectAll = useCallback(
    (checked: boolean) => {
      if (checked) {
        setSelectedIds(items.map((item) => item.id));
        return;
      }

      setSelectedIds([]);
    },
    [items],
  );

  const isSelected = useCallback(
    (id: EntityId) => {
      return selectedIds.includes(id);
    },
    [selectedIds],
  );

  const resetSelection = useCallback(() => {
    setSelectedIds([]);
  }, []);

  const isAllSelected =
    items.length > 0 && items.every((item) => selectedIds.includes(item.id));

  const isIndeterminate = selectedIds.length > 0 && !isAllSelected;

  return {
    selectedIds,
    isAllSelected,
    isIndeterminate,
    handleSelectOne,
    handleSelectAll,
    isSelected,
    resetSelection,
  };
};
