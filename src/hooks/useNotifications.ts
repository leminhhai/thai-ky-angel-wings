
import { useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Json } from '@/integrations/supabase/types';

export const useNotifications = () => {
  const subscribeToNotifications = useCallback(async (dueDate: Date) => {
    try {
      // Request permission
      const permission = await Notification.requestPermission();
      if (permission !== 'granted') {
        throw new Error('Notification permission denied');
      }

      // Register service worker
      const registration = await navigator.serviceWorker.register('/sw.js');
      
      // VAPID public key (actual key would be provided by your backend)
      const vapidPublicKey = 'BGk2Rx3DEjXdRv9qEzYPrD5e-WyIgvJOOx0-M1Ar3V16gi8o1qrQwOJjgV4OZ1zhFoXgc9bQ7FOQbZnXfP63o-s';
      
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: vapidPublicKey
      });

      // Store subscription in database
      const { error } = await supabase
        .from('notification_subscriptions')
        .insert({
          due_date: dueDate.toISOString(),
          browser_subscription: subscription as unknown as Json
        });

      if (error) throw error;

      return true;
    } catch (error) {
      console.error('Error subscribing to notifications:', error);
      return false;
    }
  }, []);

  return { subscribeToNotifications };
};

export default useNotifications;
