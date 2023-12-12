"use client";

import { useTheme } from "next-themes";

import { FaSun, FaMoon } from "react-icons/fa";
import { FaGear } from "react-icons/fa6";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/dropdown";
import { Button } from "@nextui-org/button";

export default () => {
  const { theme, setTheme } = useTheme();

  return (
    <Dropdown showArrow>
      <DropdownTrigger>
        <Button color="success" variant="flat">
          {theme ? (
            theme === "light" ? (
              <FaSun />
            ) : theme === "system" ? (
              <FaGear />
            ) : (
              <FaMoon />
            )
          ) : (
            <FaGear />
          )}
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        disallowEmptySelection={true}
        variant="flat"
        selectionMode="single"
        // @ts-ignore
        selectedKeys={new Set([theme])}
        // @ts-ignore
        onAction={(key: string) => setTheme(key)}
        aria-label="Actions"
      >
        <DropdownItem
          key="light"
          startContent={
            <FaSun className="text-xl text-default-500 pointer-events-none flex-shrink-0" />
          }
        >
          Light
        </DropdownItem>
        <DropdownItem
          key="dark"
          startContent={
            <FaMoon className="text-xl text-default-500 pointer-events-none flex-shrink-0" />
          }
        >
          Dark
        </DropdownItem>
        <DropdownItem
          key="system"
          startContent={
            <FaGear className="text-xl text-default-500 pointer-events-none flex-shrink-0" />
          }
        >
          System
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};