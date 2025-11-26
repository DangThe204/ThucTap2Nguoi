import React from 'react';
import NewsHeader from './NewsHeader';
import NewsList from './NewsList';     

const NewsPage = () => {
    return (
        <main className="bg-gray-50 py-24">
            <div className="container mx-auto px-6">
                
                {/* 1. Tiêu đề Trang */}
                <NewsHeader />

                {/* 2. Thanh Lọc và Danh sách Tin tức */}
                <NewsList />

            </div>
        </main>
    );
}

export default NewsPage;