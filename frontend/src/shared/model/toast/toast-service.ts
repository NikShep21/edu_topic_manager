import type { ShowToastParams } from "./toast-types";

type ToastSubscriber = (toast: ShowToastParams) => void;

const subscribers = new Set<ToastSubscriber>();

export const subscribeToToasts = (subscriber: ToastSubscriber) => {
  subscribers.add(subscriber);

  return () => {
    subscribers.delete(subscriber);
  };
};

export const emitToast = (toast: ShowToastParams) => {
  subscribers.forEach((subscriber) => {
    subscriber(toast);
  });
};
