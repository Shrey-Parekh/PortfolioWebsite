import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, AlertCircle, Clock } from 'lucide-react';
import { checkBackendHealth } from '../lib/api';

interface HealthCheckProps {
  isDarkMode: boolean;
}

interface HealthStatus {
  status: 'checking' | 'healthy' | 'unhealthy';
  message: string;
  timestamp?: string;
}

const HealthCheck: React.FC<HealthCheckProps> = ({ isDarkMode }) => {
  const [health, setHealth] = useState<HealthStatus>({
    status: 'checking',
    message: 'Checking backend connection...'
  });

  useEffect(() => {
    const performHealthCheck = async () => {
      const result = await checkBackendHealth();
      setHealth({
        status: result.status === 'healthy' ? 'healthy' : 'unhealthy',
        message: result.message,
        timestamp: result.timestamp
      });
    };

    performHealthCheck();
    // Check health every 30 seconds
    const interval = setInterval(performHealthCheck, 30000);
    
    return () => clearInterval(interval);
  }, []);

  const getStatusIcon = () => {
    switch (health.status) {
      case 'checking':
        return <Clock className="w-5 h-5 text-blue-500" />;
      case 'healthy':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'unhealthy':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
    }
  };

  const getStatusColor = () => {
    switch (health.status) {
      case 'checking':
        return 'border-blue-200 bg-blue-50';
      case 'healthy':
        return 'border-green-200 bg-green-50';
      case 'unhealthy':
        return 'border-red-200 bg-red-50';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`inline-flex items-center space-x-2 px-4 py-2 rounded-lg border ${getStatusColor()}`}
    >
      {health.status === 'checking' ? (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          {getStatusIcon()}
        </motion.div>
      ) : (
        getStatusIcon()
      )}
      <span className="text-sm font-medium text-gray-700">
        {health.message}
      </span>
      {health.timestamp && (
        <span className="text-xs text-gray-500">
          {new Date(health.timestamp).toLocaleTimeString()}
        </span>
      )}
    </motion.div>
  );
};

export default HealthCheck;