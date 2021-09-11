import { findFiles } from "../filemanager.service";

describe('Test File Manager', () => {
  it('should return 2 files', ()=>{
    const path = `${__dirname}/testFiles`
    console.log('path', path)
    const files = findFiles(path, (file)=>file.toLowerCase() === 'sources.md')
    console.log(files)
    expect(files.length).toBe(1)
  })
});