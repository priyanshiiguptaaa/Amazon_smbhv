export const LOG_LEVELS = {
  INFO: 'info',
  WARNING: 'warning',
  ERROR: 'error',
  DEBUG: 'debug'
};

export const ACTIVITY_TYPES = {
  DOCUMENT_UPLOAD: 'document_upload',
  DOCUMENT_VIEW: 'document_view',
  DOCUMENT_DELETE: 'document_delete',
  DOCUMENT_SIGN: 'document_sign',
  USER_LOGIN: 'user_login',
  USER_LOGOUT: 'user_logout',
  INVENTORY_UPDATE: 'inventory_update'
};

const formatLogMessage = (level, type, message, metadata = {}) => {
  return {
    timestamp: new Date().toISOString(),
    level,
    type,
    message,
    metadata: {
      ...metadata,
      environment: import.meta.env.MODE,
    }
  };
};

export const logActivity = async (type, message, metadata = {}, level = LOG_LEVELS.INFO) => {
  const logData = formatLogMessage(level, type, message, metadata);
  
  // In development, log to console
  if (import.meta.env.DEV) {
    console.log(`[${logData.level.toUpperCase()}] ${logData.type}: ${logData.message}`, metadata);
  }

  try {
    // Replace with actual API endpoint for production
    await fetch('/api/logs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(logData),
    });
  } catch (error) {
    console.error('Failed to send log:', error);
    // Log locally if API fails
    console.warn('Fallback logging:', logData);
  }
};
