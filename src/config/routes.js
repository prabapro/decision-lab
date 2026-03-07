// src/config/routes.js

import { lazy } from 'react';

/**
 * Unified route configuration.
 * Routes with `gameRoute: true` are rendered inside GameLayout (no header/footer).
 * All other routes use the standard Layout.
 */

// Lazy-load all page components
const Home = lazy(() => import('@pages/Home'));
const Privacy = lazy(() => import('@pages/Privacy'));
const Terms = lazy(() => import('@pages/Terms'));
const NotFound = lazy(() => import('@pages/NotFound'));
const Play = lazy(() => import('@pages/Play'));
const Reveal = lazy(() => import('@pages/Reveal'));
const Results = lazy(() => import('@pages/Results'));

export const ROUTE_CONFIG = {
  // -------------------------------------------------------------------------
  // Game routes — rendered inside GameLayout, no header/footer
  // -------------------------------------------------------------------------
  HOME: {
    path: '/',
    component: Home,
    isIndex: true,
    gameRoute: true,
    title: 'Home',
    showInNav: false,
    sitemap_priority: 1.0,
    sitemap_changefreq: 'weekly',
  },

  PLAY: {
    path: '/play',
    component: Play,
    gameRoute: true,
    title: 'Play',
    showInNav: false,
  },

  REVEAL: {
    path: '/reveal',
    component: Reveal,
    gameRoute: true,
    title: 'Reveal',
    showInNav: false,
  },

  RESULTS: {
    path: '/results',
    component: Results,
    gameRoute: true,
    title: 'Results',
    showInNav: false,
  },

  // -------------------------------------------------------------------------
  // Standard routes — rendered inside Layout with header/footer
  // -------------------------------------------------------------------------
  PRIVACY: {
    path: '/privacy',
    component: Privacy,
    title: 'Privacy Policy',
    description: 'How we protect and handle your data',
    showInNav: false,
    category: 'legal',
    sitemap_priority: 0.5,
    sitemap_changefreq: 'monthly',
  },

  TERMS: {
    path: '/terms',
    component: Terms,
    title: 'Terms of Service',
    description: 'Terms and conditions for using the app',
    showInNav: false,
    category: 'legal',
    sitemap_priority: 0.5,
    sitemap_changefreq: 'monthly',
  },

  NOT_FOUND: {
    path: '*',
    component: NotFound,
    title: 'Not Found',
    showInNav: false,
    isWildcard: true,
  },
};

// ---------------------------------------------------------------------------
// Helper utilities (unchanged from boilerplate)
// ---------------------------------------------------------------------------

export const getAllRoutePaths = () =>
  Object.values(ROUTE_CONFIG)
    .filter((r) => !r.isWildcard)
    .map((r) => r.path);

export const isKnownRoute = (pathname) => getAllRoutePaths().includes(pathname);

export const getRouteByPath = (pathname) =>
  Object.values(ROUTE_CONFIG).find((r) => r.path === pathname);

export const getNavigationRoutes = () => {
  const routes = Object.values(ROUTE_CONFIG).filter((r) => r.showInNav);
  return {
    tools: routes.filter((r) => r.category === 'tools'),
    info: routes.filter((r) => r.category === 'info'),
    legal: routes.filter((r) => r.category === 'legal'),
    all: routes,
  };
};

export const getSitemapRoutes = () =>
  Object.values(ROUTE_CONFIG).filter(
    (r) => !r.isWildcard && r.sitemap_priority !== undefined,
  );

export const getRouterConfig = () => Object.values(ROUTE_CONFIG);

export const getRouteInfo = (pathname) => {
  const route = getRouteByPath(pathname);
  return {
    path: pathname,
    route,
    isKnown: isKnownRoute(pathname),
    isNotFound: !isKnownRoute(pathname),
    config: route || null,
  };
};
