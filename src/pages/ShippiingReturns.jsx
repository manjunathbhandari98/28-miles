const ShippingReturns = () => {
  return (
    <div className="bg-black text-white min-h-screen py-16 px-6 md:px-20">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Shipping & Returns
        </h1>
        <p className="text-gray-300 mb-8 text-lg leading-relaxed">
          We’re committed to delivering your order quickly and efficiently, and
          ensuring your experience with 28-Miles is hassle-free. Here's
          everything you need to know about shipping and returns.
        </p>

        {/* Shipping Policy */}
        <div className="mb-10">
          <h2 className="text-2xl font-semibold mb-3">Shipping Policy</h2>
          <ul className="list-disc list-inside text-gray-400 leading-relaxed">
            <li>
              We process all orders within{" "}
              <span className="text-white font-semibold">
                1-2 business days
              </span>{" "}
              after purchase.
            </li>
            <li>
              Standard delivery takes{" "}
              <span className="text-white font-semibold">
                3–7 business days
              </span>{" "}
              depending on your location.
            </li>
            <li>
              Shipping is{" "}
              <span className="text-white font-semibold">
                free on all orders over ₹999
              </span>
              . For orders below, a nominal shipping fee applies at checkout.
            </li>
            <li>
              You will receive a tracking number via email/SMS once your order
              is dispatched.
            </li>
            <li>We currently ship across India only.</li>
          </ul>
        </div>

        {/* Returns & Exchanges */}
        <div className="mb-10">
          <h2 className="text-2xl font-semibold mb-3">Returns & Exchanges</h2>
          <ul className="list-disc list-inside text-gray-400 leading-relaxed">
            <li>
              We offer a{" "}
              <span className="text-white font-semibold">
                7-day return or exchange policy
              </span>{" "}
              from the date of delivery.
            </li>
            <li>
              Items must be unused, unwashed, and in original condition with
              tags intact.
            </li>
            <li>
              Refunds will be processed to your original payment method within{" "}
              <span className="text-white font-semibold">7 business days</span>{" "}
              after approval.
            </li>
            <li>
              To request a return or exchange, email us at{" "}
              <span className="text-blue-400">support@28miles.co</span> with
              your order ID and reason.
            </li>
            <li>
              Return shipping is free in case of damaged or incorrect items. For
              size or preference-based returns, a minimal return fee may apply.
            </li>
          </ul>
        </div>

        {/* Non-returnable Items */}
        <div className="mb-10">
          <h2 className="text-2xl font-semibold mb-3">Non-returnable Items</h2>
          <p className="text-gray-400 leading-relaxed">
            We do not accept returns on:
            <ul className="list-disc ml-6 mt-2">
              <li>Items on clearance or marked final sale</li>
              <li>Undergarments or innerwear</li>
              <li>Gift cards or digital downloads</li>
            </ul>
          </p>
        </div>

        {/* Support */}
        <div>
          <h2 className="text-2xl font-semibold mb-3">Need Help?</h2>
          <p className="text-gray-400 leading-relaxed">
            If you have any questions regarding your order, shipping, or
            returns, don’t hesitate to reach out at{" "}
            <span className="text-blue-400">support@28miles.co</span>. We’re
            here to help!
          </p>
        </div>

        <p className="text-sm text-gray-500 mt-10">
          Last Updated: July 23, 2025
        </p>
      </div>
    </div>
  );
};

export default ShippingReturns;
