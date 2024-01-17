import { compareSync, genSaltSync, hashSync } from "bcryptjs";

export const BcryptAdapter = {
  compare: (password: string, hashed: string) => {
    return compareSync(password, hashed);
  },
  encrypt: (pass: string) => {
    return hashSync(pass, genSaltSync());
  },
};
