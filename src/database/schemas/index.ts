import { appSchema } from "@nozbe/watermelondb";

import { userSchema } from "./user";
import { carSchema } from "./car";

export const schemas = appSchema({
  version: 2,
  tables: [userSchema, carSchema],
});
