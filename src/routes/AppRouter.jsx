import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Layout Components
import MainLayout from '../components/layouts/MainLayout';
import AuthLayout from '../components/layouts/AuthLayout';

// Loading Components
import LoadingScreen from '../components/common/LoadingScreen';

// Lazy Load Pages for Performance
const SplashScreen = lazy(() => import('../pages/SplashScreen'));
const OnboardingScreen = lazy(() => import('../pages/OnboardingScreen'));
const LoginScreen = lazy(() => import('../pages/LoginScreen'));

// Main App Pages
const HomePage = lazy(() => import('../pages/HomePage'));
const CustomPerfumePage = lazy(() => import('../pages/CustomPerfumePage'));
const AIConsultationPage = lazy(() => import('../pages/AIConsultationPage'));
const CozyLabPage = lazy(() => import('../pages/CozyLabPage'));
const ProfilePage = lazy(() => import('../pages/ProfilePage'));

// Shop & Commerce
const ShopPage = lazy(() => import('../pages/ShopPage'));
const ProductDetailPage = lazy(() => import('../pages/ProductDetailPage'));
const CartPage = lazy(() => import('../pages/CartPage'));
const CheckoutPage = lazy(() => import('../pages/CheckoutPage'));

// Results & Details
const PerfumeResultPage = lazy(() => import('../pages/PerfumeResultPage'));
const AIChatPage = lazy(() => import('../pages/AIChatPage'));
const LabResultPage = lazy(() => import('../pages/LabResultPage'));

// User Features
const WishlistPage = lazy(() => import('../pages/WishlistPage'));
const OrderTrackingPage = lazy(() => import('../pages/OrderTrackingPage'));
const NotificationsPage = lazy(() => import('../pages/NotificationsPage'));
const SearchPage = lazy(() => import('../pages/SearchPage'));

// Profile & Settings
const EditProfilePage = lazy(() => import('../pages/EditProfilePage'));
const SettingsPage = lazy(() => import('../pages/SettingsPage'));
const ThemeCustomizerPage = lazy(() => import('../pages/ThemeCustomizerPage'));
const AchievementsPage = lazy(() => import('../pages/AchievementsPage'));
const RewardsPage = lazy(() => import('../pages/RewardsPage'));

// Community & Social
const CommunityFeedPage = lazy(() => import('../pages/CommunityFeedPage'));
const UserProfilePage = lazy(() => import('../pages/UserProfilePage'));
const ChatPage = lazy(() => import('../pages/ChatPage'));

// Auction & Special Features
const AuctionPage = lazy(() => import('../pages/AuctionPage'));
const ScentMemoryPage = lazy(() => import('../pages/ScentMemoryPage'));

// Support & Legal
const HelpPage = lazy(() => import('../pages/HelpPage'));
const PrivacyPolicyPage = lazy(() => import('../pages/PrivacyPolicyPage'));
const TermsOfServicePage = lazy(() => import('../pages/TermsOfServicePage'));

// Admin (Protected)
const AdminDashboardPage = lazy(() => import('../pages/admin/AdminDashboardPage'));

// 404 & Error Pages
const NotFoundPage = lazy(() => import('../pages/NotFoundPage'));
const ErrorPage = lazy(() => import('../pages/ErrorPage'));

// Route Protection Components
import ProtectedRoute from '../components/common/ProtectedRoute';
import AdminRoute from '../components/common/AdminRoute';

// Hooks
import { useAuth } from '../hooks/useAuth';

