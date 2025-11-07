import React, { useState, useEffect } from 'react';

function Footer() {
  const [dateTime, setDateTime] = useState(new Date());
  const [location, setLocation] = useState({ city: 'Loading...', country: '', timezone: '' });

  useEffect(() => {
    // Update time every second
    const timer = setInterval(() => {
      setDateTime(new Date());
    }, 1000);

    // Get user's location using IP geolocation with API key
    fetch('https://ipapi.co/json/')
      .then(res => {
        if (!res.ok) throw new Error('API error');
        return res.json();
      })
      .then(data => {
        console.log('Location data:', data);
        if (data.city && data.country_name) {
          setLocation({
            city: data.city,
            country: data.country_name,
            timezone: data.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone
          });
        } else {
          // Fallback to generic location
          setLocation({
            city: 'Global',
            country: 'Location',
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
          });
        }
      })
      .catch(error => {
        console.error('Location fetch error:', error);
        // Fallback to generic location
        setLocation({
          city: 'Global',
          country: 'Location',
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
        });
      });

    return () => clearInterval(timer);
  }, []);

  const formatDateTime = () => {
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    };
    return dateTime.toLocaleString('en-US', options);
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-blue-600 to-blue-700 text-white mt-auto">
      <div className="w-full px-6 py-6">
        {/* Top Section - Location and DateTime */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pb-4 border-b border-blue-500/30">
          <div className="flex items-center gap-2 text-sm">
            <span className="inline-flex items-center gap-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              {location.city}, {location.country}
            </span>
          </div>
          
          <div className="flex flex-col md:flex-row items-center gap-2 text-sm">
            <span className="inline-flex items-center gap-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
              {formatDateTime()}
            </span>
            <span className="text-xs text-blue-200">
              ({location.timezone})
            </span>
          </div>
        </div>

        {/* Bottom Section - Copyright and Links */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-4">
          <div className="flex items-center gap-6 text-sm">
            <span className="font-medium">© {currentYear} Bulk Mail App</span>
            <span className="text-blue-200">All rights reserved</span>
          </div>
          
          <div className="flex items-center gap-4 text-sm text-blue-200">
            <a href="#" className="hover:text-white transition">Privacy</a>
            <span>•</span>
            <a href="#" className="hover:text-white transition">Terms</a>
            <span>•</span>
            <a href="#" className="hover:text-white transition">Help</a>
          </div>
        </div>

        {/* Developer Credit */}
          <div className="text-center text-sm opacity-90">
            <p>Developer Credit ❤️ by Jenidevops • Powered by MERN Stack</p>
          </div>
      </div>
    </footer>
  );
}

export default Footer;
