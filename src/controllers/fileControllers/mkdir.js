import { mkdir, access } from 'fs/promises';
import { join } from 'path';
import { printDirectory } from '../../utils/printDirectory.js';
import { handleOperationError } from '../../utils/handleOperationError.js';
import { handleInputError } from '../../utils/handleInputError.js';

export const handleMkdir = async (args) => {
  const [dirName] = args;

  const path = process.cwd();

  try {
    await access(join(path, dirName));
    handleInputError(`${dirName} directory already exists`);
    return;
  } catch (err) {
    if (err.code !== 'ENOENT') {
      handleOperationError(err.message)
    }
  }

  try {
    mkdir(join(path, dirName));
    console.log(`${dirName} directory succesfully created`)
    printDirectory();
  } catch (error) {
    handleOperationError(error.message);
  }
};
