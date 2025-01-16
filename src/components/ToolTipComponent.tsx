import React, { ReactNode } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

const ToolTipComponent: React.FC<{ button: any; content: ReactNode }> = ({
  button,
  content,
}) => {
  return (
    <Popover>
      <PopoverTrigger>{button}</PopoverTrigger>
      <PopoverContent className="p-0 w-56">{content}</PopoverContent>
    </Popover>
  );
};

export default ToolTipComponent;
