const CategoryCard = ({ category }) => {
  return (
    <div
      className="rounded-3xl border border-[#b22d64] bg-[#ebeddf]
                 p-5 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col h-full"
    >
      {/* Tall Image */}
      <img
        src={category.image}
        alt={category.title}
        className="w-full h-60 object-cover rounded-2xl mb-4"
      />

      {/* Content */}
      <h3 className="text-xl font-semibold text-[#2f7f6f]">
        {category.title}
      </h3>

      <p className="text-sm text-gray-700 mt-2 leading-relaxed">
        {category.description}
      </p>
    </div>
  );
};

export default CategoryCard;