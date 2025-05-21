import { type Document, model, Schema } from 'mongoose'
import { type Account } from '../@types'

interface IAccount extends Document, Account {}

const instance = new Schema<IAccount>(
  {

    username: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: false,
      enum: ['user'],
    },
  },
  {
    timestamps: true,
  }
)

const modelName = 'Account'

export default model<IAccount>(modelName, instance)
