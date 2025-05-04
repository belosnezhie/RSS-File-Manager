import { printDirectory } from "./printDirectory.js";

export const handleOperationError = (message) => {
  console.error(`\nOperation failed: ${message}\n`);
  printDirectory();
}
