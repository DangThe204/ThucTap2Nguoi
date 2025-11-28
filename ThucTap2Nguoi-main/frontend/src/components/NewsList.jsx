import React, { useState } from 'react';
import NewsCard from './NewsCard'; // Nhớ import
import CategoryFilter from './CategoryFilter'; // Nhớ import

// Dữ liệu giả định (Thực tế sẽ fetch từ API/JSON)
const newsData = [
    { id: 1, category: 'HỌC THUẬT', title: 'Cuộc thi "AI Challenge 2025" chính thức khởi động', date: '01/11/2025', summary: 'Cơ hội để sinh viên thể hiện tài năng, sáng tạo với trí tuệ nhân tạo...', image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop' },
    { id: 2, category: 'DOANH NGHIỆP', title: 'Hội thảo hợp tác cùng FPT Software về Cloud Computing', date: '25/10/2025', summary: 'Mở ra nhiều cơ hội thực tập và việc làm cho sinh viên khóa mới...', image: 'https://images.unsplash.com/photo-1605379399642-870262d3d051?q=80&w=1812&auto=format&fit=crop' },
    { id: 3, category: 'HOẠT ĐỘNG', title: 'Ngày hội việc làm IT "Job Fair 2025" sắp diễn ra', date: '15/10/2025', summary: 'Quy tụ hơn 50 doanh nghiệp hàng đầu trong lĩnh vực công nghệ...', image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop' },
    // ... Thêm các tin khác
];

const categories = ['Tất cả', 'HỌC THUẬT', 'DOANH NGHIỆP', 'HOẠT ĐỘNG'];

const NewsList = () => {
    const [activeCategory, setActiveCategory] = useState('Tất cả');

    const filteredNews = newsData.filter(item => 
        activeCategory === 'Tất cả' || item.category === activeCategory
    );

    return (
        <>
            <CategoryFilter 
                categories={categories}
                activeCategory={activeCategory}
                setActiveCategory={setActiveCategory}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {filteredNews.length > 0 ? (
                    filteredNews.map(news => (
                        <NewsCard key={news.id} news={news} />
                    ))
                ) : (
                    <p className="col-span-full text-center text-lg text-gray-500 py-10">
                        Không tìm thấy tin tức nào trong danh mục này.
                    </p>
                )}
            </div>
            
            {/* Phân trang / Nút "Xem thêm" */}
            <div className="mt-16 text-center">
                <button className="px-6 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-colors font-medium">
                    Xem thêm tin cũ
                </button>
            </div>
        </>
    );
};

export default NewsList;