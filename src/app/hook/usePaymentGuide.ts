import { useCallback, useEffect } from "react";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";

export const usePaymentGuide = (ordersCount: number) => {
  const startPaymentGuide = useCallback(() => {
    setTimeout(() => {
      const driverObj = driver({
        showProgress: true,
        allowClose: true,
        overlayColor: "rgba(0,0,0,0.65)",
        nextBtnText: 'Next',
        prevBtnText: 'Previous',
        doneBtnText: 'Close',
        showButtons: ['next', 'previous', 'close'],
        steps: [
          {
            element: ".payment-status-tag",
            popover: {
              title: "Payment Status",
              description: "Here you can see whether the payment has been completed or still pending.",
            },
          },
          {
            element: ".delivery-status-tag",
            popover: {
              title: "Delivery Status",
              description: "This shows your order delivery progress.",
            },
          },
          {
            element: ".pay-now-btn",
            popover: {
              title: "Pay Now",
              description: "Click here to pay for your order. Only enabled when delivery status is pending.",
            },
          },
          {
            element: ".switch-toggle",
            popover: {
              title: "Sections Switch",
              description: "Toggle to view items or delivery information.",
            },
          },
          {
            element: ".order-item-card",
            popover: {
              title: "Order Items",
              description: "This section lists all products in your order.",
            },
          },
        ]
      });

      const elementsExist = document.querySelectorAll(
        '.payment-status-tag, .delivery-status-tag, .pay-now-btn, .switch-toggle, .order-item-card'
      ).length > 0;

      if (elementsExist) {
        driverObj.drive();
      }
    }, 500);
  }, []);

  useEffect(() => {
    if (ordersCount > 0) {
      startPaymentGuide();
    }
  }, [ordersCount, startPaymentGuide]);

  return { startPaymentGuide };
};