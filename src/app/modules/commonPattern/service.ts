import { ColorType } from './interface'
import { Color, Size, Weight } from './model'

//* Color services
const addColor = async (categoryData: ColorType) => {
  const color = await Color.create(categoryData)
  return color
}

const getColors = async () => {
  const colors = await Color.find({})
  return colors
}

const editColor = async (categoryData: ColorType, id: string) => {
  const color = await Color.findByIdAndUpdate(
    { _id: id },
    { name: categoryData },
    { new: true },
  )
  return color
}

const deleteColor = async (id: string) => {
  const color = await Color.findByIdAndDelete({ _id: id })
  return color
}

//* Size services
const addSize = async (categoryData: ColorType) => {
  const size = await Size.create(categoryData)
  return size
}

const editSize = async (categoryData: ColorType, id: string) => {
  const size = await Size.findByIdAndUpdate(
    { _id: id },
    { name: categoryData },
    { new: true },
  )
  return size
}

const deleteSize = async (id: string) => {
  const size = await Size.findByIdAndDelete({ _id: id })
  return size
}

//* Weight services
const addWeight = async (categoryData: ColorType) => {
  const weight = await Weight.create(categoryData)
  return weight
}

const editWeight = async (categoryData: ColorType, id: string) => {
  const weight = await Weight.findByIdAndUpdate(
    { _id: id },
    { name: categoryData },
    { new: true },
  )
  return weight
}

const deleteWeight = async (id: string) => {
  const weight = await Weight.findByIdAndDelete({ _id: id })
  return weight
}

export const CommonService = {
  addColor,
  getColors,
  editColor,
  deleteColor,
  addSize,
  editSize,
  deleteSize,
  addWeight,
  editWeight,
  deleteWeight,
}
