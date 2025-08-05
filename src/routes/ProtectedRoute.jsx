import { Navigate } from "react-router-dom";
import { useCheckout } from "./../hooks/useCheckout";

const ProtectedRoute = ({ step, children }) => {
  const { stepCompleted } = useCheckout();

  // Define the step hierarchy
  const stepHierarchy = {
    cart: 0,
    address: 1,
    payment: 2,
    success: 3,
  };

  // Get the required step level
  const requiredStepLevel = stepHierarchy[step];

  // Check if all previous steps are completed
  const stepOrder = ["cart", "address", "payment", "success"];

  for (let i = 0; i < requiredStepLevel; i++) {
    const previousStep = stepOrder[i];
    if (!stepCompleted[previousStep]) {
      // Redirect to the first incomplete step
      const redirectStep = i === 0 ? "cart" : stepOrder[i];
      return <Navigate to={`/checkout/${redirectStep}`} replace />;
    }
  }

  return children;
};

export default ProtectedRoute;
