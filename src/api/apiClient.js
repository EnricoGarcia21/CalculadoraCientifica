// Minimal API client to replace Base44 SDK usage.
import { appParams } from '@/lib/app-params';

const safeJson = async (res) => {
  const text = await res.text();
  try { return JSON.parse(text); } catch { return text; }
};

export const apiClient = {
  auth: {
    me: async () => {
      // Try common endpoint for current user. Caller handles thrown errors.
      const res = await fetch('/api/auth/me', { credentials: 'include', headers: { 'X-App-Id': appParams.appId } });
      if (!res.ok) {
        const err = new Error('Not authenticated');
        err.status = res.status;
        err.data = await safeJson(res);
        throw err;
      }
      return safeJson(res);
    },
    logout: (redirectUrl) => {
      try { localStorage.removeItem('token'); localStorage.removeItem('access_token'); } catch {}
      if (redirectUrl) window.location.href = redirectUrl;
    },
    redirectToLogin: (redirectUrl) => {
      const target = `/login${redirectUrl ? `?redirect=${encodeURIComponent(redirectUrl)}` : ''}`;
      window.location.href = target;
    }
  },
  appLogs: {
    logUserInApp: async (pageName) => {
      try {
        await fetch('/api/app-logs', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'X-App-Id': appParams.appId },
          body: JSON.stringify({ page: pageName })
        });
      } catch (e) {
        // Swallow errors; logging must not break the app
      }
    }
  }
};

export default apiClient;
