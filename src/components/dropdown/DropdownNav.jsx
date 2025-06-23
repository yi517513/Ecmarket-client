import { Link } from "react-router-dom";
import { useState } from "react";

export const DropdownNav = ({ label, items }) => {
  const [open, setOpen] = useState(false);

  return (
    <div
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      className="dropdown-nav"
    >
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="dropdown-toggle"
      >
        {label}
      </button>
      {open && (
        <ul className="dropdown-menu">
          {items?.map?.((item, index) => {
            const { name, to, onClick } = item || {};
            return (
              <li key={name || index}>
                {to ? (
                  <Link
                    to={to}
                    onClick={() => setOpen(false)}
                    className="dropdown-item"
                  >
                    {name}
                  </Link>
                ) : (
                  <button
                    onClick={() => {
                      setOpen(false);
                      onClick?.();
                    }}
                    className="dropdown-item w-full text-start"
                  >
                    {name}
                  </button>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
