import { appSchema } from "@nozbe/watermelondb";

import { userSchema } from "./user";

export const schemas = appSchema({
  version: 1,
  tables: [userSchema],
});
