import React, { forwardRef } from "react";

export const MarkAsReadAnchor = React.memo(
  forwardRef(function MarkAsReadAnchor({ msgId }, ref) {
    return <div ref={(el) => ref(el, msgId)} />;
  })
);
