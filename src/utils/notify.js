import { eventBus } from "./eventBus";
import { Events } from "./events";

const createNotify = (type) => (message) =>
  eventBus.emit(Events.TOAST, { type, message });

export const notifyUtils = {
  success: createNotify("success"),
  error: createNotify("error"),
  warn: createNotify("warn"),
  info: createNotify("info"),
  loading: createNotify("loading"),
};
