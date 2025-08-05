import { useContext } from "react";
import { CheckoutContext } from "../context/CheckoutContext";

export const useCheckout = () => useContext(CheckoutContext);
