import { compareSync } from "bcryptjs";

export const BcryptAdapter = {
  compare: (password: string, hashed: string) => {
    return compareSync(password, hashed);
  },
};
