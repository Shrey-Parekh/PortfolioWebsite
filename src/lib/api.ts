// API configuration utility
export const getApiUrl = (): string => {
  return import.meta.env.VITE_API_URL || 
         import.meta.env.VITE_API_BASE_URL || 
         'https://portfolio-website-1-5m6o.onrender.com';
};

// Health check function
export const checkBackendHealth = async (): Promise<{
  status: 'healthy' | 'unhealthy';
  message: string;
  timestamp?: string;
}> => {
  try {
    const apiUrl = getApiUrl();
    const response = await fetch(`${apiUrl}/health`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const result = await response.json();

    if (response.ok && result.status === 'OK') {
      return {
        status: 'healthy',
        message: 'Backend is running smoothly',
        timestamp: result.timestamp
      };
    } else {
      return {
        status: 'unhealthy',
        message: 'Backend responded but with issues'
      };
    }
  } catch (error) {
    return {
      status: 'unhealthy',
      message: 'Unable to connect to backend'
    };
  }
};

// Contact form submission
export const submitContactForm = async (formData: {
  name: string;
  email: string;
  subject: string;
  message: string;
}): Promise<{
  success: boolean;
  message: string;
}> => {
  try {
    const apiUrl = getApiUrl();
    
    const response = await fetch(`${apiUrl}/api/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const result = await response.json();

    if (response.ok && result.success) {
      return {
        success: true,
        message: result.message || 'Message sent successfully!'
      };
    } else {
      return {
        success: false,
        message: result.message || 'Failed to send message. Please try again.'
      };
    }
  } catch (error) {
    return {
      success: false,
      message: 'Network error. Please check your connection and try again.'
    };
  }
};