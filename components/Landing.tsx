"use client";

import { useState } from "react";
import {
  Box,
  Input,
  Tabs,
  TabList,
  Tab,
  TabPanel,
  TabPanels,
  Center,
  SimpleGrid,
  Image,
  Heading,
  Text,
  Button,
  AbsoluteCenter,
} from "@chakra-ui/react";
import { signin, signup } from "@/client/auth";

export const Landing = () => {
  const [confirmationEmailTo, setConfirmationEmailTo] = useState<string>("");

  if (confirmationEmailTo) {
    return (
      <Box h="90vh">
        <AbsoluteCenter>
          Sent confirmation email to <strong>{confirmationEmailTo}</strong>
        </AbsoluteCenter>
      </Box>
    );
  }

  const handleSignup = () => {
    const email = (document.getElementById("sign-up-email") as HTMLInputElement)
      .value;
    const password = (
      document.getElementById("sign-up-password") as HTMLInputElement
    ).value;
    const confirmPassword = (
      document.getElementById("sign-up-password-confirm") as HTMLInputElement
    ).value;

    void signup(email, password, confirmPassword, (email: string) =>
      setConfirmationEmailTo(email),
    );
  };

  const handleSignin = () => {
    const email = (document.getElementById("sign-in-email") as HTMLInputElement)
      .value;
    const password = (
      document.getElementById("sign-in-password") as HTMLInputElement
    ).value;

    void signin(email, password);
  };

  return (
    <Center>
      <Box p="4" w={{ sm: "100%", md: "80%", lg: "60%" }}>
        <SimpleGrid columns={{ sm: 1, md: 1, lg: 2 }}>
          <Center>
            <Box>
              <Heading as="h2">Vehicle Maintenance Made Easy</Heading>
              <Text fontSize="md" mt="15">
                Track your car{"'s"} upkeep, get timely maintenance reminders,
                and access insightful automotive data.
              </Text>
            </Box>
          </Center>
          <Box>
            <Center>
              <Image
                src="car_landing.jpg"
                alt="Landing page image"
                maxBlockSize="275px"
              />
            </Center>
          </Box>
        </SimpleGrid>
        <Tabs isFitted>
          <TabList>
            <Tab>Login</Tab>
            <Tab>Sign-up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <SimpleGrid columns={{ sm: 1, lg: 2 }} spacing="30px">
                <Box>
                  <Input id="sign-in-email" placeholder="Email" />
                </Box>
                <Box>
                  <Input
                    id="sign-in-password"
                    placeholder="Password"
                    type="password"
                  />
                </Box>
              </SimpleGrid>
              <Center mt="10">
                <Button colorScheme="blue" onClick={handleSignin}>
                  Login
                </Button>
              </Center>
            </TabPanel>
            <TabPanel>
              <SimpleGrid columns={{ sm: 1, lg: 2 }} spacing="30px">
                <Box>
                  <Input id="sign-up-email" placeholder="Email" />
                </Box>
                <Box>
                  <Input
                    id="sign-up-password"
                    placeholder="Password"
                    type="password"
                  />
                </Box>
                <Box>
                  <Input
                    id="sign-up-password-confirm"
                    placeholder="Confirm Password"
                    type="password"
                  />
                </Box>
              </SimpleGrid>
              <Center mt="10">
                <Button colorScheme="blue" onClick={handleSignup}>
                  Sign-up
                </Button>
              </Center>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Center>
  );
};
