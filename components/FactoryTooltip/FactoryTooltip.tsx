"use client";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger,} from "@/components/ui/tooltip"
import {TooltipIcon} from "@/icons/TooltipIcon";

export const FactoryTooltip = () => {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <button><TooltipIcon/></button>
                </TooltipTrigger>
                <TooltipContent>
                    <p className="text-tertiary">Info del fabricante, no garantiza precisión total.</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}