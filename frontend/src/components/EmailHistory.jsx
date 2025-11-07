import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_URL from '../config';

function EmailHistory() {
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/email-history`);
      setEmails(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to load email history');
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <p className="mt-4 text-gray-600">Loading history...</p>
      </div>
    );
  }

  return (
    <div className="bg-white px-4 py-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden max-w-5xl mx-auto">
        <div className="px-6 py-4 border-b border-gray-200 bg-white">
          <h2 className="text-xl font-semibold text-gray-800">
            Inbox
          </h2>
        </div>
        
        {error && (
          <div className="mb-6 p-4 sm:p-6 bg-red-100 text-red-800 rounded-lg text-base sm:text-lg">
            {error}
          </div>
        )}

        {emails.length === 0 ? (
          <div className="text-center py-20">
            <svg className="mx-auto h-16 w-16 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76" />
            </svg>
            <p className="text-gray-500 text-lg">No emails sent yet</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {emails.map((email) => (
              <div key={email._id} className="px-6 py-4 hover:bg-gray-50 cursor-pointer transition duration-150">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-4 mb-2">
                      <span className="text-sm font-semibold text-gray-900">
                        To: {email.recipients.length} recipient{email.recipients.length !== 1 ? 's' : ''}
                      </span>
                      <span className={`px-2 py-1 text-xs font-medium rounded ${
                        email.status === 'sent' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {email.status}
                      </span>
                    </div>
                    <h3 className="text-base font-medium text-gray-900 mb-1">
                      {email.subject}
                    </h3>
                    <p className="text-sm text-gray-600 truncate">
                      {email.recipients.slice(0, 3).join(', ')}
                      {email.recipients.length > 3 && ` +${email.recipients.length - 3} more`}
                    </p>
                  </div>
                  <div className="ml-4 flex-shrink-0">
                    <p className="text-sm text-gray-500 whitespace-nowrap">
                      {new Date(email.createdAt).toLocaleDateString()} {new Date(email.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default EmailHistory;
