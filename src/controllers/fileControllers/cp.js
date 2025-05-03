import { access } from 'fs/promises';
import { createReadStream, createWriteStream } from 'fs';
import { resolve, basename, join } from 'path';
import { pipeline } from 'stream/promises';
import { printDirectory } from '../../utils/printDirectory.js';
import { handleOperationError } from '../../utils/handleOperationError.js';
import { handleInputError } from '../../utils/handleInputError.js';

export const handleCP = async (args) => {
  const [pathToFile, pathToNewDir] = args;

  const from = resolve(pathToFile);
  const to = resolve(pathToNewDir);

  const fileName = basename(from);

  try {
    await access(from);
  } catch (err) {
    if (err.code === 'ENOENT') {
      handleInputError(`\n${fileName} does not exist\n`);
      return;
    }
  }

  try {
    await access(join(to, fileName));
    handleInputError(`\n${fileName} file already exists in ${pathToNewDir}\n`);
    return;
  } catch (err) {
    if (err.code !== 'ENOENT') {
      handleOperationError(err.message)
    }
  }

  try {
    const readStream = createReadStream(from, { encoding: 'utf-8' });
    const writeStream = createWriteStream(join(to, fileName), { encoding: 'utf-8' });

    await pipeline(readStream, writeStream);
    console.log(`\n${fileName} successfully copied\n`)
    printDirectory();
  } catch (err) {
    handleOperationError(err.message);
  }
};
