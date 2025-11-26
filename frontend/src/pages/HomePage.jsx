import React from 'react';

// --- Icon SVG nội tuyến cho phần Features ---
const IconSchool = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.906 59.906 0 0112 3.493a59.906 59.906 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.697 50.697 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5z" />
    </svg>
);

const IconNewspaper = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18V7.875c0-.621.504-1.125 1.125-1.125H6.75A2.25 2.25 0 009 4.5h6a2.25 2.25 0 002.25 2.25H18v.375z" />
    </svg>
);

const IconPeople = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 00-12.124 0M18 18.72a8.966 8.966 0 01.832 3.003h-13.664a8.966 8.966 0 01.832-3.003m12.124 0c.39-.494.74-1.024 1.03-1.588M5.876 18.72c.29-.564.64-1.094 1.03-1.588m9.218-12.33a8.966 8.966 0 01-12.124 0M18 6.39a8.966 8.966 0 00-12.124 0m12.124 0a8.966 8.966 0 01.832 3.003H5.044a8.966 8.966 0 01.832-3.003M12 4.5a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z" />
    </svg>
);

const IconArrowRight = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 ml-1 transition-transform duration-300 group-hover:translate-x-1">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
    </svg>
);


const HomePage = () => {
    return (
        <main className="bg-gray-50">
            <section className="relative h-[70vh] min-h-[600px] text-white flex items-center justify-center">
                <div className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: "url('/kcntt.jpg')" }}>
                </div>

                <div className="absolute inset-0 bg-linear-to-b from-black/50 via-black/30 to-black/70"></div>

                {/* Nội dung  (căn giữa) */}
                <div className="container mx-auto px-6 text-center relative z-10 flex flex-col items-center">
                    <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6 text-shadow-lg">
                        Kiến Tạo Tương Lai Số
                    </h1>
                    <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto mb-10 text-shadow-md">
                        Nơi cung cấp nguồn nhân lực Công nghệ Thông tin chất lượng cao, sẵn sàng đối mặt với thách thức của cuộc Cách mạng Công nghiệp 4.0.
                    </p>

                    {/* Nút bấm */}
                    <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                        <a href="#"
                            className="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-white bg-linear-to-r from-blue-600 to-blue-500 rounded-full shadow-lg hover:from-blue-700 hover:to-blue-600 transform hover:-translate-y-0.5 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ring-offset-black/50">
                            Tìm hiểu ngay
                        </a>
                        <a href="#"
                            className="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-white bg-white/20 rounded-full backdrop-blur-sm border border-white/50 hover:bg-white/30 transform hover:-translate-y-0.5 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/70 focus:ring-offset-2 ring-offset-black/50">
                            Thông tin tuyển sinh
                        </a>
                    </div>
                </div>
            </section>

            <section className="-mt-20 relative z-20 pb-20">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* thẻ 1 */}
                        <div
                            className="bg-white/90 backdrop-blur-xl p-8 rounded-2xl shadow-xl transform hover:-translate-y-2 transition-transform duration-300 border border-gray-200/75">
                            <div className="text-blue-600 mb-5">
                                <IconSchool />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-3">Chương Trình Đào Tạo</h3>
                            <p className="text-gray-600">Cập nhật theo xu hướng công nghệ mới nhất, đáp ứng nhu cầu doanh nghiệp.</p>
                        </div>
                        {/* thẻ 2 */}
                        <div
                            className="bg-white/90 backdrop-blur-xl p-8 rounded-2xl shadow-xl transform hover:-translate-y-2 transition-transform duration-300 border border-gray-200/75">
                            <div className="text-blue-600 mb-5">
                                <IconNewspaper />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-3">Tin Tức & Sự Kiện</h3>
                            <p className="text-gray-600">Luôn sôi động với các hội thảo, cuộc thi học thuật và hoạt động sinh viên.</p>
                        </div>
                        {/* thẻ 3 */}
                        <div
                            className="bg-white/90 backdrop-blur-xl p-8 rounded-2xl shadow-xl transform hover:-translate-y-2 transition-transform duration-300 border border-gray-200/75">
                            <div className="text-blue-600 mb-5">
                                <IconPeople />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-3">Giảng Viên & Chuyên Gia</h3>
                            <p className="text-gray-600">Đội ngũ giàu kinh nghiệm, tận tâm, luôn đồng hành cùng sinh viên.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- SECTION TIN TỨC --- */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-6">
                    {/* Tiêu đề */}
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">Tin Tức Mới Nhất</h2>
                        <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">Cập nhật những thông tin, sự kiện và hoạt động sôi nổi nhất từ Khoa Công Nghệ Thông Tin.</p>
                        <div className="w-24 h-1.5 bg-blue-600 mx-auto mt-6 rounded-full"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* thẻ Tin tức 1 */}
                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden group transform hover:shadow-2xl transition-all duration-300 border border-gray-100">
                            <div className="overflow-hidden h-56">
                                <img src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop"
                                    alt="Cuộc thi AI Challenge"
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                            </div>
                            <div className="p-6">
                                <span className="text-sm text-blue-600 font-semibold uppercase tracking-wide">HỌC THUẬT</span>
                                <h3 className="text-xl font-bold text-gray-900 mt-2 mb-3 leading-snug hover:text-blue-700 transition-colors">
                                    <a href="#">Cuộc thi "AI Challenge 2025" chính thức khởi động</a>
                                </h3>
                                <p className="text-gray-600 text-sm mb-4">Cơ hội để sinh viên thể hiện tài năng, sáng tạo với trí tuệ nhân tạo...</p>
                                <a href="#" className="inline-flex items-center text-blue-600 font-semibold group">
                                    Đọc thêm <IconArrowRight />
                                </a>
                            </div>
                        </div>
                        {/* thẻ Tin tức 2 */}
                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden group transform hover:shadow-2xl transition-all duration-300 border border-gray-100">
                            <div className="overflow-hidden h-56">
                                <img src="https://images.unsplash.com/photo-1605379399642-870262d3d051?q=80&w=1812&auto=format&fit=crop"
                                    alt="Hội thảo FPT Software"
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                            </div>
                            <div className="p-6">
                                <span className="text-sm text-blue-600 font-semibold uppercase tracking-wide">DOANH NGHIỆP</span>
                                <h3 className="text-xl font-bold text-gray-900 mt-2 mb-3 leading-snug hover:text-blue-700 transition-colors">
                                    <a href="#">Hội thảo hợp tác cùng FPT Software về Cloud Computing</a>
                                </h3>
                                <p className="text-gray-600 text-sm mb-4">Mở ra nhiều cơ hội thực tập và việc làm cho sinh viên khóa mới...</p>
                                <a href="#" className="inline-flex items-center text-blue-600 font-semibold group">
                                    Đọc thêm <IconArrowRight />
                                </a>
                            </div>
                        </div>
                        {/* thẻ Tin tức 3 */}
                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden group transform hover:shadow-2xl transition-all duration-300 border border-gray-100">
                            <div className="overflow-hidden h-56">
                                <img src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop"
                                    alt="Ngày hội việc làm IT"
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                            </div>
                            <div className="p-6">
                                <span className="text-sm text-blue-600 font-semibold uppercase tracking-wide">HOẠT ĐỘNG</span>
                                <h3 className="text-xl font-bold text-gray-900 mt-2 mb-3 leading-snug hover:text-blue-700 transition-colors">
                                    <a href="#">Ngày hội việc làm IT "Job Fair 2025" sắp diễn ra</a>
                                </h3>
                                <p className="text-gray-600 text-sm mb-4">Quy tụ hơn 50 doanh nghiệp hàng đầu trong lĩnh vực công nghệ...</p>
                                <a href="#" className="inline-flex items-center text-blue-600 font-semibold group">
                                    Đọc thêm <IconArrowRight />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default HomePage;
