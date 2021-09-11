import fs from 'fs';
import path from 'path';


export const getRootDir  = async ()=> {
  if(process.env.NODE_ENV !== 'development') return process.cwd();
  
  const { dirname } = require ( 'path' );
  const { constants, promises: { access } } = require ( 'fs' );

  for ( let path of module.paths ) {
      try {
          let prospectivePkgJsonDir = dirname ( path );
          await access ( path, constants.F_OK );
          return prospectivePkgJsonDir;
      } catch ( e ) {}
  }
  
}

export const readFile = (path:string, fileName:string)=>{
  return fs.readFileSync(`${path}/${fileName}`);
}

export const findFiles = (path: string, matchFunc:(str:string)=>boolean)=>{
  return fs.readdirSync(path).filter(matchFunc);
}

export const writeFile =
  (
    extension: string,
    transform: <T = any>(
      contents: T,
    ) => string | NodeJS.ArrayBufferView = <T>(contents) => contents,
  ) =>
  (contents: any, filePath: string, fileName: string) => {
    const transformedContents = transform(contents);
    const targetDir = path.join(filePath, `${fileName}.${extension}`);

    fs.writeFileSync(targetDir, transformedContents);
    return transformedContents;
  };

// @ts-ignore
export const writeMarkdownfile = writeFile('md', (contents)=>contents.join('\n'))