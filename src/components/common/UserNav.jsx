import { useState, useRef, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import LanguageSwitcher from "./LanguageSwitcher";
import { useTranslation } from "react-i18next"; 
import { MdMenu, MdOutlineDashboard } from "react-icons/md";
import ProfileDropDown from "./ProfileDropDown";
import { useAuth } from "../../hooks/useAuth";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { BiX } from "react-icons/bi";

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();
  const { user, loading, logout } = useAuth();
  const navigate = useNavigate();
  const menuRef = useRef(null); // <-- ref for mobile menu

  const logOutHandler = async () => {
    await logout();
    navigate("/");
  };

  const navLinks = [
    { name: t("nav.home"), href: "/" },
    { name: t("nav.about"), href: "/about" },
    { name: t("nav.services"), href: "/services" },
    { name: t("nav.trainings"), href: "/trainings" },
    { name: t("nav.blog"), href: "/blog" },
    { name: t("nav.contact"), href: "/contact" },
  ];

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50 px-4 sm:px-6 md:px-8 lg:px-10">
      <div className="max-w-7xl mx-auto xl:h-20 flex items-center justify-center">
        <div className="flex justify-between items-center w-full h-16">
          {/* Logo */}
          <Link to={"/"} className="flex items-center">
            <div className="flex items-center justify-items-start">
              <img src={"/assets/images/logo.png"} alt="navlogo" />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center xl:space-x-8 space-x-4">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.href}
                className="!text-gray-700 hover:text-green-500 transition-colors duration-200 text-[13px] xl:text-[16px] font-medium"
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            <LanguageSwitcher />
            <button className="!bg-green-500 cursor-pointer hover:bg-green-600 text-white px-6 py-2 rounded-md text-sm font-medium transition-colors duration-200">
              {t("nav.download")}
            </button>

            {loading ? (
              <span className="loading loading-spinner"></span>
            ) : user ? (
              <ProfileDropDown />
            ) : (
              <Link
                to={"/login"}
                className="border border-green-500 hover:bg-green-600 hover:text-white text-green-500 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              >
                {t("nav.login")}
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center space-x-2">
            <LanguageSwitcher />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-green-500 transition-colors duration-200"
            >
              {isOpen ? <BiX className="w-6 h-6" /> : <MdMenu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div
          ref={menuRef}
          className="lg:hidden fixed top-16 left-0 w-full z-50 bg-white border-t border-gray-200"
        >
          <div className="px-4 mx-auto w-11/12 pt-2 pb-4 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="block !text-gray-700 hover:text-green-500 transition-colors duration-200 text-base font-medium py-2"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}

            <div className="pt-4 border-t border-gray-200 space-y-3">
              <button className="w-full bg-green-500 hover:bg-green-600 text-white px-6 py-3 text-sm rounded-md font-medium transition-colors duration-200">
                {t("nav.download")}
              </button>

              {user ? (
                <div className="space-y-3">
                  <Link
                    className="w-full flex items-center justify-center gap-2 bg-gray-300 text-black px-6 py-3 text-sm rounded-md font-medium transition-colors duration-200"
                    to={"/dashboard"}
                    onClick={() => setIsOpen(false)}
                  >
                    <MdOutlineDashboard /> Dashboard
                  </Link>
                  <button
                    onClick={logOutHandler}
                    className="bg-red-400 rounded-md font-medium flex justify-center items-center gap-2 w-full px-6 py-3 text-white"
                  >
                    <RiLogoutBoxRLine /> {t("navigation.logout")}
                  </button>
                </div>
              ) : (
                <Link
                  to={"/login"}
                  className="border-green-500 block text-center w-full border bg-transparent shadow-none hover:bg-green-600 text-green-500 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  {t("nav.login")}
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
