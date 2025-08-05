import { useLocation, useNavigate } from "react-router-dom";
import { useCheckout } from "../hooks/useCheckout";

const steps = [
  { label: "Bag", route: "cart" },
  { label: "Address", route: "address" },
  { label: "Payment", route: "payment" },
  { label: "Success", route: "success" },
];

const CheckoutSteps = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { stepCompleted } = useCheckout();

  // Determine active step index based on current path
  const activeStep = steps.findIndex((step) =>
    location.pathname.includes(step.route)
  );

  const handleStepClick = (stepIndex, stepRoute) => {
    if (stepIndex <= activeStep) {
      if (stepIndex === 0 || stepCompleted.cart) {
        navigate(`/checkout/${stepRoute}`);
      }
    }
  };

  return (
    <div className="w-full flex justify-center">
      <div className="flex items-center gap-0 sm:gap-4">
        {steps.map((step, idx) => (
          <div className="flex items-center" key={step.label}>
            {/* Step Circle */}
            <div
              className={`flex items-center justify-center w-9 h-9 rounded-full text-sm font-bold transition duration-300
                ${
                  idx <= activeStep
                    ? "bg-gradient-to-tr from-green-400 to-emerald-600 text-white shadow-md cursor-pointer"
                    : "bg-zinc-800 border border-zinc-600 text-gray-400 cursor-not-allowed"
                }
              `}
              onClick={() => handleStepClick(idx, step.route)}
            >
              {idx + 1}
            </div>

            {/* Step Label */}
            <div className="flex flex-col items-center ml-2 mr-4 sm:mr-6">
              <span
                className={`text-xs sm:text-sm uppercase tracking-wide font-medium ${
                  idx === activeStep ? "text-green-400" : "text-gray-400"
                }`}
              >
                {step.label}
              </span>
            </div>

            {/* Connector Line */}
            {idx < steps.length - 1 && (
              <div
                className={`h-1 w-8 sm:w-12 rounded-full transition-all duration-300
                  ${
                    idx < activeStep
                      ? "bg-gradient-to-r from-green-400 to-emerald-600"
                      : "bg-zinc-700"
                  }
                `}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CheckoutSteps;
