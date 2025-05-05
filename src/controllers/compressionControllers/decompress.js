import { basename, join, resolve, parse, format } from "path";
import { access } from 'fs/promises';
import { createReadStream, createWriteStream } from 'fs';
import { createBrotliDecompress } from 'zlib';
import { pipeline } from 'stream/promises';
import { handleInputError } from "../../utils/handleInputError.js";
import { handleOperationError } from "../../utils/handleOperationError.js";

export const handleDecompress = async (agrs) => {
  const [pathToFile, pathToDestination] = agrs;

  const from = resolve(pathToFile);
  const to = resolve(pathToDestination);

  const fileName = basename(from);
  const parsedFileName = parse(fileName);
  parsedFileName.ext = '';
  parsedFileName.base = parsedFileName.name;
  const newFileName = format(parsedFileName);

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
    const brotliDecompress = createBrotliDecompress();

    await pipeline(readStream, brotliDecompress, writeStream);

    console.log('File successfully decompressed.\n');
  } catch (err) {
    if (err.code === 'ENOENT') {
      handleInputError(`${to} directory does not exist`);
      return;
    }
    handleOperationError(err.message);
  }
}
