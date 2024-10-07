import { model, Schema } from "mongoose";

import { IOldPassword } from "../interfaces/old-password.interface";
import { User } from "./user.model";

const oldPasswordSchema = new Schema(
  {
    oldPassword: { type: String, required: true, select: false },
    _userId: { type: Schema.Types.ObjectId, required: true, ref: User },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const OldPassword = model<IOldPassword>(
  "oldPassword",
  oldPasswordSchema,
);
