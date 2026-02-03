import { memo } from 'react';
import useNotification from '../hooks/useNotification';

const NotificationBanner = memo(function NotificationBanner() {
  const { notifications, removeNotification } = useNotification();

  if (notifications.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 max-w-sm">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`flex items-center gap-3 p-4 rounded-lg shadow-lg animate-slide-in ${
            notification.type === 'success' 
              ? 'bg-green-500 text-white' 
              : notification.type === 'error'
              ? 'bg-red text-white'
              : 'bg-rose-900 text-white'
          }`}
        >
          {notification.type === 'success' && (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 20 20">
              <path fill="currentColor" d="M10 0C4.48 0 0 4.48 0 10s4.48 10 10 10 10-4.48 10-10S15.52 0 10 0Zm-2 15-5-5 1.41-1.41L8 12.17l7.59-7.59L17 6l-9 9Z"/>
            </svg>
          )}
          <span className="flex-1 text-sm font-medium">{notification.message}</span>
          <button
            onClick={() => removeNotification(notification.id)}
            className="hover:opacity-70 transition-opacity"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 10 10">
              <path fill="currentColor" d="M8.375 9.375 5 6 1.625 9.375l-1-1L4 5 .625 1.625l1-1L5 4 8.375.625l1 1L6 5l3.375 3.375-1 1Z"/>
            </svg>
          </button>
        </div>
      ))}
    </div>
  );
});

export default NotificationBanner;
