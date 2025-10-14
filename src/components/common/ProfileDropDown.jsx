import { FiBell } from "react-icons/fi";
import { useAuth } from "../../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FiSettings } from "react-icons/fi";
import { MdOutlineDashboard } from "react-icons/md";
import { RiLogoutBoxRLine } from "react-icons/ri";

const ProfileDropDown = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const logOutHandler = async () => {
    await logout();

    navigate("/");
  };
  return (
    <div>
      <div className="z-[100] flex items-end justify-center gap-2 mr-1.5">
        {/* dropdown btn */}
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar flex"
          >
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-gray-100 rounded-sm z-1 mt-3 w-52 p-5 shadow flex flex-col gap-y-2"
          >
            {/* notification icon */}
            {user &&
              (["admin", "marketing", "employee"].includes(user.role) ? (
                <Link className="text-gray-800 btn text-sm flex justify-start gap-2 items-center lg:hidden">
                  <FiBell /> Notification
                </Link>
              ) : null)}

            {/* settings icon */}
            {user.role == "admin" ? (
              <Link className="text-gray-800 btn text-sm flex justify-start gap-2 items-center  lg:hidden">
                <FiSettings /> Settings
              </Link>
            ) : null}

            {/* dashboard link */}
            <Link className="btn" to={"/dashboard"}>
              <MdOutlineDashboard /> Dashboard
            </Link>

            {/* logout btn */}
            <button
              onClick={logOutHandler}
              className="bg-red-400 btn py-1 px-3"
            >
              <RiLogoutBoxRLine /> {t("navigation.logout")}
            </button>
          </ul>
        </div>
        <div className="lg:flex flex-col hidden">
          <p className="text-black text-[10px] lg:text-[16px] font-semibold">
            {user?.role}
          </p>
          <p className="text-gray-400 lg:text-xs text-[8px] ">{user?.role}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileDropDown;
