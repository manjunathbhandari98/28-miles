const TermsAndConditions = () => {
  return (
    <div className="bg-black text-white min-h-screen py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-white">
          Terms & Conditions
        </h1>

        <div className="space-y-6 text-gray-400 leading-relaxed">
          <p>
            By accessing or using our website, you agree to be bound by the
            following terms and conditions. Please read them carefully before
            making any purchase.
          </p>

          <h2 className="text-xl font-semibold text-white mt-6">
            1. Use of Website
          </h2>
          <p>
            You agree to use our website only for lawful purposes and in a way
            that does not infringe the rights of others or restrict their use
            and enjoyment of the site.
          </p>

          <h2 className="text-xl font-semibold text-white mt-6">
            2. Product Information
          </h2>
          <p>
            We strive to display accurate product information including pricing,
            descriptions, and availability. However, errors may occur, and we
            reserve the right to correct any inaccuracies at any time.
          </p>

          <h2 className="text-xl font-semibold text-white mt-6">
            3. Order Acceptance
          </h2>
          <p>
            All orders placed through our website are subject to acceptance and
            availability. We reserve the right to refuse or cancel any order at
            our discretion.
          </p>

          <h2 className="text-xl font-semibold text-white mt-6">4. Payment</h2>
          <p>
            Payments must be made at the time of order. We accept major
            credit/debit cards and other secure payment methods.
          </p>

          <h2 className="text-xl font-semibold text-white mt-6">
            5. Intellectual Property
          </h2>
          <p>
            All content, logos, images, and designs on our site are the property
            of our brand and protected by copyright laws. You may not use,
            reproduce, or distribute them without permission.
          </p>

          <h2 className="text-xl font-semibold text-white mt-6">
            6. Limitation of Liability
          </h2>
          <p>
            We are not liable for any indirect, incidental, or consequential
            damages arising from the use or inability to use our website or
            products.
          </p>

          <h2 className="text-xl font-semibold text-white mt-6">
            7. Changes to Terms
          </h2>
          <p>
            We reserve the right to update or change these terms at any time.
            Continued use of our website following changes means you accept the
            new terms.
          </p>

          <h2 className="text-xl font-semibold text-white mt-6">
            8. Governing Law
          </h2>
          <p>
            These terms are governed by and construed in accordance with the
            laws of India. Any disputes will be subject to the jurisdiction of
            the courts of India.
          </p>

          <p className="mt-10">
            If you have any questions regarding these terms, please contact us
            at{" "}
            <a
              href="mailto:support@28miles.com"
              className="text-blue-400 underline"
            >
              support@28miles.com
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
