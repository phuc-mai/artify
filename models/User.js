import { Schema, model, models } from "mongoose"

const UserSchema = new Schema({
  username: {
    type: String,
    unique: [true, "Username already exists"],
    required: [true, "Username is required"],
  },
  email: {
    type: String,
    unique: [true, "Email already exists"],
    required: [true, "Email is required"],
  },
  password: {
    type: String,
  },
  profileImagePath: {
    type: String,
    required: [true, "Profile image is required"],
  },
  wishlist: {
    type: Array,
    default: [],
  },
  cart: {
    type: Array,
    default: [],
  },
  orders: {
    type: Array,
    default: [],
  },
  works: {
    type: Array,
    default: [],
  }
})

const User = models.User || model("User", UserSchema)

export default User