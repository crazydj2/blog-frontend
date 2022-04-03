import { wrap } from 'svelte-spa-router/wrap'

const routes = {
  '/': wrap({
    asyncComponent: () => import('../view/TestView.svelte')
  }),
  '/test2': wrap({
    asyncComponent: () => import('../view/TestView2.svelte')
  }),
}
  
export default routes;