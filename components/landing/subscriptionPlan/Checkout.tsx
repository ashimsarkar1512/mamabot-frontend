"use client";

const paymentOptions = ["Stripe", "Visa", "MasterCard"];

const CheckOut = () => {
  return (
    <section className="w-full py-3 md:py-6 ">
      <div className="mx-auto">
        <div className="text-center">
          <h2 className="text-xl  text-[#229ECF] md:text-[32px] mb-3 font-semibold ">
            Safe and Simple Checkout
          </h2>
          <p className="text-base md:text-lg text-[#4A5565]">
            We use globally trusted payment partners to keep your information
            secure.
          </p>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-center py-5 md:py-10 gap-6">
          {paymentOptions.map((option, index) => (
            <button
              key={index}
              className="text-[#677381] text-sm md:text-2xl border-2 !border-[#229ECF] rounded-lg hover:bg-[#229ECF] hover:text-white cursor-pointer px-4 md:px-8 py-2"
            >
              {option}
            </button>
          ))}
        </div>
        <p className="text-sm text-center md:text-base text-[#677381]">
          All payments are encrypted and GDPR-compliant. Cancel anytime — no
          hidden fees.
        </p>
      </div>
    </section>
  );
};

export default CheckOut;
