// Global configuration and shared constants
(function(){
  'use strict';
  const AppConfig = {
    breakpoints: {
      desktopMin: 900
    },
    storage: {
      cart: 'pb_cart_v1',
      orders: 'pb_orders_v1',
      navOpen: 'pb_nav_open_v1',
      adminFiltersCollapsed: 'pb_admin_filters_collapsed_v1'
    },
    z: {
      modal: 1000,
      nav: 1100,
      cartDrawer: 1400,
      petals: 1200
    }
  };
  window.AppConfig = AppConfig;
})();