const AppRouter = () => {
  const { isAuthenticated, user, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={<LoadingScreen />}>
        <Routes>
          {/* Public Routes - Before Authentication */}
          <Route path="/splash" element={<SplashScreen />} />
          <Route path="/onboarding" element={<OnboardingScreen />} />
          
          {/* Auth Routes */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/register" element={<LoginScreen register />} />
            <Route path="/forgot-password" element={<LoginScreen forgot />} />
          </Route>

          {/* Main App Routes - Requires Authentication */}
          <Route element={<ProtectedRoute />}>
            <Route element={<MainLayout />}>
              
              {/* Main Navigation Tabs */}
              <Route path="/" element={<Navigate to="/home" replace />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/custom-perfume" element={<CustomPerfumePage />} />
              <Route path="/ai-consultation" element={<AIConsultationPage />} />
              <Route path="/cozy-lab" element={<CozyLabPage />} />
              <Route path="/profile" element={<ProfilePage />} />

              {/* Shop & Commerce */}
              <Route path="/shop" element={<ShopPage />} />
              <Route path="/shop/:category" element={<ShopPage />} />
              <Route path="/product/:id" element={<ProductDetailPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/checkout/:orderId" element={<CheckoutPage />} />

              {/* Results & Generated Content */}
              <Route path="/perfume-result/:resultId" element={<PerfumeResultPage />} />
              <Route path="/lab-result/:formulaId" element={<LabResultPage />} />
              
              {/* AI Features */}
              <Route path="/ai-chat/:characterId" element={<AIChatPage />} />
              <Route path="/ai-chat/:characterId/:sessionId" element={<AIChatPage />} />

              {/* User Features */}
              <Route path="/wishlist" element={<WishlistPage />} />
              <Route path="/orders" element={<OrderTrackingPage />} />
              <Route path="/orders/:orderId" element={<OrderTrackingPage />} />
              <Route path="/notifications" element={<NotificationsPage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/search/:query" element={<SearchPage />} />

              {/* Profile & Settings */}
              <Route path="/profile/edit" element={<EditProfilePage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/settings/theme" element={<ThemeCustomizerPage />} />
              <Route path="/achievements" element={<AchievementsPage />} />
              <Route path="/rewards" element={<RewardsPage />} />
              <Route path="/rewards/:rewardId" element={<RewardsPage />} />

              {/* Community & Social */}
              <Route path="/community" element={<CommunityFeedPage />} />
              <Route path="/community/:postId" element={<CommunityFeedPage />} />
              <Route path="/user/:userId" element={<UserProfilePage />} />
              <Route path="/chat" element={<ChatPage />} />
              <Route path="/chat/:conversationId" element={<ChatPage />} />

              {/* Special Features */}
              <Route path="/auction" element={<AuctionPage />} />
              <Route path="/auction/:auctionId" element={<AuctionPage />} />
              <Route path="/scent-memory" element={<ScentMemoryPage />} />
              <Route path="/scent-memory/:photoId" element={<ScentMemoryPage />} />

              {/* Support & Legal */}
              <Route path="/help" element={<HelpPage />} />
              <Route path="/help/:category" element={<HelpPage />} />
              <Route path="/privacy" element={<PrivacyPolicyPage />} />
              <Route path="/terms" element={<TermsOfServicePage />} />

            </Route>
          </Route>

          {/* Admin Routes - Requires Admin Role */}
          <Route path="/admin/*" element={<AdminRoute />}>
            <Route path="dashboard" element={<AdminDashboardPage />} />
            <Route path="users" element={<AdminDashboardPage section="users" />} />
            <Route path="orders" element={<AdminDashboardPage section="orders" />} />
            <Route path="formulas" element={<AdminDashboardPage section="formulas" />} />
            <Route path="rewards" element={<AdminDashboardPage section="rewards" />} />
            <Route path="analytics" element={<AdminDashboardPage section="analytics" />} />
            <Route path="content" element={<AdminDashboardPage section="content" />} />
            <Route path="settings" element={<AdminDashboardPage section="settings" />} />
          </Route>

          {/* Redirect unauthenticated users */}
          {!isAuthenticated && (
            <>
              <Route path="*" element={<Navigate to="/splash" replace />} />
            </>
          )}

          {/* Error Pages */}
          <Route path="/error" element={<ErrorPage />} />
          <Route path="/404" element={<NotFoundPage />} />
          <Route path="*" element={<NotFoundPage />} />

        </Routes>
      </Suspense>
    </AnimatePresence>
  );
};

export default AppRouter;