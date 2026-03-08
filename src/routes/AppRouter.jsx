// src/routes/AppRouter.jsx

import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { Suspense } from 'react';
import LoadingSpinner from '@components/common/LoadingSpinner';
import ErrorBoundary from '@components/common/ErrorBoundary';
import ScrollToTop from '@components/common/ScrollToTop';
import { ROUTE_CONFIG } from '@config/routes';
import Layout from '@components/layout/Layout';
import GameLayout from '@components/layout/GameLayout';

// ---------------------------------------------------------------------------
// Loading / error fallbacks
// ---------------------------------------------------------------------------

const PageLoader = () => (
  <div className="flex items-center justify-center min-h-[60vh]">
    <LoadingSpinner size="lg" text="Loading..." />
  </div>
);

const LazyErrorFallback = ({ error, resetErrorBoundary }) => (
  <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4 text-center px-4">
    <h2 className="text-xl font-semibold text-foreground">
      Failed to load page
    </h2>
    <p className="text-muted-foreground max-w-md">
      {error?.message || 'There was an error loading this page.'}
    </p>
    <button
      onClick={resetErrorBoundary}
      className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
      Try Again
    </button>
  </div>
);

// ---------------------------------------------------------------------------
// Route wrapper — error boundary + suspense per route
// ---------------------------------------------------------------------------

const RouteWrapper = ({ component: Component }) => (
  <ErrorBoundary fallback={LazyErrorFallback}>
    <Suspense fallback={<PageLoader />}>
      <Component />
    </Suspense>
  </ErrorBoundary>
);

// ---------------------------------------------------------------------------
// Layout wrappers (use Outlet so they work as React Router layout routes)
// ---------------------------------------------------------------------------

/**
 * Standard layout — passes matched child route through Layout's children prop.
 */
const StandardLayoutWrapper = () => (
  <Layout>
    <Outlet />
  </Layout>
);

// GameLayout already uses <Outlet /> internally, so it doubles as a layout route directly.

// ---------------------------------------------------------------------------
// Route builder helpers
// ---------------------------------------------------------------------------

function buildRoute(route) {
  const cleanPath = route.path.startsWith('/')
    ? route.path.slice(1)
    : route.path;

  if (route.isIndex) {
    return (
      <Route
        key="index"
        index
        element={<RouteWrapper component={route.component} />}
      />
    );
  }
  if (route.isWildcard) {
    return (
      <Route
        key="wildcard"
        path="*"
        element={<RouteWrapper component={route.component} />}
      />
    );
  }
  return (
    <Route
      key={route.path}
      path={cleanPath}
      element={<RouteWrapper component={route.component} />}
    />
  );
}

// ---------------------------------------------------------------------------
// App routes
// ---------------------------------------------------------------------------

function AppRoutes() {
  const all = Object.values(ROUTE_CONFIG);
  const gameRoutes = all.filter((r) => r.gameRoute);
  const standardRoutes = all.filter((r) => !r.gameRoute);

  return (
    <Routes>
      {/*
       * Game routes — rendered inside GameLayout (dark, immersive, no nav).
       * Covers: /, /play, /reveal, /results
       */}
      <Route element={<GameLayout />}>{gameRoutes.map(buildRoute)}</Route>

      {/*
       * Standard routes — rendered inside Layout (header + footer).
       * Covers: /help, * (404)
       */}
      <Route element={<StandardLayoutWrapper />}>
        {standardRoutes.map(buildRoute)}
      </Route>
    </Routes>
  );
}

// ---------------------------------------------------------------------------
// Root router
// ---------------------------------------------------------------------------

export default function AppRouter() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AppRoutes />
    </BrowserRouter>
  );
}
