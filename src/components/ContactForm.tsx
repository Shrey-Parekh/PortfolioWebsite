import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';
import { submitContactForm } from '../lib/api';

interface ContactFormProps {
  isDarkMode: boolean;
}

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormStatus {
  type: 'idle' | 'loading' | 'success' | 'error';
  message: string;
}

const ContactForm: React.FC<ContactFormProps> = ({ isDarkMode }) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [status, setStatus] = useState<FormStatus>({
    type: 'idle',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ type: 'loading', message: 'Sending message...' });

    const result = await submitContactForm(formData);

    if (result.success) {
      setStatus({
        type: 'success',
        message: result.message
      });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } else {
      setStatus({
        type: 'error',
        message: result.message
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 1,
        delay: 1.4,
        ease: [0.23, 1, 0.32, 1],
      }}
      className="space-y-8"
    >
      <div className="text-center">
        <h3
          className="text-2xl lg:text-3xl font-bold mb-4"
          style={{
            color: isDarkMode ? "#FFFFFF" : "#1F2937",
            fontFamily: '"SF Pro Display", -apple-system, BlinkMacSystemFont, sans-serif',
          }}
        >
          Send me a message
        </h3>
        <p
          className="text-lg"
          style={{
            color: isDarkMode ? "#9CA3AF" : "#6B7280",
            fontFamily: '"SF Pro Text", -apple-system, BlinkMacSystemFont, sans-serif',
          }}
        >
          I'd love to hear from you
        </p>
      </div>

      <motion.div
        className="max-w-2xl mx-auto"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.8,
          delay: 1.6,
          ease: [0.23, 1, 0.32, 1],
        }}
      >
        <div
          className="p-8 rounded-3xl relative overflow-hidden"
          style={{
            background: isDarkMode
              ? "linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.05) 100%)"
              : "linear-gradient(135deg, #F8FAFC 0%, #F1F5F9 100%)",
            border: isDarkMode
              ? "2px solid rgba(99, 102, 241, 0.2)"
              : "2px solid rgba(99, 102, 241, 0.1)",
            boxShadow: isDarkMode
              ? "0 20px 60px rgba(99, 102, 241, 0.15)"
              : "0 20px 60px rgba(99, 102, 241, 0.1)",
          }}
        >
          {/* Animated Background Pattern */}
          <motion.div
            className="absolute inset-0 opacity-20"
            style={{
              background: `radial-gradient(circle at 30% 70%, ${
                isDarkMode ? "#6366F1" : "#FBBF24"
              }30 0%, transparent 50%)`,
            }}
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 90, 180, 270, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium mb-2"
                  style={{
                    color: isDarkMode ? "#D1D5DB" : "#374151",
                    fontFamily: '"SF Pro Text", -apple-system, BlinkMacSystemFont, sans-serif',
                  }}
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border transition-all duration-200 focus:outline-none focus:ring-2"
                  style={{
                    background: isDarkMode ? "#2C2C2E" : "#FFFFFF",
                    border: isDarkMode ? "1px solid #3A3A3C" : "1px solid #D1D5DB",
                    color: isDarkMode ? "#FFFFFF" : "#1F2937",
                    fontFamily: '"SF Pro Text", -apple-system, BlinkMacSystemFont, sans-serif',
                  }}
                  placeholder="Your name"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-2"
                  style={{
                    color: isDarkMode ? "#D1D5DB" : "#374151",
                    fontFamily: '"SF Pro Text", -apple-system, BlinkMacSystemFont, sans-serif',
                  }}
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border transition-all duration-200 focus:outline-none focus:ring-2"
                  style={{
                    background: isDarkMode ? "#2C2C2E" : "#FFFFFF",
                    border: isDarkMode ? "1px solid #3A3A3C" : "1px solid #D1D5DB",
                    color: isDarkMode ? "#FFFFFF" : "#1F2937",
                    fontFamily: '"SF Pro Text", -apple-system, BlinkMacSystemFont, sans-serif',
                  }}
                  placeholder="your.email@example.com"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="subject"
                className="block text-sm font-medium mb-2"
                style={{
                  color: isDarkMode ? "#D1D5DB" : "#374151",
                  fontFamily: '"SF Pro Text", -apple-system, BlinkMacSystemFont, sans-serif',
                }}
              >
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 rounded-xl border transition-all duration-200 focus:outline-none focus:ring-2"
                style={{
                  background: isDarkMode ? "#2C2C2E" : "#FFFFFF",
                  border: isDarkMode ? "1px solid #3A3A3C" : "1px solid #D1D5DB",
                  color: isDarkMode ? "#FFFFFF" : "#1F2937",
                  fontFamily: '"SF Pro Text", -apple-system, BlinkMacSystemFont, sans-serif',
                }}
                placeholder="What's this about?"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium mb-2"
                style={{
                  color: isDarkMode ? "#D1D5DB" : "#374151",
                  fontFamily: '"SF Pro Text", -apple-system, BlinkMacSystemFont, sans-serif',
                }}
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                rows={5}
                className="w-full px-4 py-3 rounded-xl border transition-all duration-200 focus:outline-none focus:ring-2 resize-none"
                style={{
                  background: isDarkMode ? "#2C2C2E" : "#FFFFFF",
                  border: isDarkMode ? "1px solid #3A3A3C" : "1px solid #D1D5DB",
                  color: isDarkMode ? "#FFFFFF" : "#1F2937",
                  fontFamily: '"SF Pro Text", -apple-system, BlinkMacSystemFont, sans-serif',
                }}
                placeholder="Tell me about your project, idea, or just say hello..."
              />
            </div>

            {/* Status Message */}
            {status.type !== 'idle' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex items-center space-x-2 p-4 rounded-xl ${
                  status.type === 'success'
                    ? 'bg-green-50 border border-green-200'
                    : status.type === 'error'
                    ? 'bg-red-50 border border-red-200'
                    : 'bg-blue-50 border border-blue-200'
                }`}
              >
                {status.type === 'success' && (
                  <CheckCircle className="w-5 h-5 text-green-600" />
                )}
                {status.type === 'error' && (
                  <AlertCircle className="w-5 h-5 text-red-600" />
                )}
                {status.type === 'loading' && (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full"
                  />
                )}
                <p
                  className={`text-sm font-medium ${
                    status.type === 'success'
                      ? 'text-green-800'
                      : status.type === 'error'
                      ? 'text-red-800'
                      : 'text-blue-800'
                  }`}
                >
                  {status.message}
                </p>
              </motion.div>
            )}

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={status.type === 'loading'}
              whileHover={{
                scale: status.type === 'loading' ? 1 : 1.02,
                transition: { duration: 0.2 },
              }}
              whileTap={{
                scale: status.type === 'loading' ? 1 : 0.98,
              }}
              className="w-full py-4 px-6 rounded-xl font-semibold text-white transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                background: isDarkMode
                  ? "linear-gradient(135deg, #6366F1, #8B5CF6)"
                  : "linear-gradient(135deg, #FBBF24, #F59E0B)",
                boxShadow: isDarkMode
                  ? "0 8px 32px rgba(99, 102, 241, 0.3)"
                  : "0 8px 32px rgba(251, 191, 36, 0.3)",
                fontFamily: '"SF Pro Text", -apple-system, BlinkMacSystemFont, sans-serif',
              }}
            >
              {status.type === 'loading' ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                  />
                  <span>Sending...</span>
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  <span>Send Message</span>
                </>
              )}
            </motion.button>
          </form>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ContactForm;