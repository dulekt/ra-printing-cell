//AppHeader.jsx
import React from "react";
import { Heading, Image, Stack } from "@chakra-ui/react";
import RAlogo from "@/assets/images/RA_Logo_Bug-LeftText_rgb.png";
export default function AppHeader() {
  return (
    <Stack
      direction="row"
      //width="100%"
    >
      <Image height="30px" src={RAlogo} alt="RA_logo" />{" "}
      <Heading size="md">System zamawiania etykiet </Heading>
    </Stack>
  );
}
