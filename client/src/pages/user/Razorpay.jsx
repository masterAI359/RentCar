export function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

export async function displayRazorpay(values, navigate) {
  const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

  if (!res) {
    alert("Razorpay SDK failed to load. Are you online?");
    return;
  }

  // creating a new order
  const result = await fetch("api/user/razorpay", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  });

  if (!result) {
    alert("Server error. Are you online?");
    return;
  }

  const data = await result.json();
  // Getting the order details back
  const { amount, id, currency } = data;

  const options = {
    key: import.meta.env.RAZORPAY_KEY_ID,
    amount: amount.toString(),
    currency: currency,
    name: "Rent a Ride",
    description: "Test Transaction",
    order_id: id,
    handler: async function (response) {
      const data = {
        razorpayPaymentId: response.razorpay_payment_id,
        razorpayOrderId: response.razorpay_order_id,
        razorpaySignature: response.razorpay_signature,
      };

      // final data to store in database
      const dbData = { ...values, ...data };
      const result = await fetch("api/user/bookCar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dbData),
      });
      const successStatus = await result.json();
      console.log(successStatus);
      if (successStatus) {
        navigate("/");
      }
    },
    prefill: {
      name: "Jeevan aj",
      email: "ambrahamjeevan@gmail.com",
      contact: "8086240993",
    },
    theme: {
      color: "#61dafb",
    },
  };

  const paymentObject = new window.Razorpay(options);
  paymentObject.open();
}

const Razorpay = () => {
  return <div></div>;
};

export default Razorpay;
