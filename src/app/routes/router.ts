import express from 'express'
import { UserRoutes } from '../modules/users/user.routes'
import { CategoryRoutes } from '../modules/category/category.routes'
import { SubCategoryRoutes } from '../modules/subCategory/subCategory.routes'

const router = express.Router()

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/category',
    route: CategoryRoutes,
  },
  {
    path: '/subcategory',
    route: SubCategoryRoutes,
  },
]

moduleRoutes.forEach(route => router.use(route.path, route.route))

export default router
