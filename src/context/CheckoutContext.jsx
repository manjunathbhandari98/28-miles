import { createContext, useEffect, useState } from "react";

const CheckoutContext = createContext();

export const CheckoutProvider = ({ children }) => {
  const [stepCompleted, setStepCompleted] = useState(() => {
    // Try to load from sessionStorage on initialization
    const saved = sessionStorage.getItem("checkoutProgress");
    return saved
      ? JSON.parse(saved)
      : {
          cart: false,
          address: false,
          payment: false,
          success: false,
        };
  });

  useEffect(() => {
    resetCheckout();
  }, []);

  // Save to sessionStorage whenever stepCompleted changes
  useEffect(() => {
    sessionStorage.setItem("checkoutProgress", JSON.stringify(stepCompleted));
  }, [stepCompleted]);

  // Method to reset checkout progress
  const resetCheckout = () => {
    setStepCompleted({
      cart: false,
      address: false,
      payment: false,
      success: false,
    });
    sessionStorage.removeItem("checkoutProgress");
  };

  // Method to complete a step
  const completeStep = (step) => {
    setStepCompleted((prev) => ({
      ...prev,
      [step]: true,
    }));
  };

  return (
    <CheckoutContext.Provider
      value={{
        stepCompleted,
        setStepCompleted,
        resetCheckout,
        completeStep,
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
};

export { CheckoutContext };
