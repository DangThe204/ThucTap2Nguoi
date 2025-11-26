import React from 'react';

// Icon Arrow Right (Tái sử dụng)
const IconArrowRight = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 ml-1 transition-transform duration-300 group-hover:translate-x-1">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
    </svg>
);

const NewsCard = ({ news }) => {
    return (
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden group transform hover:shadow-2xl transition-all duration-300 border border-gray-100">
            <div className="overflow-hidden h-56">
                <img 
                    src={news.image}
                    alt={news.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
            </div>
            <div className="p-6">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-blue-600 font-semibold uppercase tracking-wide">{news.category}</span>
                    <span className="text-xs text-gray-500">{news.date}</span>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mt-2 mb-3 leading-snug hover:text-blue-700 transition-colors">
                    <a href={`/news/${news.id}`}>{news.title}</a>
                </h3>
                <p className="text-gray-600 text-sm mb-4">{news.summary}</p>
                
                <a href={`/news/${news.id}`} className="inline-flex items-center text-blue-600 font-semibold group">
                    Đọc thêm <IconArrowRight />
                </a>
            </div>
        </div>
    );
};

export default NewsCard;