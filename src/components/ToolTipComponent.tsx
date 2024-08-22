import React, { ReactNode } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const ToolTipComponent: React.FC<{ button: any; content: ReactNode }> = ({
  button,
  content,
}) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild className="cursor-pointer">{button}</TooltipTrigger>
        <TooltipContent className="p-0">{content}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ToolTipComponent;