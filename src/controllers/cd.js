import { handleInputError } from "../utils/handleInputError.js";
import { printDirectory } from "../utils/printDirectory.js";

export const handleCD = (pathToDir) => {

  try {
    process.chdir(pathToDir);
  } catch {
    handleInputError();
  }

  printDirectory();
}
