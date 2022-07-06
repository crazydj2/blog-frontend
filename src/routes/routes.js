import { wrap } from 'svelte-spa-router/wrap'

const routes = {
  '/admin/menu': wrap({ 
    asyncComponent: () => import('../view/main/AdminMenu.svelte')
  }),
  '/admin/article': wrap({
    asyncComponent: () => import('../view/main/AdminArticle.svelte')
  }),
  '/*': wrap({ 
    asyncComponent: () => import('../view/main/MainContent.svelte')
  }),
}
  
export default routes;