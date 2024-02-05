
import { BarChartRounded, LanRounded, PhoneIphoneRounded, RoomPreferencesRounded, ShowChartRounded, SlideshowRounded } from '@mui/icons-material';
import { Avatar, Box, Divider, ListItemIcon, ListItemText, Menu, MenuItem, Paper } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

const items = [
  {
    label: 'Stock Dashboard',
    icon: BarChartRounded,
    route: '/'
  },
  {
    label: 'Stock List',
    icon: ShowChartRounded,
    route: '/stock'
  },
  {
    label: 'Project Presentation',
    icon: SlideshowRounded,
    route: '/presentation'
  },
  {
    label: 'DBMS Backend',
    icon: RoomPreferencesRounded,
    route: '/presentation/backend'
  },
  {
    label: 'DBMS UI',
    icon: PhoneIphoneRounded,
    route: '/presentation/ui'
  },
  {
    label: 'Documentation',
    icon: LanRounded,
    route: '/documentation'
  },
  {
    label: 'Credits',
    icon: LanRounded,
    route: '/credits'
  }
]

export const DashboardLayout = ({ children }: any) => {

  const location = useLocation();

  return (
    <Box
      display="flex"
      flexDirection="row"
      alignItems="stretch"
      height="100vh"
    >

      <Paper
        elevation={4}
      >
        <Avatar
          sx={{
            m: "auto",
            my: 5,
          }}
        />
        <Divider sx={{ mb: 4 }} />
        {
          items.map((item, index) => {

            const active = location.pathname === item.route;

            return (
              <MenuItem
                key={index}
                component={Link}
                to={item.route}
                sx={{
                  px: 4,
                  py: 1.5,
                  "& .MuiListItemIcon-root": {
                    minWidth: "40px"
                  },
                }}
              >
                <ListItemIcon>
                  {<item.icon color={active ? "primary" : "inherit"} />}
                </ListItemIcon>
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{
                    color: active ? "primary" : "inherit"
                  }}
                />
              </MenuItem>
            )
          })
        }
      </Paper>
      {children}
    </Box >
  )
}