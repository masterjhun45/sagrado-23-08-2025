import { useContext } from 'react';
import {
  ListSubheader,
  Box,
  List,
  styled,
  Button,
  ListItem,
  Badge,
  Divider,
  Typography
} from '@mui/material';
import { NavLink as RouterLink } from 'react-router-dom';
import { SidebarContext } from 'src/contexts/SidebarContext';

import DashboardTwoToneIcon from '@mui/icons-material/DashboardTwoTone';
import PersonTwoToneIcon from '@mui/icons-material/PersonTwoTone';
import AssignmentIndTwoToneIcon from '@mui/icons-material/AssignmentIndTwoTone';
import CardMembershipTwoToneIcon from '@mui/icons-material/CardMembershipTwoTone';
import RedeemTwoToneIcon from '@mui/icons-material/RedeemTwoTone';
import NotificationsActiveTwoToneIcon from '@mui/icons-material/NotificationsActiveTwoTone';
import LocalShippingTwoToneIcon from '@mui/icons-material/LocalShippingTwoTone';
import CheckCircleOutlineTwoToneIcon from '@mui/icons-material/CheckCircleOutlineTwoTone';
import HistoryTwoToneIcon from '@mui/icons-material/HistoryTwoTone';
import ReceiptLongTwoToneIcon from '@mui/icons-material/ReceiptLongTwoTone';
import LibraryBooksTwoToneIcon from '@mui/icons-material/LibraryBooksTwoTone';
import SupportAgentTwoToneIcon from '@mui/icons-material/SupportAgentTwoTone';
import SettingsTwoToneIcon from '@mui/icons-material/SettingsTwoTone';

const MenuWrapper = styled(Box)(
  ({ theme }) => `
  padding: ${theme.spacing(2, 0)};
  position: relative;
  
  .MuiList-root {
    padding: ${theme.spacing(0.5)};
    
    & > .MuiList-root {
      padding: 0 ${theme.spacing(0)} ${theme.spacing(1)};
    }
  }
  
  .MuiListSubheader-root {
    text-transform: uppercase;
    font-weight: 700;
    font-size: ${theme.typography.pxToRem(10)};
    color: rgba(255, 255, 255, 0.6);
    padding: ${theme.spacing(3, 2.5, 1.5)};
    line-height: 1.2;
    letter-spacing: 1.2px;
    background: transparent;
    position: relative;
    margin-top: ${theme.spacing(2.5)};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    
    &:first-of-type {
      margin-top: 0;
    }
    
    &:before {
      content: '';
      position: absolute;
      bottom: ${theme.spacing(0.8)};
      left: ${theme.spacing(2.5)};
      width: 32px;
      height: 2px;
      background: linear-gradient(90deg, ${theme.palette.primary.main} 0%, rgba(255, 255, 255, 0.2) 100%);
      border-radius: 2px;
      box-shadow: 0 0 8px ${theme.palette.primary.main}40;
    }
  }
`
);

