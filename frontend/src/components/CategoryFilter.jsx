import React from 'react';

const CategoryFilter = ({ categories, activeCategory, setActiveCategory }) => {
    return (
        <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map(category => (
                <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`
                        px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 shadow-md 
                        ${activeCategory === category
                            ? 'bg-blue-600 text-white transform scale-105'
                            : 'bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-700 border border-gray-200'
                        }
                    `}
                >
                    {category}
                </button>
            ))}
        </div>
    );
};

export default CategoryFilter;