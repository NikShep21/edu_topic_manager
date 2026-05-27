import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import type { ReactNode } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { createTopic, topicQueryKeys } from "@/entities/topic";

import { useCreateTopicMutation } from "./useCreateTopicMutation";

vi.mock("@/entities/topic", () => ({
  createTopic: vi.fn(),
  topicQueryKeys: {
    lists: vi.fn(() => ["topics", "list"]),
  },
}));

const mockedCreateTopic = vi.mocked(createTopic);

const createWrapper = (queryClient: QueryClient) => {
  return function Wrapper({ children }: { children: ReactNode }) {
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
  };
};

describe("useCreateTopicMutation", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("creates topic and invalidates topics list query", async () => {
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
        mutations: {
          retry: false,
        },
      },
    });

    const invalidateQueriesSpy = vi.spyOn(queryClient, "invalidateQueries");

    mockedCreateTopic.mockResolvedValueOnce({
      id: 1,
      title: "Новая тема",
    } as Awaited<ReturnType<typeof createTopic>>);

    const payload = {
      title: "Новая тема",
      description: "Описание темы",
      type: "vkr" as const,
    };

    const { result } = renderHook(() => useCreateTopicMutation(), {
      wrapper: createWrapper(queryClient),
    });

    result.current.mutate(payload);

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(mockedCreateTopic).toHaveBeenCalledTimes(1);
    expect(mockedCreateTopic.mock.calls[0]?.[0]).toEqual(payload);

    expect(invalidateQueriesSpy).toHaveBeenCalledWith({
      queryKey: topicQueryKeys.lists(),
    });
  });
});
