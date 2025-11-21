"use client"
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone,
  faEnvelope,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebookF,
  faTwitter,
  faInstagram,
  faLinkedinIn,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <Link href="/" className="flex items-center mb-6">
              <span className="text-2xl font-bold text-white">
                Souq<span className="text-orange-500">Online</span>
              </span>
            </Link>
            <p className="text-gray-400 mb-6">
              Your one-stop destination for all your shopping needs. We offer quality products at competitive prices with exceptional customer service.
            </p>
            {/* Social Icons */}
            <div className="flex space-x-4">
              <a href="#" className="hover:text-indigo-500 transition-colors">
                <FontAwesomeIcon icon={faFacebookF} />
              </a>
              <a href="#" className="hover:text-indigo-500 transition-colors">
                <FontAwesomeIcon icon={faTwitter} />
              </a>
              <a href="#" className="hover:text-indigo-500 transition-colors">
                <FontAwesomeIcon icon={faInstagram} />
              </a>
              <a href="#" className="hover:text-indigo-500 transition-colors">
                <FontAwesomeIcon icon={faLinkedinIn} />
              </a>
              <a href="#" className="hover:text-indigo-500 transition-colors">
                <FontAwesomeIcon icon={faYoutube} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 relative pb-2 after:absolute after:left-0 after:bottom-0 after:w-12 after:h-0.5 after:bg-indigo-500">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li><Link href="/" className="text-gray-400 hover:text-white">Home</Link></li>
              <li><Link href="/about" className="text-gray-400 hover:text-white">About Us</Link></li>
              <li><Link href="/products" className="text-gray-400 hover:text-white">Products</Link></li>
              <li><Link href="/categories" className="text-gray-400 hover:text-white">Categories</Link></li>
              <li><Link href="/brands" className="text-gray-400 hover:text-white">Brands</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-semibold mb-6 relative pb-2 after:absolute after:left-0 after:bottom-0 after:w-12 after:h-0.5 after:bg-indigo-500">
              Customer Service
            </h3>
            <ul className="space-y-3">
              <li><Link href="/help" className="text-gray-400 hover:text-white">Help Center</Link></li>
              <li><Link href="/track-order" className="text-gray-400 hover:text-white">Track Your Order</Link></li>
              <li><Link href="/returns" className="text-gray-400 hover:text-white">Returns & Refunds</Link></li>
              <li><Link href="/shipping" className="text-gray-400 hover:text-white">Shipping Info</Link></li>
              <li><Link href="/faq" className="text-gray-400 hover:text-white">FAQs</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6 relative pb-2 after:absolute after:left-0 after:bottom-0 after:w-12 after:h-0.5 after:bg-indigo-500">
              Contact Info
            </h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="text-indigo-400 mt-1 mr-3" />
                <span className="text-gray-400">
                  15 Nile Corniche,<br />
                  Business District,<br />
                  Aswan, Egypt
                </span>
              </div>
              <div className="flex items-center">
                <FontAwesomeIcon icon={faPhone} className="text-indigo-400 mr-3" />
                <span className="text-gray-400">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center">
                <FontAwesomeIcon icon={faEnvelope} className="text-indigo-400 mr-3" />
                <span className="text-gray-400">support@souqonline.com</span>
              </div>
            </div>

            {/* Newsletter */}
            <div className="mt-6">
              <h4 className="text-sm font-semibold mb-3 text-white">Subscribe to Newsletter</h4>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="bg-gray-800 text-white px-4 py-2 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full"
                />
                <button className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-r-lg transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="border-t border-gray-800 py-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <span className="text-gray-400 text-sm">We accept:</span>
              <div className="flex space-x-3 mt-2">
                <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg" alt="Visa" className="h-6" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-6" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-6" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/3/30/American_Express_logo.svg" alt="Amex" className="h-6" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" alt="Apple Pay" className="h-6" />
              </div>
            </div>
            <div className="text-center md:text-right">
              <span className="text-gray-400 text-sm">Download our app:</span>
              <div className="flex space-x-2 mt-2">
                <button className="bg-gray-800 hover:bg-gray-700 text-white px-3 py-1 rounded text-sm">
                  App Store
                </button>
                <button className="bg-gray-800 hover:bg-gray-700 text-white px-3 py-1 rounded text-sm">
                  Google Play
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-800 py-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-3 md:mb-0">
              © {new Date().getFullYear()} SouqOnline. All rights reserved.  
              <span className="block md:inline ml-2">
                Made with <span className="text-red-500">♥</span> by <b>Marwa Mahmoud</b>
              </span>
            </p>
            <div className="flex space-x-6">
              <Link href="/privacy" className="text-gray-400 hover:text-white text-sm">Privacy Policy</Link>
              <Link href="/terms" className="text-gray-400 hover:text-white text-sm">Terms of Service</Link>
              <Link href="/cookies" className="text-gray-400 hover:text-white text-sm">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;