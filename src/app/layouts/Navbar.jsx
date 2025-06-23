import { DropdownNav } from "@components/dropdown/DropdownNav";
import { Link } from "react-router-dom";
import { useAuthStore } from "@stores/useAuthStore";
import { useLogout } from "@features/auth/hooks/useAuthMutate";

export const Navbar = () => {
  const { isAdmin, isAuthenticated, openAuthModal, closeAuthModal } =
    useAuthStore((state) => state);

  const { mutate: logout } = useLogout();

  return (
    <nav className="navbar">
      <Link onClick={closeAuthModal} to="/" className="navbar-link">
        首頁
      </Link>
      <button
        onClick={isAuthenticated ? logout : openAuthModal}
        className="navbar-button"
      >
        {isAuthenticated ? "登出" : "登入"}
      </button>
      <DropdownNav
        label="我是買家"
        items={[{ name: "訂單管理", to: "/buyer/orders" }]}
      />
      <DropdownNav
        label="我是賣家"
        items={[
          { name: "刊登出售", to: "/products/create" },
          { name: "賣場管理", to: "/seller/products" },
        ]}
      />
      <DropdownNav
        label="會員中心"
        items={[
          { name: "圖片管理", to: "/user/images" },
          { name: "裝置管理", to: "/user/deviced" },
        ]}
      />
      {isAdmin && (
        <DropdownNav
          label="Admin"
          items={[{ name: "分類管理", to: "/admin/category" }]}
        />
      )}
    </nav>
  );
};
