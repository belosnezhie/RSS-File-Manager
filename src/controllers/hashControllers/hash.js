import { createReadStream } from 'fs';
import { createHash } from 'crypto';
import { resolve, basename } from 'path';
import { pipeline } from 'stream/promises';
import { handleOperationError } from '../../utils/handleOperationError.js';
import { handleInputError } from '../../utils/handleInputError.js';

export const handleHash = async (args) => {
  const [pathToFile] = args;

  const path = resolve(pathToFile);

  const fileName = basename(path);

  try {
    const hash = createHash('sha256');
    const stream = createReadStream(path);

    await pipeline(stream, hash);

    const digest = hash.digest('hex');
    console.log(`Hash: ${digest}\n`);
  } catch (err) {
    if (err.code === 'ENOENT') {
      handleInputError(`${fileName} does not exist`);
      return;
    }
    handleOperationError(err.message);
  }
};
