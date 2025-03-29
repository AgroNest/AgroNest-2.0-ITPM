import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material';
import { Dashboard, BarChart, PersonAdd, InsertChart, PieChart, Public, Business, CalendarToday, Group, AttachMoney } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <Drawer
            variant="permanent"
            sx={{
                width: 240,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: { width: 240, boxSizing: 'border-box', backgroundColor: '#4CAF50', color: '#fff' },
            }}
        >
            <List sx={{ mt: 2 }}>
                <ListItem button component={Link} to="/managerdashboard">
                    <ListItemIcon><Dashboard sx={{ color: '#fff' }} /></ListItemIcon>
                    <ListItemText primary="Dashboard" />
                </ListItem>
                <Divider />

                <ListItem button component={Link} to="/analysis">
                    <ListItemIcon><BarChart sx={{ color: '#fff' }} /></ListItemIcon>
                    <ListItemText primary="Analysis" />
                </ListItem>

                <ListItem button component={Link} to="/addadmin">
                    <ListItemIcon><PersonAdd sx={{ color: '#fff' }} /></ListItemIcon>
                    <ListItemText primary="Admin Registrations" />
                </ListItem>

                <ListItem button>
                    <ListItemIcon><InsertChart sx={{ color: '#fff' }} /></ListItemIcon>
                    <ListItemText primary="Chart 1" />
                </ListItem>

                <ListItem button>
                    <ListItemIcon><PieChart sx={{ color: '#fff' }} /></ListItemIcon>
                    <ListItemText primary="Chart 2" />
                </ListItem>

                <ListItem button>
                    <ListItemIcon><Public sx={{ color: '#fff' }} /></ListItemIcon>
                    <ListItemText primary="Global Stats" />
                </ListItem>

                <ListItem button>
                    <ListItemIcon><Business sx={{ color: '#fff' }} /></ListItemIcon>
                    <ListItemText primary="Organizations" />
                </ListItem>

                <ListItem button>
                    <ListItemIcon><CalendarToday sx={{ color: '#fff' }} /></ListItemIcon>
                    <ListItemText primary="Calendar" />
                </ListItem>

                <ListItem button>
                    <ListItemIcon><Group sx={{ color: '#fff' }} /></ListItemIcon>
                    <ListItemText primary="Users" />
                </ListItem>

                <ListItem button>
                    <ListItemIcon><AttachMoney sx={{ color: '#fff' }} /></ListItemIcon>
                    <ListItemText primary="Finance" />
                </ListItem>
            </List>
        </Drawer>
    );
};

export default Sidebar;