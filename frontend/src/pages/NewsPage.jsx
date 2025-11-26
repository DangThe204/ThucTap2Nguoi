import React, { useState, useEffect } from 'react'; // [SỬA] THÊM useEffect
import axios from 'axios';
import { Link } from 'react-router-dom';

// Icon Arrow Right (Sử dụng cho nút "Đọc thêm")
const IconArrowRight = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 ml-1 transition-transform duration-300 group-hover:translate-x-1">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
    </svg>
);

const categories = ['Tất cả', 'HỌC THUẬT', 'DOANH NGHIỆP', 'HOẠT ĐỘNG'];

const NewsPage = () => {
    // [THÊM] State để lưu dữ liệu từ API
    const [allNews, setAllNews] = useState([]); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    // State cho việc lọc
    const [activeCategory, setActiveCategory] = useState('Tất cả');
    
    // [THÊM] Logic tải dữ liệu từ Backend
    useEffect(() => {
        const fetchNews = async () => {
            try {
                setLoading(true);
                setError(null);
                // Giả sử API endpoint để lấy danh sách tin tức là /api/news
                // Dùng axios đã config (nếu có, nếu không thì dùng axios thường)
                const res = await axios.get('/api/news'); 
                setAllNews(res.data);
            } catch (err) {
                console.error('Lỗi khi tải tin tức:', err);
                // Có thể lỗi do server backend chưa chạy (http://localhost:8080)
                setError('Không thể tải tin tức. Vui lòng kiểm tra Server Backend.'); 
            } finally {
                setLoading(false);
            }
        };
        fetchNews();
    }, []); // Chỉ chạy 1 lần khi component được mount

    // [CẬP NHẬT] Logic lọc tin tức dựa trên dữ liệu thật (tạm thời không có trường category trong model bạn gửi)
    // Nếu bạn muốn dùng filter, bạn cần thêm trường 'category' vào News.model.js
    const filteredNews = allNews.filter(item => 
        // Vì News.model.js không có trường category, ta tạm thời bỏ qua lọc
        // Nếu có category, logic sẽ là: activeCategory === 'Tất cả' || item.category === activeCategory
        true 
    );
    
    // [CẬP NHẬT] NewsCard sử dụng các trường dữ liệu thật
    const NewsCard = ({ news }) => (
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden group transform hover:shadow-2xl transition-all duration-300 border border-gray-100">
           <div className="overflow-hidden h-56">
        {/* Kiểm tra xem news.imageUrl có tồn tại không */}
        {news.imageUrl ? (
            <img 
                src={`http://localhost:8080${news.imageUrl}`} 
                alt={news.tieuDe}
                // Thêm các class cần thiết để ảnh hiển thị đúng kích thước
                className="w-full h-full object-cover" 
            />
        ) : (
            // Chỉ hiển thị placeholder khi không có ảnh
            <div className='w-full h-full bg-gray-200 flex items-center justify-center text-gray-500'>
                [Chưa có ảnh]
            </div>
        )}
            </div>
            <div className="p-6">
                <div className="flex justify-between items-center mb-2">
                    {/* [SỬA] Dùng news.category nếu có, nếu không dùng CHUNG */}
                    <span className="text-sm text-blue-600 font-semibold uppercase tracking-wide">{news.category || 'CHUNG'}</span> 
                    {/* [SỬA] Dùng createdAt từ MongoDB */}
                    <span className="text-xs text-gray-500">{new Date(news.createdAt).toLocaleDateString('vi-VN')}</span> 
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mt-2 mb-3 leading-snug hover:text-blue-700 transition-colors">
                    {/* [SỬA] Dùng tieuDe và _id/slug */}
                    {/* Dùng news.slug cho URL thân thiện hoặc news._id */}
                    <Link to={`/NewsPage/${news.slug || news._id}`}>{news.tieuDe}</Link> 
                </h3>
                {/* [SỬA] Dùng noiDung (tóm tắt 150 ký tự) */}
                <p className="text-gray-600 text-sm mb-4">
                    {news.noiDung.substring(0, 150)}{news.noiDung.length > 150 ? '...' : ''}
                </p>
                
                {/* [SỬA] Dùng _id/slug cho Link */}
                <Link to={`/NewsPage/${news.slug || news._id}`} className="inline-flex items-center text-blue-600 font-semibold group"> 
                    Đọc thêm <IconArrowRight />
                </Link>
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
                    {loading ? (
                        <p className="col-span-full text-center text-lg text-blue-500 py-10">
                            Đang tải tin tức...
                        </p>
                    ) : error ? (
                         <p className="col-span-full text-center text-lg text-red-500 py-10">
                            {error}
                        </p>
                    ) : filteredNews.length > 0 ? (
                        filteredNews.map(news => (
                            <NewsCard key={news._id} news={news} /> // [SỬA] Dùng news._id
                        ))
                    ) : (
                        <p className="col-span-full text-center text-lg text-gray-500 py-10">
                            Không tìm thấy tin tức nào.
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