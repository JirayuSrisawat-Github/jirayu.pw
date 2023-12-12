import NextLink from "next/link";

import ToggleTheme from "@/components/ToggleTheme";
import {
  Navbar,
  NavbarMenu,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import { Link } from "@nextui-org/link";

export default () => {
  const menuItems = [
    {
      label: "หน้าหลัก",
      href: "/",
    },
    {
      label: "โครงการ",
      href: "/projects",
    },
    {
      label: "ติดต่อเรา",
      href: "/contact",
    },
  ];

  return (
    <Navbar shouldHideOnScroll={true}>
      <NavbarContent justify="start">
        <NavbarMenuToggle aria-label={"Open/Close menu"} />
      </NavbarContent>

      <NavbarContent justify="center">
        <NavbarBrand>
          <NextLink href="/" className="font-bold text-inherit uppercase">
          จิรายุ
          </NextLink>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem>
          <ToggleTheme />
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className="w-full"
              color="foreground"
              size="lg"
              href={item.href}
              as={NextLink}
            >
              {item.label}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
};