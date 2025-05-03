import { unlink } from 'fs/promises';
import { resolve, basename } from 'path';
import { printDirectory } from '../../utils/printDirectory.js';
import { handleOperationError } from '../../utils/handleOperationError.js';
import { handleInputError } from '../../utils/handleInputError.js';


export const handleRM = async (args) => {
  const [pathToFile] = args;

  const path = resolve(pathToFile);
  const fileName = basename(path);

  try {
    await unlink(path);
    console.log(`\n${fileName} successfully deleted\n`);
    printDirectory();
  } catch (err) {
    if (err.code === 'ENOENT') {
      handleInputError(`${fileName} does not exist`);
    } else {
      handleOperationError(err.message);
    }
  }
}
