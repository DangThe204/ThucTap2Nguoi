import React from 'react';

const NewsHeader = () => {
    return (
        <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900">
                Tin Tức & Sự Kiện Khoa IT
            </h1>
            <p className="text-xl text-gray-600 mt-4 max-w-3xl mx-auto">
                Cập nhật các hoạt động, hội thảo và thành tựu nổi bật của Giảng viên và Sinh viên.
            </p>
            <div className="w-32 h-2 bg-blue-600 mx-auto mt-6 rounded-full"></div>
        </div>
    );
};

export default NewsHeader;