import { unlink } from 'fs/promises';
import { resolve, basename } from 'path';
import { printDirectory } from '../../utils/printDirectory.js';
import { handleOperationError } from '../../utils/handleOperationError.js';
import { handleInputError } from '../../utils/handleInputError.js';
import { handleCPInner } from './cp.js';

export const handleMV = async (args) => {
  try {
    await handleMVInner(args);
  }
  catch (err) {
    if (err.cause.code === 'input') {
      handleInputError(err.message);
    } else {
      handleOperationError(err.message);
    }
  }
};

const handleMVInner = async (args) => {
  const pathToFile = args[0];

  const from = resolve(pathToFile);

  const fileName = basename(from);

  await handleCPInner(args);

  await unlink(from);

  console.log(`\n${fileName} successfully deleted\n`);
  printDirectory();
};
