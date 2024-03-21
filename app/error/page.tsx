import { AbsoluteCenter, Box, Center } from "@chakra-ui/react";
import Link from "next/link";

export default function Page() {
  return (
    <Box h="80vh">
      <AbsoluteCenter>
        <p>An error occurred. Please try again</p>
        <Center mt="5">
          <Link href="/" style={{ color: "blue" }}>
            Continue
          </Link>
        </Center>
      </AbsoluteCenter>
    </Box>
  );
}
