import { TEMPLATE_DIR } from '../constants';
import { SOURCE_TEMPLATE } from '../templates/Sources';
import {
  findFiles,
  readFile,
  writeMarkdownfile,
} from './filemanager.service';

export const findSourceFile = (targetDir = __dirname) => {
  return findFiles(
    targetDir,
    (file) => file.toLowerCase() === 'sources.md',
  )[0];
};

export const createSourceFile = (targetDir = __dirname) => {
  const sourceFile = SOURCE_TEMPLATE;
  return writeMarkdownfile([sourceFile], targetDir, 'Sources');
};
