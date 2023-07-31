import { UserType } from './user.interface'
import { User } from './user.model'

const signup = async (userData: UserType) => {
  const user = await User.create(userData)

  return user
}

export const UserService = {
  signup,
}
