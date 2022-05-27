import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useState } from 'react';

import DialogProvider from './DialogProvider';
import SetGoals from './routes/SetGoals';
import MyGoals from './routes/MyGoals';
import BuddyGoals from './routes/BuddyGoals';
import Settings from './routes/Settings';
import History from './routes/History';

import {
    AppBar,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Typography
} from '@mui/material';
import {
    Menu as MenuIcon,
    LibraryBooks as LibraryBooksIcon,
    LibraryAdd as LibraryAddIcon,
    LibraryAddCheck as LibraryAddCheckIcon,
    History as HistoryIcon,
    Settings as SettingsIcon,
    Logout as LogoutIcon
} from '@mui/icons-material';

export default function App() {
    const [openDrawer, setOpenDrawer] = useState(false);
    const navigate = useNavigate();

    return (
        <DialogProvider>
            <AppBar>
                <Toolbar>
                    <IconButton onClick={() => setOpenDrawer(!openDrawer)}><MenuIcon /></IconButton>
                    <Typography>Goal Buddy</Typography>
                </Toolbar>
            </AppBar>
            <Toolbar />
            <Drawer open={openDrawer} onClose={() => setOpenDrawer(!openDrawer)}>
                <List>
                    {[
                        ['My Goals', <LibraryBooksIcon />, 'my-goals'],
                        ['Buddy Goals', <LibraryAddCheckIcon />, 'buddy-goals'],
                        ['Set Goals', <LibraryAddIcon />, 'set-goals'],
                        ['History', <HistoryIcon />, 'history'],
                    ].map(([text, icon, route], index) => (
                        <ListItem key={index} disablePadding>
                            <ListItemButton onClick={() => {
                                setOpenDrawer(!openDrawer);
                                navigate(route);
                            }}>
                                <ListItemIcon>{icon}</ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                <Divider />
                <List>
                    {[
                        ['Settings', <SettingsIcon />, 'settings'],
                        ['Sign Out', <LogoutIcon />, 'sign-in']
                    ].map(([text, icon, route], index) => (
                        <ListItem key={index} disablePadding>
                            <ListItemButton onClick={() => {
                                setOpenDrawer(!openDrawer);
                                navigate(route);
                            }}>
                                <ListItemIcon>{icon}</ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
            <Routes>
                <Route
                    path='/'
                    element={(
                        <Navigate to='my-goals' />
                    )}
                />
                <Route path='my-goals' element={<MyGoals />} />
                <Route path='buddy-goals' element={<BuddyGoals />} />
                <Route path='set-goals' element={<SetGoals />} />
                <Route path='history' element={<History />} />
                <Route path='settings' element={<Settings />} />
            </Routes>
        </DialogProvider>
    )
}