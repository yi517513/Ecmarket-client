import { EmptyState } from "@components/ui/EmptyState";
import { Pagination } from "@components/pagination/Pagination";

export const ListLayout = ({ headers, children, isEmpty, ...uiControls }) => {
  return (
    <div
      role="table"
      className="w-full border rounded divide-y divide-gray-200"
    >
      {/* Header Row */}
      <div
        role="row"
        className="flex px-4 py-2 bg-zinc-100 text-sm font-medium text-gray-700"
      >
        {headers?.map?.((header, index) => (
          <div
            key={index}
            role="columnheader"
            className={`text-center ${header?.className ?? "flex-1"}`}
          >
            {header?.label ?? header}
          </div>
        ))}
      </div>

      {isEmpty && <EmptyState />}

      {/* Content Rows */}
      <div role="rowgroup" className="divide-y divide-gray-300">
        {children}
      </div>

      <Pagination {...uiControls} />
    </div>
  );
};
