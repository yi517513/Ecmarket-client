import React from "react";
import clsx from "clsx";

export const FilterBar = ({ options = [], isActive, onClick, extra }) => {
  return (
    <ul className="filterbar-row">
      {options?.map?.((opt) => (
        <li
          key={opt.label}
          className={clsx(
            "filterbar-li",
            isActive?.(opt.value) ? "filterbar-li--active" : ""
          )}
          onClick={() => onClick?.(opt.value)}
        >
          {opt.label}
        </li>
      ))}
      {extra}
    </ul>
  );
};
