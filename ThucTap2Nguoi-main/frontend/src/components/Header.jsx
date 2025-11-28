import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

/* ====== ICONS ====== */
const IconLogin = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 mr-2 -ml-1">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m-3-6l3-3m0 0l-3-3m3 3H9" />
    </svg>
);

const IconMenu = () => (
    <svg className="block h-7 w-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
    </svg>
);

const IconClose = () => (
    <svg className="block h-7 w-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
    </svg>
);

/* ====== LINKS ====== */
const NavLink = ({ href, children }) => (
    <Link
        to={href}
        className="relative text-base font-medium text-gray-700 transition-colors duration-300 hover:text-blue-600 group py-2"
    >
        {children}
        <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
    </Link>
);

const MobileNavLink = ({ href, children }) => (
    <Link
        to={href}
        className="flex items-center px-4 py-3 text-lg font-medium text-gray-800 rounded-lg hover:bg-gray-100 transition-colors duration-200"
    >
        {children}
    </Link>
);

/* ====== MAIN HEADER ====== */
const Header = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <header className="sticky top-0 z-50 w-full py-4">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <nav className="relative flex justify-between items-center h-20 px-8 bg-white/90 backdrop-blur-xl rounded-full shadow-lg border border-gray-200/75">

                    {/* LOGO */}
                    <Link to="/" className="flex items-center space-x-3 group">
                        <img src="/logo.png" className="h-11 w-auto" />
                        <div>
                            <h1 className="text-xs font-semibold text-blue-700">Trường CĐ Nghề TP.HCM</h1>
                            <h2 className="text-xl font-bold text-gray-900">Khoa Công Nghệ Thông Tin</h2>
                        </div>
                    </Link>

                    {/* DESKTOP MENU */}
                    <div className="hidden md:flex items-center space-x-10">
                        <NavLink href="/">Trang Chủ</NavLink>
                        <NavLink href="/NewsPage">Tin tức & sự kiện</NavLink>
                        <NavLink href="/thoi-khoa-bieu">Thời khóa biểu</NavLink>

                        {/* ADMIN: chuyển trang đúng */}
                        <NavLink href={user?.role === 'admin' ? '/admin/quan-ly-lich-thi' : '/lich-thi'}>
                            Lịch Thi
                        </NavLink>
                    </div>

                    {/* LOGIN / LOGOUT */}
                    <div className="hidden md:flex items-center">
                        {user ? (
                            <div className="flex items-center space-x-4">
                                <span className="text-gray-800 font-medium">Chào, {user.username}!</span>
                                <button onClick={handleLogout} className="px-6 py-3 bg-red-500 text-white rounded-full">
                                    Đăng Xuất
                                </button>
                            </div>
                        ) : (
                            <Link to="/login" className="px-6 py-3 bg-blue-600 text-white rounded-full">
                                Đăng Nhập
                            </Link>
                        )}
                    </div>

                    {/* MOBILE BUTTON */}
                    <div className="md:hidden">
                        <button onClick={toggleMobileMenu}>
                            <IconMenu />
                        </button>
                    </div>
                </nav>
            </div>

            {/* MOBILE MENU OVERLAY */}
            <div
                className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ${isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                    }`}
                onClick={toggleMobileMenu}
            ></div>

            {/* MOBILE SIDEBAR */}
            <div
                className={`fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-xl z-50 transition-transform duration-300 ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                <div className="flex justify-between items-center h-20 px-6 border-b border-gray-200">
                    <h2 className="text-xl font-bold">Menu</h2>
                    <button onClick={toggleMobileMenu}>
                        <IconClose />
                    </button>
                </div>

                <div className="p-6 space-y-3">
                    <MobileNavLink href="/">Trang Chủ</MobileNavLink>
                    <MobileNavLink href="/NewsPage">Tin tức & sự kiện</MobileNavLink>
                    <MobileNavLink href="/thoi-khoa-bieu">Thời khóa biểu</MobileNavLink>

                    {/* ❗ Lịch thi cho mobile */}
                    <MobileNavLink href={user?.role === 'admin' ? '/admin/quan-ly-lich-thi' : '/lich-thi'}>
                        Lịch Thi
                    </MobileNavLink>
                </div>

                <div className="p-6">
                    {user ? (
                        <button onClick={handleLogout} className="w-full py-4 bg-red-500 text-white rounded-lg">Đăng Xuất</button>
                    ) : (
                        <Link to="/login" className="w-full py-4 bg-blue-600 text-white rounded-lg block text-center">Đăng Nhập</Link>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
