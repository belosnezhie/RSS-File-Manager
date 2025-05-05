import { handleInputError } from "../../utils/handleInputError.js";

export const handleCD = (args) => {
  const [pathToDir] = args;

  try {
    process.chdir(pathToDir);
  } catch (err) {
    handleInputError();
  }
}
