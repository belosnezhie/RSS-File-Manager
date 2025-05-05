import { createReadStream } from 'fs';
import { resolve, basename } from 'path';
import { pipeline } from 'stream/promises';
import { access } from 'fs/promises';
import { handleOperationError } from '../../utils/handleOperationError.js';
import { handleInputError } from '../../utils/handleInputError.js';

export const handleCat = async (args) => {
  const [pathToFile] = args;

  const path = resolve(pathToFile);

  const fileName = basename(path);

  try {
    await access(path);
  } catch (err) {
    if (err.code === 'ENOENT') {
      handleInputError(`${fileName} does not exist`);
      return;
    }
  }


  try {
    const stream = createReadStream(path, { encoding: 'utf-8' });

    await pipeline(stream, process.stdout, { end: false });
    process.stdout.write('\n');
  } catch (error) {
    handleOperationError(error.message);
  }
};
