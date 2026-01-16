import React from "react";

const QuoteSection = () => {
  return (
    <section className="bg-gradient-to-r from-pink-100 via-pink-50 to-[#fff5f9] py-20 px-6">
      <div className="max-w-4xl mx-auto text-center relative">
        <span className="absolute top-0 left-1/4 w-12 h-12 bg-pink-200 rounded-full opacity-40 animate-bounce"></span>
        <span className="absolute bottom-0 right-1/3 w-16 h-16 bg-pink-300 rounded-full opacity-30 animate-pulse"></span>

        <p className="text-2xl sm:text-4xl font-semibold text-[#b22d64] italic leading-snug mb-6">
          "Your mind is a garden. Your thoughts are the seeds. You can grow flowers or weeds — nurture wellness, and watch yourself bloom."
        </p>

        <span className="text-lg sm:text-xl text-gray-700 font-medium">
          — Anshikaa
        </span>
        
        <div className="mt-6 w-24 h-1 mx-auto rounded-full bg-pink-300 opacity-70"></div>
      </div>
    </section>
  );
};

export default QuoteSection;
