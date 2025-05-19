async function uploadFiles (files: any) {
    if (files && Object.keys(files).length !== 0) {
        const uploadedFiles = files.files.length > 0 ? files.files : [files.files];
        let filelist: any[] = [];

        await uploadedFiles.map((file: any) => {
            const fileName = Buffer.from(file.name, 'latin1').toString('utf8');
            const currentDate = Date.now();
            const uniqueFileStats = `${ currentDate + "_" + file.size + "_"  + fileName }`;

            file.mv(`./static/user-avatars/${ uniqueFileStats  }`, function (err: Error) {
                if (err) {
                    console.log(err);
                } 
            });

            filelist = [...filelist, {
                url: `${ process.env.HOST_URL }/user-avatars/${ uniqueFileStats }`,
                name: fileName,
                size: file.size
            }];
        });
        return { filelist, status: 200 };
    } 
    return { filelist: [], status: 500 };
}


export default { uploadFiles };