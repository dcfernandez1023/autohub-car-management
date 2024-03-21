import { Box, Flex, Text } from "@chakra-ui/react";
import { getUser } from "@/server/auth";
import Link from "next/link";
import { NavbarSettingsMenu } from "./NavbarSettingsMenu";
import { cookies } from "next/headers";
import { AUTOHUB_ACCESS_TOKEN } from "@/constants";

export const Navbar = async () => {
  const user = await getUser(cookies().get(AUTOHUB_ACCESS_TOKEN)?.value);
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      py="3"
      px="4"
      bg="blue.500"
    >
      <Text as={Link} href="/" color="white" fontSize="22px">
        AutoHub
      </Text>

      {user && (
        <Box>
          <NavbarSettingsMenu />
        </Box>
      )}
    </Flex>
  );
};
