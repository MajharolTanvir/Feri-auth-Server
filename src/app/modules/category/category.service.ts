import { CategoryType } from './category.interface'
import { Category } from './category.model'

const addCategory = async (categoryData: CategoryType) => {
  const user = await Category.create(categoryData)
  return user
}

export const CategoryService = {
  addCategory,
}
