const PrivacyPolicy = () => {
  return (
    <div className="bg-black text-white min-h-screen py-16 px-6 md:px-20">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Privacy Policy</h1>
        <p className="text-gray-300 mb-6 text-lg leading-relaxed">
          This Privacy Policy outlines how 28-Miles collects, uses, and protects
          your information when you visit or make a purchase from our website.
        </p>

        {/* Section 1 */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">
            1. Information We Collect
          </h2>
          <p className="text-gray-400 leading-relaxed">
            We may collect personal information such as your name, email
            address, shipping address, phone number, and payment details when
            you interact with our site, such as during purchases, account
            creation, or newsletter sign-ups.
          </p>
        </div>

        {/* Section 2 */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">
            2. How We Use Your Information
          </h2>
          <div className="text-gray-400 leading-relaxed">
            We use your information to:
            <ul className="list-disc ml-6 mt-2">
              <li>Process and fulfill your orders</li>
              <li>Send you order confirmations and shipping updates</li>
              <li>Provide customer support</li>
              <li>Send marketing emails (only if you’ve opted in)</li>
              <li>Improve our website and services</li>
            </ul>
          </div>
        </div>

        {/* Section 3 */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">
            3. Sharing Your Information
          </h2>
          <div className="text-gray-400 leading-relaxed">
            We do not sell or rent your personal data. We may share your
            information with trusted third parties only to:
            <ul className="list-disc ml-6 mt-2">
              <li>Facilitate payment processing</li>
              <li>Ship your products</li>
              <li>Comply with legal obligations</li>
            </ul>
          </div>
        </div>

        {/* Section 4 */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">4. Data Security</h2>
          <p className="text-gray-400 leading-relaxed">
            We implement industry-standard security measures to protect your
            information. However, no transmission over the internet is 100%
            secure. By using our site, you acknowledge the inherent risks.
          </p>
        </div>

        {/* Section 5 */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">5. Your Rights</h2>
          <div className="text-gray-400 leading-relaxed">
            You have the right to:
            <ul className="list-disc ml-6 mt-2">
              <li>Access, update, or delete your data</li>
              <li>Opt out of marketing communications at any time</li>
              <li>Request a copy of the data we hold about you</li>
            </ul>
            To do so, contact us at{" "}
            <span className="text-blue-400">support@28miles.co</span>.
          </div>
        </div>

        {/* Section 6 */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">
            6. Changes to This Policy
          </h2>
          <p className="text-gray-400 leading-relaxed">
            We may update this Privacy Policy from time to time. Any changes
            will be posted on this page with a revised "Last Updated" date.
          </p>
        </div>

        {/* Footer */}
        <p className="text-sm text-gray-500 mt-10">
          Last Updated: July 23, 2025
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
