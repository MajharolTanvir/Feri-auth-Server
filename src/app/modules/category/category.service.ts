import { CategoryType } from './category.interface'
import { Category } from './category.model'

const addCategory = async (categoryData: CategoryType) => {
  const category = await Category.create(categoryData)
  return category
}

const editCategory = async (categoryData: CategoryType, id: string) => {
  const category = await Category.findByIdAndUpdate(
    { _id: id },
    { name: categoryData },
    { new: true },
  )
  return category
}

export const CategoryService = {
  addCategory,
  editCategory,
}
