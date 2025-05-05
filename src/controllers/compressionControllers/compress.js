import { basename, join, resolve } from "path";
import { access } from 'fs/promises';
import { createReadStream, createWriteStream } from 'fs';
import { createBrotliCompress } from 'zlib';
import { pipeline } from 'stream/promises';
import { handleInputError } from "../../utils/handleInputError.js";
import { handleOperationError } from "../../utils/handleOperationError.js";
import { printDirectory } from "../../utils/printDirectory.js";

export const handleCompress = async (agrs) => {
  const [pathToFile, pathToDestination] = agrs;

  const from = resolve(pathToFile);
  const to = resolve(pathToDestination);

  const fileName = basename(from);
  const newFileName = fileName.concat('.br');

  try {
    await access(from);
  } catch (err) {
    handleInputError(`${fileName} does not exist`)
    return;
  }

  try {
    await access(join(to, fileName));
    handleInputError(`${fileName} file already exists in ${pathToNewDir}`)
    return;
  } catch (err) {
    // do nothing;
  }

  try {
    const readStream = createReadStream(from);
    const writeStream = createWriteStream(join(to, newFileName));
    const brotliStream = createBrotliCompress();

    await pipeline(readStream, brotliStream, writeStream);

    console.log('File successfully compressed.\n');
  } catch (err) {
    if (err.code === 'ENOENT') {
      handleInputError(`${to} directory does not exist`);
      return;
    }
    handleOperationError(err.message);
  }
}
