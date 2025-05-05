import { rename, access } from 'fs/promises';
import { resolve } from 'path';
import { handleOperationError } from '../../utils/handleOperationError.js';
import { handleInputError } from '../../utils/handleInputError.js';

export const handleRn = async (args) => {
  const [pathToFile, newfileName] = args;

  const path = resolve(pathToFile);
  const pathToNewFile = resolve(newfileName);

  try {
    await access(pathToNewFile);
    handleInputError(`${newfileName} already exists`);
    return;
  } catch (err) {
    if (err.code !== 'ENOENT') {
      handleOperationError(err.message)
    }
  }

  rename(path, pathToNewFile)
  .catch((err) => {
      if (err.code === 'ENOENT') {
        handleInputError(`${pathToFile} does not exist`);
      } else {
        handleOperationError(err.message);
      }
  });
};
