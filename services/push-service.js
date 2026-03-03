import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';

const NOTIFICATION_HISTORY_KEY = 'notification_history';
const MAX_HISTORY_SIZE = 50;

/**
 * Send booking confirmation notification (car rental)
 * @param {Object} bookingDetails - Booking information
 * @param {string} bookingDetails.carBrand - Car brand name
 * @param {string} bookingDetails.carModel - Car model name
 * @param {number} [bookingDetails.rentalDays] - Number of rental days
 * @param {number} [bookingDetails.totalPrice] - Total booking price
 * @param {string} [bookingDetails.bookingId] - Unique booking ID
 * @returns {Promise<string>} - Notification identifier
 */
export async function sendBookingConfirmationNotification(bookingDetails) {
  const { carBrand, carModel, rentalDays, totalPrice, bookingId } = bookingDetails;
  const carTitle = [carBrand, carModel].filter(Boolean).join(' ') || 'Your car';

  const title = '🎉 Booking Confirmed!';
  const body =
    rentalDays != null && totalPrice != null
      ? `Your ${carTitle} is reserved for ${rentalDays} day${rentalDays === 1 ? '' : 's'}. Total: $${Number(totalPrice).toFixed(2)}`
      : `Your ${carTitle} is reserved and waiting for you.`;

  const data = {
    type: 'booking_confirmed',
    carBrand,
    carModel,
    rentalDays,
    totalPrice,
    bookingId,
    timestamp: new Date().toISOString(),
  };

  return sendLocalNotification({ title, body, data });
}

/**
 * Send a local push notification immediately
 * @param {Object} params - Notification parameters
 * @param {string} params.title - Notification title
 * @param {string} params.body - Notification body
 * @param {Object} [params.data] - Additional data (type, bookingId, etc.)
 * @returns {Promise<string>} - Notification identifier
 */
export async function sendLocalNotification({ title, body, data = {} }) {
  try {
    const payload = {
      ...data,
      title,
      body,
    };

    const notificationId = await Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
        data: payload,
        sound: true,
        priority: Notifications.AndroidNotificationPriority.HIGH,
        vibrate: [0, 250, 250, 250],
        badge: 1,
      },
      trigger: null,
    });

    await saveNotificationToHistory({
      id: notificationId,
      title,
      body,
      data: payload,
    });

    return notificationId;
  } catch (error) {
    console.error('Error sending local notification:', error);
    throw error;
  }
}

/**
 * Schedule a notification for later
 * @param {Object} params - Notification parameters
 * @param {string} params.title - Notification title
 * @param {string} params.body - Notification body
 * @param {Object} [params.data] - Additional data
 * @param {number} [params.seconds=60] - Seconds from now to trigger
 * @returns {Promise<string>} - Notification identifier
 */
export async function scheduleNotification({ title, body, data = {}, seconds = 60 }) {
  try {
    const payload = { ...data, title, body };

    const notificationId = await Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
        data: payload,
        sound: true,
        priority: Notifications.AndroidNotificationPriority.HIGH,
        vibrate: [0, 250, 250, 250],
        badge: 1,
      },
      trigger: { seconds },
    });

    await saveNotificationToHistory({
      id: notificationId,
      title,
      body,
      data: payload,
      scheduledAt: new Date(Date.now() + seconds * 1000).toISOString(),
    });

    return notificationId;
  } catch (error) {
    console.error('Error scheduling notification:', error);
    throw error;
  }
}

/**
 * Send payment confirmation notification (car rental)
 * @param {Object} paymentDetails - Payment information
 * @param {number} paymentDetails.amount - Payment amount
 * @param {string} [paymentDetails.car] - Car name (e.g. "Bentley Continental GT")
 * @param {number} [paymentDetails.totalDays] - Rental days
 * @param {number} [paymentDetails.totalPrice] - Total price
 * @param {string} [paymentDetails.cardNumber] - Last 4 digits of card
 * @param {string} [paymentDetails.paymentId] - Unique payment ID
 * @returns {Promise<string>} - Notification identifier
 */
export async function sendPaymentConfirmationNotification(paymentDetails) {
  const { amount, car, totalDays, totalPrice, cardNumber, paymentId } = paymentDetails;

  const title = '💳 Payment Successful';
  const body = `Your payment of $${Number(amount).toFixed(2)} has been processed successfully.`;

  const data = {
    type: 'payment_confirmed',
    car,
    totalDays,
    totalPrice,
    paymentId,
    cardNumber,
    timestamp: new Date().toISOString(),
  };

  return sendLocalNotification({ title, body, data });
}

/**
 * Save notification to history (AsyncStorage)
 * @param {Object} notification - Notification to save
 * @param {string} notification.id - Notification ID
 * @param {string} notification.title - Title
 * @param {string} notification.body - Body
 * @param {Object} [notification.data] - Data payload
 * @param {string} [notification.scheduledAt] - Scheduled time (ISO string)
 */
export async function saveNotificationToHistory(notification) {
  try {
    const existing = await AsyncStorage.getItem(NOTIFICATION_HISTORY_KEY);
    const history = existing ? JSON.parse(existing) : [];

    const item = {
      id: notification.id,
      title: notification.title,
      body: notification.body,
      data: notification.data || {},
      receivedAt: new Date().toISOString(),
      scheduledAt: notification.scheduledAt || '',
    };

    history.unshift(item);
    const trimmed = history.slice(0, MAX_HISTORY_SIZE);
    await AsyncStorage.setItem(NOTIFICATION_HISTORY_KEY, JSON.stringify(trimmed));
  } catch (error) {
    console.error('Error saving notification to history:', error);
  }
}

/**
 * Get notification history
 * @returns {Promise<Array<{ id: string, title: string, body: string, data: Object, receivedAt: string, scheduledAt: string }>>}
 */
export async function getNotificationHistory() {
  try {
    const raw = await AsyncStorage.getItem(NOTIFICATION_HISTORY_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (error) {
    console.error('Error getting notification history:', error);
    return [];
  }
}

/**
 * Clear notification history
 */
export async function clearNotificationHistory() {
  try {
    await AsyncStorage.removeItem(NOTIFICATION_HISTORY_KEY);
  } catch (error) {
    console.error('Error clearing notification history:', error);
  }
}

/**
 * Server push payload for car rental (for backend/Expo push)
 * @param {Object} params - Car rental notification params
 * @param {string} params.pushToken - Expo push token
 * @param {string} params.title - Title
 * @param {string} params.body - Body
 * @param {Object} params.data - Data payload
 */
export function getServerNotificationPayload({ pushToken, title, body, data = {} }) {
  return {
    to: pushToken,
    sound: 'default',
    title,
    body,
    data: { title, body, ...data },
    priority: 'high',
    channelId: 'car-rental-updates',
  };
}
