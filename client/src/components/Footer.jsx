import React, { useState } from 'react';
import { Send, MapPin, Mail, Phone, Clock } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

const Footer = () => {
  const [email, setEmail] = useState('');

  const currentYear = new Date().getFullYear();

  const handleSend = () => {
    if (!email) {
      toast.error("Please enter an email!");
      return;
    }
    toast.success("Email registered successfully!");
    setEmail('');
  };

  return (
    <footer className="bg-white text-gray-700 py-12 border-t" id="contact">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* Brand / About */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-magenta-600">
              MindMoose
            </h2>
            <p className="text-sm text-gray-500 leading-relaxed">
              AI-powered mental wellness platform. Self care planner, community blogs,
              and stress assessment — all in one place.
            </p>

            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#b22d64]" />
                <span>New Delhi, India</span>
              </div>

              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#b22d64]" />
                <a
                  href="mailto:arshtiwari12345@gmail.com"
                  className="hover:text-[#b22d64] transition"
                >
                  anshikabansal1618@gmail.com
                </a>
              </div>

              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#b22d64]" />
                <span>+91 90564342**</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-[#b22d64] mb-4">
              Quick Links
            </h3>
            <ul className="space-y-3 text-sm">
              <li><a href="/" className="hover:text-[#b22d64] transition">Home</a></li>
              <li><a href="#features" className="hover:text-[#b22d64] transition">Features</a></li>
              <li><a href="#use-cases" className="hover:text-[#b22d64] transition">Use Cases</a></li>
              <li><a href="#faq" className="hover:text-[#b22d64] transition">FAQ</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold text-[#b22d64] mb-3">
              Newsletter
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              Get product updates and early feature access.
            </p>

            <div className="flex border rounded-lg overflow-hidden">
              <input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-2 text-sm outline-none"
              />
              <button
                onClick={handleSend}
                className="bg-gradient-to-r from-[#b22d64] to-[#c96a92] px-4 flex items-center justify-center hover:opacity-90 transition"
              >
                <Send className="w-4 h-4 text-white" />
              </button>
            </div>

            <div className="mt-5 text-sm">
              <div className="flex items-center gap-2 text-gray-500">
                <Clock className="w-4 h-4 text-[#b22d64]" />
                <span>Mon – Fri, 9:00 AM – 6:00 PM</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t mt-10 pt-6 flex flex-col md:flex-row justify-center items-center text-sm text-gray-500">
          <p>© {currentYear} MindMoose. All rights reserved.</p>

          {/* <div className="flex gap-6 mt-3 md:mt-0">
            <a href="/privacy" className="hover:text-pink-600 transition">Privacy</a>
            <a href="/terms" className="hover:text-pink-600 transition">Terms</a>
            <a href="/cookies" className="hover:text-pink-600 transition">Cookies</a>
          </div> */}
        </div>
      </div>

      <Toaster position="top-right" />
    </footer>
  );
};

export default Footer;
