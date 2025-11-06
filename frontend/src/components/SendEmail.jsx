import React, { useState } from 'react';
import axios from 'axios';

function SendEmail() {
  const [formData, setFormData] = useState({
    subject: '',
    text: '',
    recipients: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const recipientList = formData.recipients.split(',').map(email => email.trim()).filter(email => email);
      
      if (recipientList.length === 0) {
        setMessage({ type: 'error', text: 'Please add at least one recipient email' });
        setLoading(false);
        return;
      }

      const response = await axios.post('/api/send-bulk-email', {
        subject: formData.subject,
        text: formData.text,
        html: `<p>${formData.text.replace(/\n/g, '<br>')}</p>`,
        recipients: recipientList
      });

      setMessage({ type: 'success', text: `✅ ${response.data.message}. Sent: ${response.data.successCount}, Failed: ${response.data.failedCount}` });
      setFormData({ subject: '', text: '', recipients: '' });
    } catch (error) {
      setMessage({ type: 'error', text: `❌ ${error.response?.data?.message || 'Failed to send emails'}` });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white px-4 py-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 max-w-5xl mx-auto">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-3">
          New Message
        </h2>
        
        {message.text && (
          <div className={`mb-4 p-3 rounded text-sm ${
            message.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'
          }`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-1">
          <div className="border-b border-gray-200 pb-4 mb-4">
            <div className="flex items-center gap-3">
              <label className="text-gray-600 font-medium w-24">To:</label>
              <input
                type="text"
                name="recipients"
                value={formData.recipients}
                onChange={handleChange}
                required
                className="flex-1 px-3 py-2 text-base border-0 border-b-2 border-transparent focus:border-blue-500 focus:outline-none focus:ring-0"
                placeholder="email1@example.com, email2@example.com..."
              />
            </div>
            <p className="text-xs text-gray-500 ml-28 mt-1">
              Separate multiple emails with commas
            </p>
          </div>

          <div className="border-b border-gray-200 py-3">
            <div className="flex items-center gap-3">
              <label className="text-gray-600 font-medium w-24">Subject:</label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="flex-1 px-3 py-2 text-base border-0 focus:outline-none focus:ring-0"
                placeholder="Subject"
              />
            </div>
          </div>

          <div className="pt-4">
            <textarea
              name="text"
              value={formData.text}
              onChange={handleChange}
              required
              rows="18"
              className="w-full px-3 py-2 text-base border-0 focus:outline-none focus:ring-0 resize-none"
              placeholder="Compose your email..."
            />
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-gray-200">
            <button
              type="submit"
              disabled={loading}
              className={`px-8 py-3 rounded-lg text-white font-semibold text-base ${
                loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
              } transition duration-200 shadow-md`}
            >
              {loading ? 'Sending...' : 'Send'}
            </button>
            <div className="text-sm text-gray-500">
              {formData.recipients.split(',').filter(e => e.trim()).length > 0 && 
                `${formData.recipients.split(',').filter(e => e.trim()).length} recipient(s)`}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SendEmail;
