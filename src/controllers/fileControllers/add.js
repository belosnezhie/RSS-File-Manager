import { open, access } from 'fs/promises';
import { join } from 'path';
import { printDirectory } from '../../utils/printDirectory.js';
import { handleOperationError } from '../../utils/handleOperationError.js';
import { handleInputError } from '../../utils/handleInputError.js';

export const handleAdd = async (args) => {
  const [fileName] = args;

  const path = process.cwd();

  try {
    await access(join(path, fileName));
    handleInputError(`${fileName} already exists`);
    return;
  } catch (err) {
    if (err.code !== 'ENOENT') {
      handleOperationError(err.message)
    }
  }

  try {
    open(join(path, fileName), 'w');
    printDirectory();
  } catch (error) {
    handleOperationError(error.message);
  }
};
