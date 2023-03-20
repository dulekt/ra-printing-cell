// AppHeader.jsx
import React from 'react';
import { Heading, IconButton, Image, Stack, Switch } from '@chakra-ui/react';

import RAlogo from '@/assets/images/RA_Logo_Bug-LeftText_rgb.png';

export default function AppHeader() {
    return (
        <Stack direction="row">
            <Image height="30px" src={RAlogo} alt="RA_logo" /> <Heading size="md">System zamawiania etykiet </Heading>
        </Stack>
    );
}
