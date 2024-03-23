"use client";

import { Menu, MenuButton, Button, MenuList, MenuItem } from "@chakra-ui/react";
import { logout } from "@/client/auth";

export const NavbarSettingsMenu = () => {
  return (
    <Menu>
      <MenuButton
        as={Button}
        bg="blue.500"
        color="white"
        mr={{ base: 2, md: 4 }}
        _hover={{ bg: "blue.700" }}
      >
        Menu
      </MenuButton>
      <MenuList>
        <MenuItem>Profile</MenuItem>
        <MenuItem
          onClick={() => (window.location.href = "/client/scheduledServices")}
        >
          Scheduled Services
        </MenuItem>
        <MenuItem onClick={() => void logout()}>Logout</MenuItem>
      </MenuList>
    </Menu>
  );
};
