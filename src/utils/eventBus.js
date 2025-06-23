const listeners = {};

export const eventBus = {
  on(event, handler) {
    listeners[event] ??= [];
    listeners[event].push(handler);
    return () => eventBus.off(event, handler);
  },
  off(event, handler) {
    listeners[event] = listeners[event]?.filter((h) => h !== handler);
  },
  emit(event, payload) {
    listeners[event]?.forEach((handler) => handler(payload));
  },
};
