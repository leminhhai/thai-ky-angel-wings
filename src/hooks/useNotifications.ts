
import { useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

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
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        // You'll need to replace this with your VAPID public key
        applicationServerKey: 'YOUR_VAPID_PUBLIC_KEY'
      });

      // Store subscription in database
      const { error } = await supabase
        .from('notification_subscriptions')
        .insert([
          {
            due_date: dueDate.toISOString(),
            browser_subscription: subscription
          }
        ]);

      if (error) throw error;

      toast.success('Đã bật thông báo thành công!');
      return true;
    } catch (error) {
      console.error('Error subscribing to notifications:', error);
      toast.error('Không thể bật thông báo. Vui lòng thử lại sau.');
      return false;
    }
  }, []);

  return { subscribeToNotifications };
};

export default useNotifications;
