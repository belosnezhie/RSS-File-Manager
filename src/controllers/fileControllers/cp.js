import { access } from 'fs/promises';
import { createReadStream, createWriteStream } from 'fs';
import { resolve, basename, join } from 'path';
import { pipeline } from 'stream/promises';
import { handleOperationError } from '../../utils/handleOperationError.js';
import { handleInputError } from '../../utils/handleInputError.js';

export const handleCP = async (args) => {
  try {
    await handleCPInner(args);
  }
  catch (err) {
    if (err.cause.code === 'input') {
      handleInputError(err.message);
    } else {
      handleOperationError(err.message);
    }
  }
};

export const handleCPInner = async (args) => {
  const [pathToFile, pathToNewDir] = args;

  const from = resolve(pathToFile);
  const to = resolve(pathToNewDir);

  const fileName = basename(from);

  try {
    await access(from);
  } catch (err) {
    if (err.code === 'ENOENT') {
      throw new Error(`${fileName} does not exist`, { cause: { code: 'input'}});
    }
  }

  try {
    await access(join(to, fileName));
    throw new Error(
      `${fileName} file already exists in ${pathToNewDir}`,
      { cause: { code: 'input' } }
    );
  } catch (err) {
    // do nothing;
  }

  try {
    const readStream = createReadStream(from, { encoding: 'utf-8' });
    const writeStream = createWriteStream(join(to, fileName), { encoding: 'utf-8' });

    await pipeline(readStream, writeStream);
    console.log(`\n${fileName} successfully copied\n`)
    return true;
  } catch (err) {
      throw new Error(
        err.message,
        { cause: { code: 'operation' } }
      );
  }
}
