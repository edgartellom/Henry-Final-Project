import * as React from 'react';
import { AppBar, TitlePortal } from 'react-admin';
import Box from '@mui/material/Box';

// import Logo from './Logo';

export const MyAppBar = () => (
    <AppBar color="primary">
        <TitlePortal />
        <Box flex="1" />
        <Box flex="1" />
    </AppBar>
);