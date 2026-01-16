import React, { useState } from 'react'
import { categories } from '../assets/assets.js';
import CategoryCard from './CategoryCard.jsx';

const InsightList = () => {

  return (
    <div>
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12 auto-rows-[1fr]">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="
                block rounded-xl
                transition-all duration-300
                hover:scale-102
                hover:shadow-xl
              "
            >
              <CategoryCard
                className="h-full flex flex-col justify-between"
                category={cat}
              />
            </div>  
          ))}
        </div>
      </div>
    </div>
  )
}

export default InsightList