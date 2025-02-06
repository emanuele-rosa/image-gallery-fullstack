import { createContext, useContext, useState } from 'react';
import { XCircle, CheckCircle, AlertCircle } from 'lucide-react';

const NotificationContext = createContext(null);

// eslint-disable-next-line react/prop-types
export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const addNotification = (message, type = 'info') => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(notification => notification.id !== id));
    }, 5000);
  };

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  return (
    <NotificationContext.Provider value={{ addNotification }}>
      {children}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {notifications.map(({ id, message, type }) => (
          <div
            key={id}
            className={`flex items-center p-4 rounded-lg shadow-lg ${
              type === 'success' ? 'bg-green-100 text-green-800' :
              type === 'error' ? 'bg-red-100 text-red-800' :
              'bg-blue-100 text-blue-800'
            }`}
          >
            <div className="mr-3">
              {type === 'success' ? <CheckCircle className="w-5 h-5" /> :
               type === 'error' ? <XCircle className="w-5 h-5" /> :
               <AlertCircle className="w-5 h-5" />}
            </div>
            <p className="text-sm font-medium">{message}</p>
            <button
              onClick={() => removeNotification(id)}
              className="ml-4 text-gray-500 hover:text-gray-700"
            >
              <XCircle className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification deve ser usado dentro de um NotificationProvider');
  }
  return context;
};

export default NotificationProvider;