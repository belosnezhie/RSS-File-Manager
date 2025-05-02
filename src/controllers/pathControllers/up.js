import { printDirectory } from "../../utils/printDirectory.js";

export const handleUp = () => {
  process.chdir('..');

  printDirectory();
};
