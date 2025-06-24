import { useEffect, useRef } from "react";
import { useChatStore } from "@app/stores/useChatStore";
import { useMarkMessagesAsRead } from "../useChatRoomMutate";
import debounce from "lodash.debounce";

// 更新接收者的已讀狀態
export const useSendMarkAsReadEffect = () => {
  const idsRef = useRef([]);
  const pendingMarkAsReadIds = useChatStore((s) => s.pendingMarkAsReadIds);
  const dequeueMarkAsRead = useChatStore((s) => s.dequeueMarkAsRead);
  const { mutateAsync: markAsReadReqest } = useMarkMessagesAsRead();

  const handleMarkAsRead = useRef(
    debounce(async () => {
      try {
        // console.log(idsRef.current);
        await markAsReadReqest(idsRef.current);
        await dequeueMarkAsRead(idsRef.current);
      } catch (error) {
        console.error("失敗", error);
      }
    }, 1000)
  ).current;

  useEffect(() => {
    idsRef.current = pendingMarkAsReadIds;

    if (!idsRef.current || idsRef.current.length <= 0) return;
    handleMarkAsRead();
  }, [pendingMarkAsReadIds]);
};
