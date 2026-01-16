import React from 'react'
import { useState, useEffect } from 'react';
import { assets } from '../assets/assets';

const categories = [
  {
    title: "Mindful Productivity",
    description:
      "For days when you want to move forward, but kindly.",
    icon: assets.mindfulproductivity,
  },
  {
    title: "Self-Love & Compassion",
    description:
      "Build a kinder relationship with yourself, one reflection at a time.",
    icon: assets.selflove,
  },
  {
    title: "Personal Reflection",
    description:
      "A private space to write freely, release emotions, and understand yourself.",
    icon: assets.selfreflection,
  },
  {
    title: "Safe Conversations",
    description:
      "Talk openly about what you’re feeling — anonymously and at your pace.",
    icon: assets.safe,
  },
];

const Usecases = () => {

  const [activeCase, setActiveCase] = useState(0);

  // Auto-cycle through use cases every 2.5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCase((current) => (current + 1) % categories.length);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="use-cases" className="py-16 sm:py-20 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center sm:mb-14">
          <p className="text-muted-foreground mb-3 text-sm font-semibold tracking-[0.2em] uppercase">
            Designed for your inner world
          </p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl text-gray-700">
            Built to meet you where you are.
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4 mx-auto max-w-6xl">
          {categories.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className={`w-65 rounded-2xl border p-8 text-center shadow-sm transition-all border-[#b22d64]/40  duration-500 bg-[#b22d64]/10 ${
                  activeCase === index
                    ? "border-border/70 bg-muted/30 scale-105"
                    : "border-border/40 bg-muted/20 hover:border-border/70 hover:bg-muted/30"
                }`}
              >
                <div className="mb-6 flex justify-center">
                  <div className="bg-muted/40 flex h-14 w-14 items-center justify-center rounded-full">
                              <img
                    src={item.icon}
                    alt={item.title}
                    className="w-20 h-20 object-cover mb-4"
                  />
                  </div>
                </div>
                <h3 className="text-foreground mb-3 text-lg font-semibold">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  )
}

export default Usecases