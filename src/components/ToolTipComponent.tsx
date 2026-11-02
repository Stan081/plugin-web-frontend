import React, { ReactNode } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

const ToolTipComponent: React.FC<{ button: ReactNode; content: ReactNode }> = ({
  button,
  content,
}) => {
  return (
    <Popover>
      <PopoverTrigger>{button}</PopoverTrigger>
      <PopoverContent
        collisionPadding={16}
        className="p-0 w-72 max-w-[calc(100vw-2rem)] border-0 bg-transparent"
      >
        {content}
      </PopoverContent>
    </Popover>
  );
};

export default ToolTipComponent;
