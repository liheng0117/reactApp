
import Loadable from '@/components/Loadable';

const login = Loadable( () =>import ('@/pages/login'))
const assemble = Loadable( () =>import ('@/pages/assemble'))
const home = Loadable( () =>import ('@/pages/home'))
const classification = Loadable( () =>import ('@/pages/classification'))
const cart = Loadable( () =>import ('@/pages/cart'))
const user = Loadable( () =>import ('@/pages/user'))

export {
  login,
  assemble,
  home,
  classification,
  cart,
  user,
}