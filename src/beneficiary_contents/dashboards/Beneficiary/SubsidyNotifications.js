import React, { useState, useEffect } from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Typography,
  Box,
  Chip,
  Badge,
  Divider
} from '@mui/material';
import { 
  Notifications,
  NotificationsActive,
  Info,
  Warning,
  CheckCircle,
  Delete,
  MarkEmailRead
} from '@mui/icons-material';

function SubsidyNotifications() {
  const defaultNotifications = [
    {
      id: 1,
      title: 'Rice Production Support - Approved!',
      message: 'Your application for Rice Production Support has been approved. Expected release: August 20, 2024.',
      type: 'success',
      date: '2024-08-16',
      time: '10:30 AM',
      read: false,
      priority: 'high'
    },
    {
      id: 2,
      title: 'Document Submission Required',
      message: 'Please submit your updated land title for the Farm Equipment Assistance program.',
      type: 'warning',
      date: '2024-08-15',
      time: '2:15 PM',
      read: false,
      priority: 'urgent'
    },
    {
      id: 3,
      title: 'Training Schedule Available',
      message: 'Organic Farming Training scheduled for August 25-27, 2024. Register now!',
      type: 'info',
      date: '2024-08-14',
      time: '9:00 AM',
      read: true,
      priority: 'medium'
    }
  ];

  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem('notifications');
    if (stored) {
      try {
        setNotifications(JSON.parse(stored));
      } catch (err) {
        console.error('Error parsing notifications from localStorage', err);
        setNotifications(defaultNotifications);
      }
    } else {
      setNotifications(defaultNotifications);
    }
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  const getNotificationIcon = (type, priority) => {
    if (priority === 'urgent') return <Warning color="error" />;
    switch (type) {
      case 'success': return <CheckCircle color="success" />;
      case 'warning': return <Warning color="warning" />;
      case 'info': return <Info color="info" />;
      default: return <Notifications color="action" />;
    }
  };

  const getNotificationColor = (type, priority) => {
    if (priority === 'urgent') return '#ffebee';
    switch (type) {
      case 'success': return '#e8f5e8';
      case 'warning': return '#fff4e6';
      case 'info': return '#e3f2fd';
      default: return '#f5f5f5';
    }
  };

  const handleMarkAsRead = (id) => {
    const updated = notifications.map(n => n.id === id ? { ...n, read: true } : n);
    setNotifications(updated);
    localStorage.setItem('notifications', JSON.stringify(updated));
  };

  const handleDelete = (id) => {
    const updated = notifications.filter(n => n.id !== id);
    setNotifications(updated);
    localStorage.setItem('notifications', JSON.stringify(updated));
  };

  return (
    <Card>
      <CardHeader 
        title={
          <Box display="flex" alignItems="center">
            <Badge badgeContent={unreadCount} color="error" sx={{ mr: 1 }}>
              <NotificationsActive color="primary" />
            </Badge>
            <Typography variant="h6">Notifications & Updates</Typography>
          </Box>
        }
        subheader={`${notifications.length} total notifications • ${unreadCount} unread`}
      />
      <CardContent sx={{ pt: 0, maxHeight: 400, overflowY: 'auto' }}>
        {notifications.length === 0 ? (
          <Box textAlign="center" py={4}>
            <Notifications sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
            <Typography variant="body1" color="text.secondary">
              No notifications yet
            </Typography>
            <Typography variant="body2" color="text.secondary">
              We'll notify you about your subsidy applications and updates here.
            </Typography>
          </Box>
        ) : (
          <List>
            {notifications.map((notification, index) => (
              <React.Fragment key={notification.id}>
                <ListItem
                  sx={{
                    borderRadius: 2,
                    mb: 1,
                    backgroundColor: notification.read 
                      ? 'transparent' 
                      : getNotificationColor(notification.type, notification.priority),
                    border: notification.read ? '1px solid #e0e0e0' : 'none',
                    '&:hover': {
                      backgroundColor: notification.read 
                        ? '#f5f5f5' 
                        : getNotificationColor(notification.type, notification.priority)
                    }
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    {getNotificationIcon(notification.type, notification.priority)}
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                        <Box flex={1}>
                          <Typography variant="subtitle2" fontWeight={notification.read ? 'normal' : 'bold'}>
                            {notification.title}
                          </Typography>
                          {notification.priority === 'urgent' && (
                            <Chip label="URGENT" color="error" size="small" sx={{ mt: 0.5 }} />
                          )}
                        </Box>
                        <Box display="flex" alignItems="center">
                          {!notification.read && (
                            <IconButton
                              size="small"
                              onClick={() => handleMarkAsRead(notification.id)}
                              title="Mark as read"
                            >
                              <MarkEmailRead fontSize="small" />
                            </IconButton>
                          )}
                          <IconButton
                            size="small"
                            onClick={() => handleDelete(notification.id)}
                            title="Delete notification"
                          >
                            <Delete fontSize="small" />
                          </IconButton>
                        </Box>
                      </Box>
                    }
                    secondary={
                      <Box mt={1}>
                        <Typography variant="body2" color="text.secondary">
                          {notification.message}
                        </Typography>
                        <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
                          {notification.date} • {notification.time}
                        </Typography>
                      </Box>
                    }
                  />
                </ListItem>
                {index < notifications.length - 1 && <Divider variant="middle" />}
              </React.Fragment>
            ))}
          </List>
        )}
      </CardContent>
    </Card>
  );
}

export default SubsidyNotifications;
