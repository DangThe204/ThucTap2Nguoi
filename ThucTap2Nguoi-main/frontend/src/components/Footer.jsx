import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white">
            <div className="container mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Khoa Công Nghệ Thông Tin</h3>
                        <p className="text-gray-400">Trường Cao đẳng nghề TP.HCM</p>
                        <p className="text-gray-400 mt-2">Địa chỉ: 235 Hoàng Sa, Phường Tân Định, Quận 1, TP.HCM</p>
                        <p className="text-gray-400">Email: contact@cntt.hcmvc.edu.vn</p>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4">Liên kết nhanh</h3>
                        <ul className="space-y-2">
                            <li><a href="/thoi-khoa-bieu" className="text-gray-400 hover:text-white">Thời khóa biểu</a></li>
                            <li><a href="/lich-thi" className="text-gray-400 hover:text-white">Lịch thi</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white">Tài liệu học tập</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white">Cổng thông tin sinh viên</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4">Các chuyên ngành</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-gray-400 hover:text-white">Phát triển phần mềm</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white">An ninh mạng</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white">Thiết kế đồ họa</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white">Quản trị mạng</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4">Kết nối với chúng tôi</h3>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-400 hover:text-white text-2xl"><ion-icon
                                name="logo-facebook"></ion-icon></a>
                            <a href="#" className="text-gray-400 hover:text-white text-2xl"><ion-icon
                                name="logo-youtube"></ion-icon></a>
                            <a href="#" className="text-gray-400 hover:text-white text-2xl"><ion-icon
                                name="logo-linkedin"></ion-icon></a>
                        </div>
                    </div>

                </div>
                <div className="mt-12 border-t border-gray-700 pt-6 text-center text-gray-500">
                    <p>&copy; 2025 Khoa Công Nghệ Thông Tin - Trường Cao đẳng nghề TP.HCM. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;