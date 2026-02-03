import { useContext } from 'react';
import { NotificationContext } from '../context/NotificationContext';
import type { NotificationContextValue } from '../types';

export default function useNotification(): NotificationContextValue {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
}
