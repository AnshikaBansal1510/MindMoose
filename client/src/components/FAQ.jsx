"use client";

import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null); // user-clicked open FAQ

  const faqs = [
    {
      question: "Is MindMoose a therapy app?",
      answer:
        "MindMoose is not a replacement for professional therapy. It is a supportive wellness space designed to help you reflect, journal, and feel heard. For medical or urgent concerns, we recommend reaching out to a licensed professional.",
    },
    {
      question: "Are my journals and chats private?",
      answer:
        "Yes. Your journals, mood entries, and AI conversations are private by default. Nothing is shared publicly unless you explicitly choose to post a blog or story.",
    },
    {
      question: "How does the AI therapist work?",
      answer:
        "The AI therapist is a non-judgmental listening companion. It helps you express thoughts, reflect on emotions, and feel supported — without diagnosing or giving medical advice.",
    },
    {
      question: "What is mood tracking used for?",
      answer:
        "Mood tracking helps you gently notice emotional patterns over time. There’s no pressure to feel a certain way — all moods are valid and welcome.",
    },
    {
      question: "What are wellness streaks?",
      answer:
        "Wellness streaks encourage consistency, not perfection. They track habits like journaling, check-ins, or reflections to help build gentle routines.",
    },
    {
      question: "Can I share my reflections with others?",
      answer:
        "Yes, if you choose. You can keep your writing private or share selected reflections as community blogs to connect with others.",
    },
  ];

  const toggleQuestion = (index) => {

    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-16 sm:py-20 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          {/* Header */}
          <div className="mb-12 text-center">
            <p className="text-muted-foreground mb-2 text-sm font-medium tracking-wide uppercase">
              FAQ
            </p>
            <h2 className="text-gray-700 text-3xl font-bold sm:text-4xl">
              Common questions
            </h2>
          </div>

          {/* FAQ List */}
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border-border overflow-hidden rounded-lg border transition-all duration-300"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.6)",
                }}
              >
                <button
                  onClick={() => toggleQuestion(index)}
                  className="text-foreground hover:bg-accent/50 flex w-full items-center justify-between p-6 text-left transition-colors"
                >
                  <span className="text-base font-medium sm:text-lg">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`text-muted-foreground h-5 w-5 shrink-0 transition-transform ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {openIndex === index && (
                  <div className="border-border bg-muted/30 animate-in fade-in slide-in-from-top-2 border-t px-6 pt-4 pb-6 duration-300">
                    <p className="text-muted-foreground text-sm leading-relaxed sm:text-base">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