const SubMenuWrapper = styled(Box)(
  ({ theme }) => `
  .MuiList-root {
    .MuiListItem-root {
      padding: ${theme.spacing(0.3, 0)};
      margin: ${theme.spacing(0.4, 1.5)};
      border-radius: 18px;

      .MuiButton-root {
        display: flex;
        color: rgba(255, 255, 255, 0.82);
        background: transparent;
        width: 100%;
        justify-content: flex-start;
        padding: ${theme.spacing(1.8, 0.5)};
        border-radius: 18px;
        position: relative;
        font-weight: 500;
        font-size: ${theme.typography.pxToRem(13.5)};
        transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        border: 1px solid transparent;
        overflow: hidden;
        backdrop-filter: blur(10px);
        white-space: nowrap;
        
        &:before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, 
            rgba(255, 255, 255, 0.1) 0%, 
            rgba(255, 255, 255, 0.05) 50%, 
            transparent 100%);
          border-radius: 18px;
          transform: scale(0) rotate(5deg);
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          z-index: -1;
        }
        
        &:after {
          content: '';
          position: absolute;
          left: -3px;
          top: 50%;
          transform: translateY(-50%);
          width: 4px;
          height: 0;
          background: linear-gradient(180deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%);
          border-radius: 0 8px 8px 0;
          transition: height 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          opacity: 0;
          box-shadow: 0 0 12px ${theme.palette.primary.main}60;
        }
        
        .MuiButton-startIcon {
          color: rgba(255, 255, 255, 0.65);
          font-size: ${theme.typography.pxToRem(19)};
          margin-right: ${theme.spacing(2)};
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          transform-origin: center;
          filter: drop-shadow(0 0 4px rgba(255, 255, 255, 0.1));
        }
        
        .MuiButton-endIcon {
          color: rgba(255, 255, 255, 0.4);
          margin-left: auto;
          font-size: ${theme.typography.pxToRem(15)};
        }
        
        &:hover {
          color: #FFFFFF;
          transform: translateX(10px) scale(1.02);
          border-color: rgba(255, 255, 255, 0.2);
          background: rgba(255, 255, 255, 0.08);
          box-shadow: 
            0 12px 40px rgba(0, 0, 0, 0.4),
            0 4px 16px rgba(255, 255, 255, 0.1);
          
          &:before {
            transform: scale(1) rotate(0deg);
          }
          
          &:after {
            height: 28px;
            opacity: 1;
          }
          
          .MuiButton-startIcon {
            color: #FFFFFF;
            transform: scale(1.2) rotate(-5deg);
            filter: drop-shadow(0 0 8px ${theme.palette.primary.main}60);
          }
        }
        
        &.active {
          color: #FFFFFF;
          background: rgba(255, 255, 255, 0.12);
          border-color: rgba(255, 255, 255, 0.25);
          box-shadow: 
            0 8px 32px rgba(0, 0, 0, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
          
          &:before {
            transform: scale(1) rotate(0deg);
          }
          
          &:after {
            height: 36px;
            opacity: 1;
          }
          
          .MuiButton-startIcon {
            color: ${theme.palette.primary.light};
            filter: drop-shadow(0 0 8px ${theme.palette.primary.main}80);
          }
        }
      }

      .MuiBadge-root {
        .MuiBadge-badge {
          background: linear-gradient(135deg, #FF6B6B 0%, #FF4757 100%);
          color: #FFFFFF;
          font-size: ${theme.typography.pxToRem(8.5)};
          font-weight: 700;
          min-width: 20px;
          height: 20px;
          border-radius: 14px;
          border: 2.5px solid rgba(20, 20, 20, 0.9);
          box-shadow: 
            0 4px 16px rgba(255, 107, 107, 0.5),
            0 0 0 1px rgba(255, 255, 255, 0.1);
          animation: subtlePulse 4s infinite ease-in-out;
          
          &[data-badge-content="New"] {
            background: linear-gradient(135deg, #00D4AA 0%, #01A085 100%);
            box-shadow: 
              0 4px 16px rgba(0, 212, 170, 0.5),
              0 0 0 1px rgba(255, 255, 255, 0.1);
          }
        }
      }
    }
  }
  
  @keyframes subtlePulse {
    0%, 100% { 
      transform: scale(1);
      opacity: 1;
    }
    50% { 
      transform: scale(1.12);
      opacity: 0.8;
    }
  }
`
);

const MainMenuItem = styled(ListItem)(
  ({ theme }) => `
  padding: ${theme.spacing(0.6, 1.5)};
  margin: ${theme.spacing(2.5, 1.5, 3.5)};
  border-radius: 24px;
  
  .MuiButton-root {
    background: linear-gradient(135deg, 
      ${theme.palette.primary.dark} 0%, 
      ${theme.palette.primary.main} 35%, 
      ${theme.palette.primary.light} 70%,
      ${theme.palette.primary.main} 100%);
    color: #FFFFFF;
    font-weight: 700;
    font-size: ${theme.typography.pxToRem(14.5)};
    padding: ${theme.spacing(2.5, 3.2)};
    border-radius: 24px;
    border: none;
    box-shadow: 
      0 16px 48px ${theme.palette.primary.main}30,
      0 6px 20px ${theme.palette.primary.main}25,
      inset 0 2px 0 rgba(255, 255, 255, 0.2),
      inset 0 -2px 0 rgba(0, 0, 0, 0.1);
    transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    position: relative;
    overflow: hidden;
    backdrop-filter: blur(20px);
    
    &:before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
      transition: left 0.8s ease;
    }
    
    &:after {
      content: '';
      position: absolute;
      top: -50%;
      left: -50%;
      width: 200%;
      height: 200%;
      background: radial-gradient(circle, rgba(255, 255, 255, 0.15) 0%, transparent 70%);
      transform: scale(0);
      transition: transform 0.6s ease;
    }
    
    &:hover {
      background: linear-gradient(135deg, 
        ${theme.palette.primary.main} 0%, 
        ${theme.palette.primary.light} 35%, 
        ${theme.palette.primary.main} 70%,
        ${theme.palette.primary.dark} 100%);
      transform: translateY(-6px) scale(1.03);
      box-shadow: 
        0 20px 60px ${theme.palette.primary.main}40,
        0 10px 24px ${theme.palette.primary.main}30,
        inset 0 2px 0 rgba(255, 255, 255, 0.3),
        inset 0 -2px 0 rgba(0, 0, 0, 0.15);
      
      &:before {
        left: 100%;
      }
      
      &:after {
        transform: scale(1);
      }
    }
    
    &:active {
      transform: translateY(-3px) scale(0.98);
    }
    
    .MuiButton-startIcon {
      color: #FFFFFF;
      font-size: ${theme.typography.pxToRem(21)};
      filter: drop-shadow(0 3px 6px rgba(0, 0, 0, 0.3));
      margin-right: ${theme.spacing(1.8)};
    }
  }
`
);

