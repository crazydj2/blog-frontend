import { wrap } from 'svelte-spa-router/wrap'

const routes = new Map();

routes.set('/admin', wrap({ 
  asyncComponent: () => import('../view/main/Admin.svelte')
}));

// Home 화면
routes.set('/', wrap({ 
  asyncComponent: () => import('../view/main/MainHome.svelte')
}));

// 상세 화면
routes.set(/.*\/[0-9A-Fa-f]{24}/, wrap({ 
  asyncComponent: () => import('../view/main/ArticleDetail.svelte')
}));

// 리스트 화면
routes.set(/\/.*/, wrap({ 
  asyncComponent: () => import('../view/main/ArticleList.svelte')
}));
  
export default routes;