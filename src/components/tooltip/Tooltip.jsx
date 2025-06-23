import React from "react";
import clsx from "clsx";

export const Tooltip = React.memo(
  ({ children, content, position = "top", visible }) => {
    const positionClasses = {
      top: "tooltip-top",
      bottom: "tooltip-bottom",
      left: "tooltip-left",
      right_inside: "tooltip-right-inside",
      right_outside: "tooltip-right-outside",
      top_right: "tooltip-top-right",
    };

    return (
      <div className="group relative block w-full h-full">
        {children}
        {content && (
          <div
            className={clsx(
              "tooltip-base",
              positionClasses[position],
              visible
                ? "tooltip-visible"
                : "tooltip-hidden group-hover:opacity-100"
            )}
          >
            <span className="text-nowrap z-10">
              {typeof content === "string" ? content : String(content)}
            </span>
          </div>
        )}
      </div>
    );
  }
);
