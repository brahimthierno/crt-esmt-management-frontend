// VERSION DE DEEPSEEK
import React, { createContext, useContext, useState } from 'react';

const NotificationContext = createContext();

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const addNotification = (notification) => {
    const id = Date.now() + Math.random();
    const newNotification = { ...notification, id };
    setNotifications(prev => [...prev, newNotification]);
    return id;
  };

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const showSuccess = (title, message, duration = 5000) => {
    return addNotification({ type: 'success', title, message, duration });
  };

  const showError = (title, message, duration = 5000) => {
    return addNotification({ type: 'error', title, message, duration });
  };

  const showWarning = (title, message, duration = 5000) => {
    return addNotification({ type: 'warning', title, message, duration });
  };

  const showInfo = (title, message, duration = 5000) => {
    return addNotification({ type: 'info', title, message, duration });
  };

  const value = {
    notifications,
    addNotification,
    removeNotification,
    clearAllNotifications,
    showSuccess,
    showError,
    showWarning,
    showInfo
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};