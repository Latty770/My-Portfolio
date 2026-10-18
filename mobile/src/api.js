import { Platform } from 'react-native';

const fallbackBase =
  Platform.OS === 'android' ? 'http://10.0.2.2:5000' : 'http://localhost:5000';

const API_BASE = process.env.EXPO_PUBLIC_API_URL || fallbackBase;

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    ...options,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const message = data.errors?.join(' ') || data.message || 'Request failed.';
    throw new Error(message);
  }

  return data;
}

export function getPortfolio() {
  return request('/api/portfolio');
}

export function sendMessage(payload) {
  return request('/api/contact', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}
