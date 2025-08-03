import { Facebook, Instagram, Mail, Twitter } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  const services = [
    { id: 1, name: "Contact Us", link: "#" },
    { id: 2, name: "Track Order", link: "#" },
    { id: 3, name: "Return Order", link: "#" },
  ];

  const quickLinks = [
    { id: 1, name: "Privacy Policy", link: "/privacy-policy" },
    { id: 2, name: "Shipping & Returns", link: "/shipping-returns" },
    { id: 3, name: "Terms & Conditions", link: "/terms-and-conditions" },
    { id: 4, name: "About Us", link: "/about-us" },
  ];

  const location = useLocation();
  const isSearchRoute = location.pathname.includes("search");
  const isCheckoutRoute = location.pathname.includes("checkout");
  const isLoginPage = location.pathname.includes("auth");
  const isProfilePage = location.pathname.includes("my-profile");
  const isManagePage = location.pathname.includes("manage");
  const isHelpSupportPage = location.pathname.includes("help-and-support");

  const isOrderSuccessPage = location.pathname.includes("order");
  const isPaymentPage = location.pathname.includes("payment");

  if (isSearchRoute) return null;

  if (isCheckoutRoute) return null;

  if (isLoginPage) return null;

  if (isProfilePage) return null;

  if (isManagePage) return null;
  if (isHelpSupportPage) return null;

  if (isPaymentPage) return null;
  if (isOrderSuccessPage) return null;

  return (
    <footer className="mt-20 px-6 md:px-20 py-16">
      <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-12">
        {/* Logo & Tagline */}
        <div>
          <img src="/28Miles.jpeg" alt="28Miles" className="w-32 mb-4" />
          <p className="text-sm text-gray-400">
            Designed for those who defy the ordinary.
            <br /> Style that moves with you.
          </p>
        </div>

        {/* Customer Services */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Customer Service</h3>
          <ul className="space-y-2 text-md text-gray-300">
            {services.map((item) => (
              <li key={item.id}>
                <a href={item.link} className="hover:text-amber-400 transition">
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-md text-gray-300">
            {quickLinks.map((item) => (
              <li key={item.id}>
                <div
                  onClick={() => {
                    navigate(item.link);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="hover:text-amber-400 cursor-pointer transition"
                >
                  {item.name}
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Social / Contact */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Connect With Us</h3>
          <div className="flex items-center gap-4 mb-4">
            <a href="#" className="hover:text-pink-500 transition">
              <Instagram size={20} />
            </a>
            <a href="#" className="hover:text-blue-500 transition">
              <Facebook size={20} />
            </a>
            <a href="#" className="hover:text-sky-400 transition">
              <Twitter size={20} />
            </a>
            <a
              href="mailto:hello@28miles.com"
              className="hover:text-green-400 transition"
            >
              <Mail size={20} />
            </a>
          </div>
          <p className="text-md text-gray-400">info@28miles.com</p>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-12 border-t border-gray-800 pt-6 text-sm text-center text-gray-500">
        © {new Date().getFullYear()} 28Miles. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
