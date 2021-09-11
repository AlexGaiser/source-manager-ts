import { readFile, findFiles } from "./filemanager.service"


export const findSourceFile = (targetDir=__dirname)=>{
  return findFiles(targetDir, (file)=>file.toLowerCase() === 'sources.md')[0]
}

