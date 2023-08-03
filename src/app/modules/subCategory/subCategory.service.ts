import { SubCategoryType } from './subCategory.interface'
import { SubCategory } from './subCategory.model'

const addSubCategory = async (categoryData: SubCategoryType) => {
  const subCategory = (await SubCategory.create(categoryData)).populate(
    'categoryId',
  )
  return subCategory
}

const getAllSubCategory = async () => {
  const categories = await SubCategory.find({})
  return categories
}

const editSubCategory = async (categoryData: SubCategoryType, id: string) => {
  const subCategory = await SubCategory.findByIdAndUpdate(
    { _id: id },
    { categoryData },
    { new: true },
  ).populate('categoryId')
  return subCategory
}

const deleteSubCategory = async (id: string) => {
  const subCategory = await SubCategory.findByIdAndDelete({ _id: id })
  return subCategory
}

export const SubCategoryService = {
  addSubCategory,
  getAllSubCategory,
  editSubCategory,
  deleteSubCategory,
}
