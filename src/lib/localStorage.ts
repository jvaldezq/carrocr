export const storeToken = (token: string): void => {
  if (token) {
    try {
      sessionStorage.setItem('authToken', token);
    } catch (error) {
      console.error('Error saving token:', error);
    }
  } else {
    console.warn('No token found.');
  }
};

export const getStoredToken = (): string | null => {
  try {
    return sessionStorage.getItem('authToken');
  } catch (error) {
    console.error('Error retrieving token:', error);
    return null;
  }
};

export const removeStoredToken = (): void => {
  try {
    sessionStorage.removeItem('authToken');
  } catch (error) {
    console.error('Error removing token:', error);
  }
};
