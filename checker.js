

// !!! Ubah angka di bawah ini sesuai dengan batch Kampus Merdeka mu saat ini !!!
const currBatch = 4;


const getError = () => {

    console.log(
        '%c⚠️ SILAHKAN LOGIN TERLEBIH DAHULU ⚠️',
        'font-size: 18px; color: #000; background: #D25959;'
    );
    throw new Error();
};


const getLocalData = JSON.parse(localStorage.getItem(`@mkbm/manager/user`));
if (!getLocalData) {
    getError();
}


const getUserToken = getLocalData?.value?.token ? getLocalData.value.token : getError();


const printToConsole = async (data) => {
    await data.map(val => {
        console.log(
            `%cStatus Dokumen ${val.doc.replace('_', ' ')} : ${val.status}`,
            `font-size: 14px; color: #fff; background: ${val.status === 'VERIFIED' ? '#519872' : '#D25959'};padding:20px;`
        );
    })
}


const abortController = new AbortController();

//get SPTJM, SR docs
const getCurrentDocs = async (batch) => {
    const getResponseDocs = await fetch(
        'https://api.kampusmerdeka.kemdikbud.go.id/v1alpha1/documents?type=SPTJM,SURAT_REKOMENDASI&programs=Magang',
        {
            signal: abortController.signal,
            headers: { Authorization: `Bearer ${getUserToken}` }
        }
    ).then((res) => res.json());

    const docs = getResponseDocs.data;
    let getCurrDocument = [];

    docs.map((doc) => {
        (!(doc.type in getCurrDocument)) && Number.parseInt(doc.cycle) === batch && ((doc.cycle.replace(doc.cycle, Number.parseInt(doc.cycle))), (getCurrDocument.push(doc)));
    });

    return getCurrDocument;
};

//get SPTJM, SR Status
const getDocsStatus = async (docs) => {

    let tempData = [];
    let status = [];

    for (let z = 0; z < docs.length; z++) {
        const getResponseStatus = await fetch(
            `https://api.kampusmerdeka.kemdikbud.go.id/v1alpha1/documents/${docs[z].id}/users`,
            {
                headers: { Authorization: `Bearer ${getUserToken}` }
            }
        ).then((res) => res.json());

        await status.push({ doc: docs[z].type, status: getResponseStatus?.data?.status ? getResponseStatus.data.status : `${docs[z].type} IS NOT FOUND` });
    }

    return status;
};




checker = async () => {
    try {
        console.clear()
        const currDocs = await getCurrentDocs(currBatch);
        const docsStatus = await getDocsStatus(currDocs);

        console.log('Nama : ', getLocalData.value);
        console.log('Nama\t: ', getLocalData.value.profile.name);
        console.log('NIM\t\t: ', getLocalData.value.profile.nim);
        console.log('Semester: ', getLocalData.value.profile.sms);
        console.log('IPK\t\t: ', getLocalData.value.profile.ipk);
        console.log('Prodi\t: ', getLocalData.value.profile.prodiName);
        console.log('Kampus\t: ', getLocalData.value.profile.ptName);
        console.log('\n');

        printToConsole(docsStatus);

    } catch (err) {
        throw err;
    }
}

checker();