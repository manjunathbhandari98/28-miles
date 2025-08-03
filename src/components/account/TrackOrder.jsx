import { motion } from "framer-motion";
import { Check, Truck } from "lucide-react";
import { formatDateToReadable } from "../../utils/formatedDate";

// Step configuration for frontend visualization
const steps = [
  { key: "Ordered", field: "placedAt" },
  { key: "Shipped", field: "shippedAt" },
  { key: "Out for Delivery", field: "deliveredAt" }, // still okay for step visual
  { key: "Delivered", field: "deliveredAt" },
];

// Map backend status to one of the four frontend steps
const mapBackendStepToFrontend = (step) => {
  switch (step?.toLowerCase()) {
    case "pending":
    case "confirmed":
    case "processing":
      return "Ordered";
    case "shipped":
      return "Shipped";
    case "out for delivery":
      return "Out for Delivery";
    case "delivered":
    case "returned":
    case "refunded":
      return "Delivered";
    case "cancelled":
      return "Cancelled";
    default:
      return "Ordered";
  }
};

const TrackOrder = ({ trackData }) => {
  if (!trackData) return null;

  const currentStep = mapBackendStepToFrontend(trackData.currentStep);
  const currentStepIndex = steps.findIndex(
    (step) => step.key.toLowerCase() === currentStep.toLowerCase()
  );

  const getDate = (field) => {
    const raw = trackData[field];
    return raw
      ? formatDateToReadable(new Date(raw), "dd MMM yyyy, hh:mm a")
      : null;
  };

  return (
    <div className="mx-auto p-6 rounded-2xl shadow-lg md:max-w-7xl">
      <h2 className="text-2xl font-bold mb-14 text-center">Track Your Order</h2>

      <div className="relative flex justify-between items-center">
        {/* Line behind icons */}
        <div className="absolute top-4 left-10 right-4 h-1 bg-gray-300 z-0">
          <div
            className="h-1 bg-green-600 absolute top-0 left-0 rounded-full z-10 transition-all duration-300"
            style={{
              width: `${(currentStepIndex / (steps.length - 1)) * 100}%`,
            }}
          />
        </div>

        {steps.map((step, index) => {
          const isCompleted = index < currentStepIndex;
          const isCurrent = index === currentStepIndex;
          const date = getDate(step.field);

          return (
            <div
              key={step.key}
              className="flex flex-col items-center justify-between relative z-20"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <div
                  className={`md:h-10 md:w-10 w-8 h-8 rounded-full flex justify-center items-center ${
                    isCompleted || isCurrent
                      ? "bg-green-600 text-white"
                      : "bg-gray-400 text-white"
                  }`}
                >
                  {isCurrent ? (
                    <Truck size={20} />
                  ) : isCompleted ? (
                    <Check size={20} />
                  ) : (
                    <Check size={20} className="opacity-50" />
                  )}
                </div>
              </motion.div>

              <div className="mt-2 text-center">
                <p className="md:text-sm text-xs font-semibold">{step.key}</p>
                {date ? (
                  <p className="text-xs text-gray-600">{date}</p>
                ) : (
                  <p className="text-xs text-gray-400 italic">Pending</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TrackOrder;
