import { HelpCircle, Mail, PhoneCall } from "lucide-react";

const HelpSupportTab = () => {
  return (
    <div className="text-white space-y-6">
      <h2 className="text-xl font-semibold flex items-center gap-2">
        <HelpCircle size={20} />
        Help & Support
      </h2>

      <div className="bg-white/5 border border-white/10 p-4 rounded-xl space-y-4">
        <p className="text-sm text-gray-300">
          For any assistance regarding your orders, deliveries, or account, feel
          free to reach out to us.
        </p>

        <div className="text-sm text-gray-200 space-y-1">
          <div className="flex items-center gap-2">
            <Mail size={16} /> support@28miles.in
          </div>
          <div className="flex items-center gap-2">
            <PhoneCall size={16} /> +91 98765 43210
          </div>
        </div>

        <p className="text-xs text-gray-500">
          Support available Monday to Saturday, 9 AM to 6 PM IST.
        </p>
      </div>
    </div>
  );
};

export default HelpSupportTab;
