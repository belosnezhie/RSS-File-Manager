import { resolve } from "path";
import { handleInputError } from "../../utils/handleInputError.js";

export const handleCD = (args) => {
  const [pathToDir] = args;

  try {
    process.chdir(resolve(pathToDir));
  } catch (err) {
    handleInputError();
  }
}
