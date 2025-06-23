import React, { forwardRef } from "react";

export const ScrollAnchor = React.memo(
  forwardRef(function ScrollAnchor(props, ref) {
    return <div ref={ref} />;
  })
);
