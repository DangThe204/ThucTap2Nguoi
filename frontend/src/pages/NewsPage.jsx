import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// --- Tái sử dụng Icon từ HomePage.jsx ---
// Icon Arrow Right (Sử dụng cho nút "Đọc thêm")
const IconArrowRight = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 ml-1 transition-transform duration-300 group-hover:translate-x-1">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
    </svg>
);

// Dữ liệu tin tức giả định
const newsData = [
    { 
        id: 1, 
        category: 'HỌC THUẬT', 
        title: 'Cuộc thi "AI Challenge 2025" chính thức khởi động', 
        date: '01/11/2025', 
        summary: 'Cơ hội để sinh viên thể hiện tài năng, sáng tạo với trí tuệ nhân tạo...', 
        image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop' // AI/Coding
    },
    { 
        id: 2, 
        category: 'DOANH NGHIỆP', 
        title: 'Hội thảo hợp tác cùng FPT Software về Cloud Computing', 
        date: '25/10/2025', 
        summary: 'Mở ra nhiều cơ hội thực tập và việc làm cho sinh viên khóa mới...', 
        image: 'https://images.unsplash.com/photo-1605379399642-870262d3d051?q=80&w=1812&auto=format&fit=crop' // Hội thảo/Hợp tác
    },
    { 
        id: 3, 
        category: 'HOẠT ĐỘNG', 
        title: 'Ngày hội việc làm IT "Job Fair 2025" sắp diễn ra', 
        date: '15/10/2025', 
        summary: 'Quy tụ hơn 50 doanh nghiệp hàng đầu trong lĩnh vực công nghệ...', 
        image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop' // <<< ĐÃ ĐỔI (Tuyển dụng/Phỏng vấn)
    },
    { 
        id: 4, 
        category: 'HỌC THUẬT', 
        title: 'Giới thiệu chuyên ngành mới: Phát triển Game di động', 
        date: '05/09/2025', 
        summary: 'Đào tạo lập trình viên chuyên sâu về Unity và Unreal Engine.', 
        image: 'https://images.unsplash.com/photo-1627993203994-e8b23f2f5341?q=80&w=2070&auto=format&fit=crop' // Thiết kế 3D/Game
    },
    { 
        id: 5, 
        category: 'HOẠT ĐỘNG', 
        title: 'Chung kết cuộc thi sáng tạo lập trình sinh viên', 
        date: '20/08/2025', 
        summary: 'Vinh danh các dự án xuất sắc ứng dụng AI và IoT.', 
        image: 'https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?q=80&w=2070&auto=format&fit=crop' // Nhóm làm việc/Thành tựu
    },
    { 
        id: 6, 
        category: 'DOANH NGHIỆP', 
        title: 'Chương trình Mentoring 1:1 cùng VNPT Technology', 
        date: '01/08/2025', 
        summary: 'Cơ hội học hỏi trực tiếp từ các chuyên gia hàng đầu về viễn thông.', 
        image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2070&auto=format&fit=crop' // Người hướng dẫn/Trao đổi
    },
];

const categories = ['Tất cả', 'HỌC THUẬT', 'DOANH NGHIỆP', 'HOẠT ĐỘNG'];


const NewsPage = () => {
    const [activeCategory, setActiveCategory] = useState('Tất cả');

    const filteredNews = newsData.filter(item => 
        activeCategory === 'Tất cả' || item.category === activeCategory
    );

    const NewsCard = ({ news }) => (
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden group transform hover:shadow-2xl transition-all duration-300 border border-gray-100">
            <div className="overflow-hidden h-56">
                <img src={news.image}
                    alt={news.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
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

    return (
        <main className="bg-gray-50 py-24">
            <div className="container mx-auto px-6">
                
                {/* --- HEADER TIN TỨC --- */}
                <div className="text-center mb-16">
                    <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900">
                        Tin Tức & Sự Kiện Khoa IT
                    </h1>
                    <p className="text-xl text-gray-600 mt-4 max-w-3xl mx-auto">
                        Cập nhật các hoạt động, hội thảo và thành tựu nổi bật của Giảng viên và Sinh viên.
                    </p>
                    <div className="w-32 h-2 bg-blue-600 mx-auto mt-6 rounded-full"></div>
                </div>

                {/* --- THANH LỌC (FILTER) --- */}
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

                {/* --- DANH SÁCH TIN TỨC --- */}
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
                
                {/* --- PHÂN TRANG (Tùy chọn) --- */}
                <div className="mt-16 text-center">
                    <button className="px-6 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-colors font-medium">
                        Xem thêm tin cũ
                    </button>
                </div>

            </div>
        </main>
    );
}

export default NewsPage;