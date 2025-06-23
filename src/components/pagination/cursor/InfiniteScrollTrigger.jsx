import { useVisibilityObserver } from "@hooks/observer/useVisibilityObserver";

export const InfiniteScrollTrigger = ({ handleNext }) => {
  const setSentinelRef = useVisibilityObserver({
    onVisible: handleNext,
    options: { threshold: 0 },
  });

  return (
    <div className="absolute fixed inset-1 flex flex-col justify-end pointer-events-none">
      <div
        ref={(el) => setSentinelRef(el, "bottom")}
        className="pointer-events-none h-[10px]"
      ></div>
    </div>
  );
};
