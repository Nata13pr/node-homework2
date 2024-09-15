const fsPromises=require('node:fs/promises');
const path=require('node:path')

const createFolder=async ()=>{
    await fsPromises.mkdir(path.join(__dirname,'baseFolder'),{recursive:true});

    const pathToBaseFolder=path.join(__dirname,'baseFolder');
    console.log(pathToBaseFolder)


    for(let i=1;i<=5;i+=1){
        const pathToFolder=path.join(pathToBaseFolder,`folder${i}`)

        await fsPromises.mkdir(path.join(pathToFolder),{recursive:true});
        console.log(pathToFolder)



        for (let j=1;j<=5;j+=1){
            const pathToFile=path.join(pathToBaseFolder,`folder${i}`,`file${j}.txt`);

            await fsPromises.writeFile(pathToFile,`It's text for file number ${j}`);
            console.log(pathToFile)


        }
    }
await  checkFilesAndFolders(pathToBaseFolder)

}

const  checkFilesAndFolders = async (folderPath)=>{
    const items=await fsPromises.readdir(folderPath);

    for(const item of items){
       const pathToItem=path.join(folderPath,item);


       const checkedItem= await  fsPromises.stat(pathToItem);

       if(checkedItem.isDirectory()){
           console.log(`${pathToItem} is directory`);

           await checkFilesAndFolders(pathToItem)
       }else if(checkedItem.isFile()){
           console.log(`${pathToItem} is file`);
       }
    }

}


void createFolder()