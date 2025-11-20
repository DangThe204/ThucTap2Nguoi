import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const IconLogin = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 mr-2 -ml-1">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m-3-6l3-3m0 0l-3-3m3 3H9" />
    </svg>
);

const IconMenu = () => (
    <svg className="block h-7 w-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
    </svg>
);

const IconClose = () => (
    <svg className="block h-7 w-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
    </svg>
);

const NavLink = ({ href, children }) => (
    <a
        href={href}
        className="relative text-base font-medium text-gray-700 transition-colors duration-300 hover:text-blue-600 group py-2"
    >
        {children}
        <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
    </a>
);

// --- Component Link cho Mobile ---
const MobileNavLink = ({ href, children }) => (
    <a
        href={href}
        className="flex items-center px-4 py-3 text-lg font-medium text-gray-800 rounded-lg hover:bg-gray-100 transition-colors duration-200"
    >
        {children}
    </a>
);

const Header = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { user, logout } = useAuth();
    const navigate = useNavigate();


    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <header className="sticky top-0 z-50 w-full py-4">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <nav className="relative flex justify-between items-center h-20 px-8 bg-white/90 backdrop-blur-xl rounded-full shadow-lg border border-gray-200/75">

                    {/* --- PHẦN LOGO  --- */}
                    <a href="/" className="flex items-center space-x-3 group">
                        <img
                            src="/logo.png"
                            alt="Logo Khoa CNTT"
                            className="h-11 w-auto transition-transform duration-300 group-hover:scale-105"
                        />
                        <div>
                            <h1 className="text-xs font-semibold text-blue-700 uppercase tracking-wide">
                                Trường CĐ Nghề TP.HCM
                            </h1>
                            <h2 className="text-xl font-bold text-gray-900">
                                Khoa Công Nghệ Thông Tin
                            </h2>
                        </div>
                    </a>

                    {/* --- NAV MENU--- */}
                    <div className="hidden md:flex items-center space-x-10">
                        <NavLink href="/">Trang Chủ</NavLink>
                        <NavLink href="/NewsPage">Tin tức & sự kiên</NavLink>
                        <NavLink href="/thoi-khoa-bieu">Thời khóa biểu</NavLink>
                        <NavLink href="/lich-thi">Lịch Thi</NavLink>
                    </div>

                    {/* --- NÚT ĐĂNG NHẬP --- */}
                    <div className="hidden md:flex items-center">
                        {user ? (
                            // Nếu đã đăng nhập
                            <div className="flex items-center space-x-4">
                                <span className="text-gray-800 font-medium">
                                    Chào, {user.username}!
                                </span>
                                <button
                                    onClick={handleLogout}
                                    className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-red-500 rounded-full shadow-md hover:bg-red-600 transform hover:-translate-y-0.5 transition-all duration-300"
                                >
                                    Đăng Xuất
                                </button>
                            </div>
                        ) : (
                            // Nếu chưa đăng nhập
                            <Link
                                to="/LoginPage"
                                className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-gradient-to-r from-blue-600 to-blue-500 rounded-full shadow-md hover:from-blue-700 hover:to-blue-600 transform hover:-translate-y-0.5 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                                <IconLogin />
                                Đăng Nhập
                            </Link>
                        )}
                    </div>

                    {/* --- NÚT BẤM MENU  --- */}
                    <div className="md:hidden">
                        <button
                            onClick={toggleMobileMenu}
                            type="button"
                            className="inline-flex items-center justify-center p-2 text-gray-700 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                            aria-controls="mobile-menu"
                            aria-expanded={isMobileMenuOpen}
                        >
                            <span className="sr-only">Mở menu chính</span>
                            <IconMenu />
                        </button>
                    </div>
                </nav>
            </div>

            <div
                className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300
                    ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}
                `}
                onClick={toggleMobileMenu}
                aria-hidden="true"
            ></div>

            {/* --- Mobile Menu --- */}
            <div
                className={`
                    fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50
                    transition-transform duration-300 ease-in-out
                    ${isMobileMenuOpen ? 'transform-none' : 'translate-x-full'}
                `}
                id="mobile-menu"
            >
                {/* Header*/}
                <div className="flex justify-between items-center h-20 px-6 border-b border-gray-200">
                    <h2 className="text-xl font-bold text-gray-900">Menu</h2>
                    <button
                        onClick={toggleMobileMenu}
                        type="button"
                        className="inline-flex items-center justify-center p-2 text-gray-700 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                    >
                        <span className="sr-only">Đóng menu</span>
                        <IconClose />
                    </button>
                </div>

                {/* Nội dung */}
                <div className="flex flex-col justify-between h-[calc(100vh-80px)] p-6">
                    <div className="space-y-3">
                        <MobileNavLink href="#">Trang Chủ</MobileNavLink>
                        <MobileNavLink href="#">Xem kế hoạch</MobileNavLink>
                        <MobileNavLink href="#">Thời khóa biểu</MobileNavLink>
                        <MobileNavLink href="#">Lịch Thi</MobileNavLink>
                    </div>

                    {/* Nút đăng nhập trên */}
                    {user ? (
                        <button
                            onClick={handleLogout}
                            className="inline-flex items-center justify-center w-full px-6 py-4 text-base font-medium text-white bg-red-500 rounded-lg shadow-md hover:bg-red-600 transition-all duration-300"
                        >
                            Đăng Xuất
                        </button>
                    ) : (
                        <Link
                            to="/LoginPage"
                            className="inline-flex items-center justify-center w-full px-6 py-4 text-base font-medium text-white bg-gradient-to-r from-blue-600 to-blue-500 rounded-lg shadow-md hover:from-blue-700 hover:to-blue-600 transition-all duration-300"
                        >
                            <IconLogin />
                            Đăng Nhập
                        </Link>
                    )}
                </div>
            </div>
        </header>
    );
}

export default Header;

