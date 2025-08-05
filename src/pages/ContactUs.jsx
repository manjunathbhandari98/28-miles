import { Mail, MapPin, Phone } from "lucide-react";

const ContactUs = () => {
  const whatsappNumber = "919999999999"; // Replace with your number

  return (
    <div className="min-h-screen bg-zinc-900 pt-30 text-white px-6 py-12">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Contact Us</h1>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Info Section */}
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <MapPin className="w-6 h-6 text-green-400" />
              <span>123 Street Name, City, State, ZIP</span>
            </div>
            <div className="flex items-center space-x-4">
              <Phone className="w-6 h-6 text-green-400" />
              <span>+91 99999 99999</span>
            </div>
            <div className="flex items-center space-x-4">
              <Mail className="w-6 h-6 text-green-400" />
              <span>support@example.com</span>
            </div>

            <a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-green-500 hover:bg-green-600 px-4 py-2 rounded-xl text-white font-medium transition"
            >
              {/* <div className="w-5 h-5 mr-2" /> */}
              Chat on WhatsApp
            </a>
          </div>

          {/* Google Map (optional) */}
          <div className="rounded-xl overflow-hidden shadow-lg">
            <iframe
              title="Our Location"
              src="https://maps.app.goo.gl/hEcyu8yyqf5CQu8N7"
              width="100%"
              height="300"
              allowFullScreen=""
              loading="lazy"
              className="border-none w-full h-72"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
