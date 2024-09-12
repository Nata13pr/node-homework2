const fsPromises=require('node:fs/promises');
const path=require('node:path')

const createFolder=async ()=>{
    await fsPromises.mkdir(path.join(__dirname,'baseFolder'),{recursive:true});

    const pathToBaseFolder=path.join(__dirname,'baseFolder');
    console.log(pathToBaseFolder)

    const statForBaseFolder=await fsPromises.stat(pathToBaseFolder);
    console.log(`It is a file?`,statForBaseFolder.isFile())

    for(let i=1;i<=5;i+=1){
        const pathToFolder=path.join(pathToBaseFolder,`folder${i}`)

        await fsPromises.mkdir(path.join(pathToFolder),{recursive:true});
        console.log(pathToFolder)

        const statForFolder=await fsPromises.stat(pathToFolder);
        console.log(`It is a file?`,statForFolder.isFile())

        for (let j=1;j<=5;j+=1){
            const pathToFile=path.join(pathToBaseFolder,`folder${i}`,`file${j}.txt`);

            await fsPromises.writeFile(pathToFile,`It's text for file number ${j}`);
            console.log(pathToFile)

            const statForFile=await fsPromises.stat(pathToFile);
            console.log(`It is a file?`,statForFile.isFile())
        }
    }
}
void createFolder()