import React, { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "What is your return policy?",
      answer: "Our return policy lasts 30 days. If 30 days have gone by since your purchase, unfortunately, we can’t offer you a refund or exchange."
    },
    {
      question: "How do I track my order?",
      answer: "Once your order has shipped, we will send you an email with tracking information."
    },
    {
      question: "Can I purchase items in bulk?",
      answer: "Yes, we offer bulk purchasing options. Please contact our sales team for more information."
    }
  ];

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="">
      <div className="h-[40vh] bg-slate-100 flex items-center justify-center text-center">
        <div>
          <h1 className="text-6xl font-extrabold mb-4 tracking-wide">FAQs</h1>
          <p className="text-xl tracking-wide font-bold">{`Home > FAQ`}</p>
        </div>
      </div>

      <div className="px-80 py-20">
        {faqs.map((faq, index) => (
          <div key={index} className="mb-4">
            <div
              className="cursor-pointer bg-slate-200 p-4 rounded-md flex justify-between items-center"
              onClick={() => toggleAccordion(index)}
            >
              <h2 className="text-xl font-semibold">{faq.question}</h2>
              {openIndex === index ? (
                <FiChevronUp className="text-xl" />
              ) : (
                <FiChevronDown className="text-xl" />
              )}
            </div>
            <div className={`transition-all duration-500 ease-in-out overflow-hidden ${openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
              <div className="p-4 border border-t-0 border-slate-200">
                <p>{faq.answer}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