const SectionDivider = styled(Divider)(
  ({ theme }) => `
  margin: ${theme.spacing(4.5, 2.5, 3.5)};
  background: transparent;
  border: none;
  height: 1px;
  position: relative;
  
  &:before {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    height: 1px;
    background: linear-gradient(90deg, 
      transparent 0%, 
      rgba(255, 255, 255, 0.08) 15%, 
      ${theme.palette.primary.main}40 50%, 
      rgba(255, 255, 255, 0.08) 85%, 
      transparent 100%);
  }
  
  &:after {
    content: '';
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%);
    box-shadow: 
      0 0 0 3px rgba(20, 20, 20, 0.9), 
      0 0 0 5px rgba(255, 255, 255, 0.08),
      0 0 12px ${theme.palette.primary.main}60;
  }
`
);

// Custom component for text that prevents wrapping but shows full text
const NoWrapText = styled(Typography)`
  white-space: nowrap;
  flex: 1;
  font-size: inherit;
  font-weight: inherit;
  color: inherit;
`;

function SidebarMenu() {
  const { closeSidebar } = useContext(SidebarContext);

  return (
    <MenuWrapper>
      {/* Dashboard - Highlighted */}
      <List component="div">
        <SubMenuWrapper>
          <List component="div">
            <MainMenuItem component="div">
              <Button
                disableRipple
                component={RouterLink}
                onClick={closeSidebar}
                to="/beneficiary/dashboard"
                startIcon={<DashboardTwoToneIcon />}
                fullWidth
              >
                Dashboard
              </Button>
            </MainMenuItem>
          </List>
        </SubMenuWrapper>
      </List>

      <SectionDivider />

      {/* Profile Section */}
      <List
        component="div"
        subheader={<ListSubheader component="div" disableSticky>My Profile</ListSubheader>}
      >
        <SubMenuWrapper>
          <List component="div">
            <ListItem component="div">
              <Button
                disableRipple
                component={RouterLink}
                onClick={closeSidebar}
                to="/beneficiary/profile/details"
                startIcon={<PersonTwoToneIcon />}
                fullWidth
              >
                <NoWrapText>Personal Details</NoWrapText>
              </Button>
            </ListItem>
            <ListItem component="div">
              <Button
                disableRipple
                component={RouterLink}
                onClick={closeSidebar}
                to="/beneficiary/profile/farm"
                startIcon={<AssignmentIndTwoToneIcon />}
                fullWidth
              >
                <NoWrapText>Farm Information</NoWrapText>
              </Button>
            </ListItem>
          </List>
        </SubMenuWrapper>
      </List>

      {/* RSBSA Section */}
      <List
        component="div"
        subheader={<ListSubheader component="div" disableSticky>RSBSA Registration</ListSubheader>}
      >
        <SubMenuWrapper>
          <List component="div">
            <ListItem component="div">
              <Button
                disableRipple
                component={RouterLink}
                onClick={closeSidebar}
                to="/beneficiary/RSBSA_FORM"
                startIcon={<CardMembershipTwoToneIcon />}
                fullWidth
              >
                <NoWrapText>Apply for RSBSA</NoWrapText>
              </Button>
            </ListItem>
            <ListItem component="div">
              <Button
                disableRipple
                component={RouterLink}
                onClick={closeSidebar}
                to="/beneficiary/rsbsa/status"
                startIcon={<CheckCircleOutlineTwoToneIcon />}
                fullWidth
              >
                <NoWrapText>Application Status</NoWrapText>
              </Button>
            </ListItem>
          </List>
        </SubMenuWrapper>
      </List>

      {/* Benefits Section */}
      <List
        component="div"
        subheader={<ListSubheader component="div" disableSticky>Benefits & Programs</ListSubheader>}
      >
        <SubMenuWrapper>
          <List component="div">
            <ListItem component="div">
              <Button
                disableRipple
                component={RouterLink}
                onClick={closeSidebar}
                to="/beneficiary/benefits/available"
                startIcon={<RedeemTwoToneIcon />}
                fullWidth
              >
                <NoWrapText>Available Programs</NoWrapText>
              </Button>
            </ListItem>
            <ListItem component="div">
              <Badge badgeContent={3} color="error">
                <Button
                  disableRipple
                  component={RouterLink}
                  onClick={closeSidebar}
                  to="/beneficiary/benefits/notifications"
                  startIcon={<NotificationsActiveTwoToneIcon />}
                  fullWidth
                >
                  <NoWrapText>Upcoming Distribution</NoWrapText>
                </Button>
              </Badge>
            </ListItem>
            <ListItem component="div">
              <Badge badgeContent={2} color="primary">
                <Button
                  disableRipple
                  component={RouterLink}
                  onClick={closeSidebar}
                  to="/beneficiary/benefits/pickup"
                  startIcon={<LocalShippingTwoToneIcon />}
                  fullWidth
                >
                  <NoWrapText>Ready for Pickup</NoWrapText>
                </Button>
              </Badge>
            </ListItem>
          </List>
        </SubMenuWrapper>
      </List>

      {/* History Section */}
      <List
        component="div"
        subheader={<ListSubheader component="div" disableSticky>Transaction History</ListSubheader>}
      >
        <SubMenuWrapper>
          <List component="div">
            <ListItem component="div">
              <Button
                disableRipple
                component={RouterLink}
                onClick={closeSidebar}
                to="/beneficiary/history/received"
                startIcon={<HistoryTwoToneIcon />}
                fullWidth
              >
                <NoWrapText>Benefits Received</NoWrapText>
              </Button>
            </ListItem>
            <ListItem component="div">
              <Button
                disableRipple
                component={RouterLink}
                onClick={closeSidebar}
                to="/beneficiary/history/documents"
                startIcon={<ReceiptLongTwoToneIcon />}
                fullWidth
              >
                <NoWrapText>Documents & Records</NoWrapText>
              </Button>
            </ListItem>
          </List>
        </SubMenuWrapper>
      </List>

      <SectionDivider />

      {/* Support Section */}
      <List
        component="div"
        subheader={<ListSubheader component="div" disableSticky>Help & Support</ListSubheader>}
      >
        <SubMenuWrapper>
          <List component="div">
            <ListItem component="div">
              <Button
                disableRipple
                component={RouterLink}
                onClick={closeSidebar}
                to="/beneficiary/resources"
                startIcon={<LibraryBooksTwoToneIcon />}
                fullWidth
              >
                <NoWrapText>Resources & Guides</NoWrapText>
              </Button>
            </ListItem>
            <ListItem component="div">
              <Button
                disableRipple
                component={RouterLink}
                onClick={closeSidebar}
                to="/beneficiary/support"
                startIcon={<SupportAgentTwoToneIcon />}
                fullWidth
              >
                <NoWrapText>Contact Support</NoWrapText>
              </Button>
            </ListItem>
            <ListItem component="div">
              <Button
                disableRipple
                component={RouterLink}
                onClick={closeSidebar}
                to="/beneficiary/settings"
                startIcon={<SettingsTwoToneIcon />}
                fullWidth
              >
                <NoWrapText>Account Settings</NoWrapText>
              </Button>
            </ListItem>
          </List>
        </SubMenuWrapper>
      </List>
    </MenuWrapper>
  );
}

export default SidebarMenu;