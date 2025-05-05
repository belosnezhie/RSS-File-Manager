import { createReadStream } from 'fs';
import { resolve } from 'path';
import { pipeline } from 'stream/promises';
import { handleOperationError } from '../../utils/handleOperationError.js';

export const handleCat = async (args) => {
  const [pathToFile] = args;

  const path = resolve(pathToFile);

  try {
    const stream = createReadStream(path, { encoding: 'utf-8' });

    await pipeline(stream, process.stdout, { end: false });
    process.stdout.write('\n');
  } catch (error) {
    handleOperationError(error.message);
  }
};
