import { ChevronLeft, Mail, MessageCircleQuestion, Phone } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HelpSupport = () => {
  const navigate = useNavigate();

  const faqs = [
    {
      id: 1,
      title: "Where is my order?",
      description:
        "Track your orders in real-time from the Orders section. You’ll receive updates when shipped or out for delivery.",
      icon: <MessageCircleQuestion size={20} />,
    },
    {
      id: 2,
      title: "How do I return a product?",
      description:
        "You can return a product within 7 days of delivery by visiting the Orders page and selecting 'Return'.",
      icon: <MessageCircleQuestion size={20} />,
    },
    {
      id: 3,
      title: "How can I cancel an order?",
      description:
        "Go to the Orders page and tap on the order you wish to cancel. If it's not shipped yet, you’ll see a cancel option.",
      icon: <MessageCircleQuestion size={20} />,
    },
  ];

  return (
    <div className="flex flex-col gap-4 mb-14">
      {/* Top Bar */}
      <div className="flex fixed top-0 left-0 w-full justify-between bg-zinc-950 p-4">
        <ChevronLeft onClick={() => navigate(-1)} />
        <h3 className="text-lg">Help & Support</h3>
        <div></div>
      </div>

      {/* Content */}
      <div className="text-white px-4 py-6 mt-14 space-y-6 md:hidden">
        {/* FAQs Section */}
        <div className="space-y-4">
          {faqs.map((faq) => (
            <div
              key={faq.id}
              className="p-4 bg-zinc-900 border border-zinc-800 rounded-xl space-y-1"
            >
              <div className="flex items-center gap-2 text-sm text-gray-300 font-medium">
                {faq.icon}
                {faq.title}
              </div>
              <p className="text-sm text-gray-400">{faq.description}</p>
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="space-y-3 pt-4">
          <h4 className="text-sm text-gray-400 font-semibold">
            Still need help?
          </h4>
          <button className="w-full flex items-center justify-between bg-zinc-800 text-sm text-white px-4 py-3 rounded-lg">
            <span className="flex items-center gap-2">
              <Phone size={16} />
              Call Support
            </span>
            <span className="text-gray-400">9AM - 6PM</span>
          </button>
          <button className="w-full flex items-center justify-between bg-zinc-800 text-sm text-white px-4 py-3 rounded-lg">
            <span className="flex items-center gap-2">
              <Mail size={16} />
              Email Us
            </span>
            <span className="text-gray-400">support@28miles.in</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default HelpSupport;
