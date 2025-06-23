import { Outlet } from "react-router-dom";

import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

import { AuthModal } from "@features/auth/modal/AuthModal";
import { ConfirmDialog } from "@components/ui/ConfirmDialog";

import { useAuthStore } from "@app/stores/useAuthStore";

import { ChatRoom } from "@features/chatRoom/ChatRoom";

export const MainLayout = () => {
  const isOpenModal = useAuthStore((state) => state.isOpenModal);
  const closeAuthModal = useAuthStore((state) => state.closeAuthModal);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return (
    <div className="layout-container">
      <header className="layout-header">
        <Navbar />
      </header>
      <main className="layout-main">
        <Outlet />
        <AuthModal isOpen={isOpenModal} onClose={closeAuthModal} />
        <ConfirmDialog />
      </main>

      <footer className="layout-footer">
        {isAuthenticated && <ChatRoom />}
        <Footer />
      </footer>
    </div>
  );
};
