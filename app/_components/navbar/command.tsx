"use client";

import { useCallback, useState } from "react";
import dynamic from "next/dynamic";
import { Component1Icon } from "@radix-ui/react-icons";
import { useHotkeys } from "react-hotkeys-hook";

import { Button } from "~/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "~/components/ui/tooltip";

const Cmdk = dynamic(() => import("~/components/cmdk"));

export default function Command() {
  const [open, setOpen] = useState(false);
  const [opened, setOpened] = useState(false);

  const openCmdk = useCallback(() => {
    setOpen(true);
    setOpened(true);
  }, []);

  useHotkeys("mod+k", openCmdk, { preventDefault: true });

  return (
    <>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            size="icon"
            className="hidden h-6 w-6 sm:inline-flex"
            variant="ghost"
            onClick={openCmdk}
          >
            <Component1Icon className="h-4 w-4" width={16} height={16} />
            <span className="sr-only">Open command menu</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Open command menu</p>
        </TooltipContent>
      </Tooltip>
      {opened && <Cmdk open={open} onOpenChange={setOpen} />}
    </>
  );
}