import { handleInputError } from "../../utils/handleInputError.js";
import { printDirectory } from "../../utils/printDirectory.js";

export const handleCD = (args) => {
  const [pathToDir] = args;

  try {
    process.chdir(pathToDir);
  } catch (err) {
    handleInputError();
  }

  printDirectory();
}
