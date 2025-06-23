import { useEffect } from "react";
import { toast, ToastContainer, Bounce } from "react-toastify";
import { eventBus } from "@utils/eventBus";
import { Events } from "@utils/events";

export const Notification = ({ children }) => {
  useEffect(() => {
    const unsubscribe = eventBus.on(Events.TOAST, ({ message, type }) => {
      toast.dismiss();
      switch (type) {
        case `success`:
          toast.success(message, { autoClose: 3000 });
          break;
        case `error`:
          toast.error(message, { autoClose: 5000 });
          break;
        case `warn`:
          toast.warn(message, { autoClose: 5000 });
          break;
        case `loading`:
          toast.loading(message, { autoClose: 20000 });
          break;
        default:
          toast.info(message, { autoClose: 4000 });
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <>
      <ToastContainer
        position="top-right"
        closeOnClick
        theme="light"
        transition={Bounce}
      />
      {children}
    </>
  );
};
