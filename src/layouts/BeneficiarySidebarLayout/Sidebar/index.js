import { useContext } from 'react';
import Scrollbar from 'src/components/Scrollbar';
import { SidebarContext } from 'src/contexts/SidebarContext';

import {
  Box,
  Drawer,
  alpha,
  styled,
  Divider,
  useTheme,
  Button,
  lighten,
  darken
} from '@mui/material';

import SidebarMenu from './SidebarMenu';
import Logo from 'src/components/LogoSign';

const SidebarWrapper = styled(Box)(
  ({ theme }) => `
        width: ${theme.sidebar.width};
        min-width: ${theme.sidebar.width};
        color: ${theme.colors.alpha.trueWhite[70]};
        position: relative;
        z-index: 7;
        height: 100%;
        padding-bottom: 68px;
        overflow-x: hidden; /* Prevent horizontal overflow */
        
        /* Ensure consistent spacing for menu items */
        .MuiList-root {
          width: 100%;
        }
        
        .MuiButton-root {
          /* Ensure buttons don't exceed sidebar width */
          max-width: calc(100% - ${theme.spacing(2.4)});
        }
`
);

const SidebarContent = styled(Box)`
  padding: 0;
  width: 100%;
  
  /* Ensure menu wrapper takes full width */
  & > div {
    width: 100%;
  }
`;

function Sidebar() {
  const { sidebarToggle, toggleSidebar } = useContext(SidebarContext);
  const closeSidebar = () => toggleSidebar();
  const theme = useTheme();

  const sidebarContent = (
    <SidebarContent>
      <Box mt={3}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            px: 2
          }}
        >
          <Logo />
        </Box>
      </Box>
      <Divider
        sx={{
          mt: theme.spacing(3),
          mx: theme.spacing(2),
          background: theme.colors.alpha.trueWhite[10]
        }}
      />
      <SidebarMenu />
    </SidebarContent>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <SidebarWrapper
        sx={{
          display: {
            xs: 'none',
            lg: 'inline-block'
          },
          position: 'fixed',
          left: 0,
          top: 0,
          background:
            theme.palette.mode === 'dark'
              ? alpha(lighten(theme.header.background, 0.1), 0.5)
              : darken(theme.colors.alpha.black[100], 0.5),
          boxShadow:
            theme.palette.mode === 'dark' ? theme.sidebar.boxShadow : 'none'
        }}
      >
        <Scrollbar>
          {sidebarContent}
        </Scrollbar>
        <Divider
          sx={{
            background: theme.colors.alpha.trueWhite[10]
          }}
        />
        <Box p={2}>
          <Button
            href="https://bloomui.com"
            target="_blank"
            rel="noopener noreferrer"
            variant="contained"
            color="success"
            size="small"
            fullWidth
          >
            Upgrade to PRO
          </Button>
        </Box>
      </SidebarWrapper>

      {/* Mobile Drawer */}
      <Drawer
        sx={{
          boxShadow: `${theme.sidebar.boxShadow}`,
          '& .MuiDrawer-paper': {
            width: theme.sidebar.width,
            overflow: 'hidden' /* Prevent drawer overflow */
          }
        }}
        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
        open={sidebarToggle}
        onClose={closeSidebar}
        variant="temporary"
        elevation={9}
      >
        <SidebarWrapper
          sx={{
            background:
              theme.palette.mode === 'dark'
                ? theme.colors.alpha.white[100]
                : darken(theme.colors.alpha.black[100], 0.5),
            height: '100%',
            overflow: 'hidden'
          }}
        >
          <Scrollbar>
            {sidebarContent}
          </Scrollbar>
        </SidebarWrapper>
      </Drawer>
    </>
  );
}

export default Sidebar;