import React, { useCallback, useEffect, useState } from 'react';
import { BrowserRouter, Outlet, Route, Routes, useLocation } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { RfqModal } from './components/RfqModal';
import { AdminLayout } from './components/AdminLayout';
import { HomePage } from './pages/HomePage';
import { CataloguePage } from './pages/CataloguePage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { AboutUsPage } from './pages/AboutUsPage';
import { LoginPage } from './pages/LoginPage';
import { CreateAccountPage } from './pages/CreateAccountPage';
import { ForgotPasswordPage } from './pages/ForgotPasswordPage';
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';
import { AdminProductsPage } from './pages/admin/AdminProductsPage';
import { AdminAddProductPage } from './pages/admin/AdminAddProductPage';
import { AdminEmailSenderPage } from './pages/admin/AdminEmailSenderPage';
import { AdminCategoriesPage } from './pages/admin/AdminCategoriesPage';
import { AdminInquiriesPage } from './pages/admin/AdminInquiriesPage';
import { AdminContentPage } from './pages/admin/AdminContentPage';
import { AdminSettingsPage } from './pages/admin/AdminSettingsPage';

const ScrollManager: React.FC = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const targetId = hash.replace(/^#/, '');
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [pathname, hash]);

  return null;
};

interface PublicLayoutProps {
  onOpenRfq: (targetLabel?: string) => void;
  manifestCount: number;
}

const PublicLayout: React.FC<PublicLayoutProps> = ({
  onOpenRfq,
  manifestCount,
}) => (
  <div className="min-h-screen flex flex-col bg-surface text-on-surface">
    <Header onOpenRfq={onOpenRfq} manifestCount={manifestCount} />

    <main className="w-full pt-28 bg-surface flex-1">
      <Outlet />
    </main>

    <Footer onOpenRfq={onOpenRfq} />
  </div>
);

const AppShell: React.FC = () => {
  const [rfqOpen, setRfqOpen] = useState(false);
  const [rfqTargetLabel, setRfqTargetLabel] = useState<string | undefined>(undefined);
  const [manifestRefs, setManifestRefs] = useState<string[]>([
    'BN-SC-101',
    'BN-NH-402',
  ]);

  const handleOpenRfq = useCallback((targetLabel?: string) => {
    setRfqTargetLabel(targetLabel);
    setRfqOpen(true);
  }, []);

  const handleCloseRfq = useCallback(() => {
    setRfqOpen(false);
  }, []);

  const handleToggleManifest = useCallback((refCode: string) => {
    setManifestRefs((prev) =>
      prev.includes(refCode)
        ? prev.filter((item) => item !== refCode)
        : [...prev, refCode]
    );
  }, []);

  return (
    <>
      <ScrollManager />

      <Routes>
        <Route
          element={
            <PublicLayout
              onOpenRfq={handleOpenRfq}
              manifestCount={manifestRefs.length}
            />
          }
        >
          <Route path="/" element={<HomePage onOpenRfq={handleOpenRfq} />} />
          <Route
            path="/products"
            element={
              <CataloguePage
                onOpenRfq={handleOpenRfq}
                manifestRefs={manifestRefs}
                onToggleManifest={handleToggleManifest}
              />
            }
          />
          <Route
            path="/products/:id"
            element={<ProductDetailPage onOpenRfq={handleOpenRfq} />}
          />
          <Route
            path="/about-us"
            element={<AboutUsPage onOpenRfq={handleOpenRfq} />}
          />
          <Route
            path="/login"
            element={<LoginPage onOpenRfq={handleOpenRfq} />}
          />
          <Route path="/create-account" element={<CreateAccountPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="*" element={<HomePage onOpenRfq={handleOpenRfq} />} />
        </Route>

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboardPage />} />
          <Route path="products" element={<AdminProductsPage />} />
          <Route path="products/new" element={<AdminAddProductPage />} />
          <Route path="products/:id/edit" element={<AdminAddProductPage />} />
          <Route path="categories" element={<AdminCategoriesPage />} />
          <Route path="inquiries" element={<AdminInquiriesPage />} />
          <Route path="email" element={<AdminEmailSenderPage />} />
          <Route path="content" element={<AdminContentPage />} />
          <Route path="profile" element={<AdminSettingsPage />} />
          <Route path="settings" element={<AdminSettingsPage />} />
        </Route>
      </Routes>

      <RfqModal
        isOpen={rfqOpen}
        onClose={handleCloseRfq}
        targetItemLabel={rfqTargetLabel}
        manifestRefs={manifestRefs}
      />
    </>
  );
};

export function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  );
}

export default App;
