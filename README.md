
<h3 align="center">🤖 SPTJM & SURAT REKOMENDASI VERIFY CHECKER - MSIB Kampus Merdeka 🇮🇩</h3>

<div align="center">

[![Status](https://img.shields.io/badge/status-active-success.svg)]()

</div>

---

<p align="center">  Author <a href="https://github.com/rahmatrians">@rianzessh</a>
    <br> 
</p>




## 🏁 Cara Penggunaan <a name = "getting_started"></a>

### Cek Verifikasi SPTJM & Surat Rekomendasi

- Buka Website Kampus Merdeka dan lakukan login seperti biasa <a href="https://kampusmerdeka.kemdikbud.go.id" target="_blank">Kampus Merdeka</a>


- Klik kanan sembarang pada area halaman website dan pilih inspect:
<img src="https://user-images.githubusercontent.com/65503928/215508037-0f0b31e5-90e2-490d-98ea-61e79f691685.png" alt="Gambar 1" width="800">

- pada kanan halaman akan muncul seperti ini:
<img src="https://user-images.githubusercontent.com/65503928/215508095-8a26093a-93d7-4afd-95f5-9ba76bb122ea.png" alt="Gambar 2" width="800">


- Copy script di bawah ini:
```


// !!! Ubah angka di bawah ini sesuai dengan batch Kampus Merdeka mu saat ini !!!
const currBatch = 4;


const getError = () => {

    console.log(
        '%c⚠️ SILAHKAN LOGIN TERLEBIH DAHULU ⚠️',
        'font-size: 18px; color: #000; background: #D25959;'
    );
    throw new Error();
};


const printToConsole = async (data) => {
    await data.map(val => {
        console.log(
            `%cStatus Dokumen ${val.doc.replace('_', ' ')} : ${val.status}`,
            `font-size: 14px; color: #fff; background: ${val.status === 'VERIFIED' ? '#519872' : '#D25959'};padding:20px;`
        );
    })
}


const abortController = new AbortController();

const getCurrentDocs = async (userToken, batch) => {
    const getResponseDocs = await fetch(
        'https://api.kampusmerdeka.kemdikbud.go.id/v1alpha1/documents?type=SPTJM,SURAT_REKOMENDASI&programs=Magang',
        {
            signal: abortController.signal,
            headers: { Authorization: `Bearer ${userToken}` }
        }
    ).then((res) => res.json());

    const docs = getResponseDocs.data;
    let getCurrDocument = [];

    docs.map((doc) => {
        (!(doc.type in getCurrDocument)) && Number.parseInt(doc.cycle) === batch && ((doc.cycle.replace(doc.cycle, Number.parseInt(doc.cycle))), (getCurrDocument.push(doc)));
    });

    return getCurrDocument;
};


const getDocsStatus = async (userToken, docs) => {

    let tempData = [];
    let status = [];

    for (let z = 0; z < docs.length; z++) {
        const getResponseStatus = await fetch(
            `https://api.kampusmerdeka.kemdikbud.go.id/v1alpha1/documents/${docs[z].id}/users`,
            {
                headers: { Authorization: `Bearer ${userToken}` }
            }
        ).then((res) => res.json());

        await status.push({ doc: docs[z].type, status: getResponseStatus?.data?.status ? getResponseStatus.data.status : `${docs[z].type} IS NOT FOUND` });
    }

    return status;
};




checker = async () => {
    try {
        console.clear();
        const getLocalData = localStorage.getItem(`@mkbm/manager/user`) ? JSON.parse(localStorage.getItem(`@mkbm/manager/user`)) : getError();
        const getUserToken = getLocalData?.value?.token ? getLocalData.value.token : getError();

        const currDocs = await getCurrentDocs(getUserToken, currBatch);
        const docsStatus = await getDocsStatus(getUserToken, currDocs);

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
```


- Paste scriptnya ke kanan dan klik Enter seperti ini:
<img src="https://user-images.githubusercontent.com/65503928/215507175-028e322f-323f-40b7-8807-1d7fc49b3ec1.png" alt="Gambar 3" width="800">
<img src="https://user-images.githubusercontent.com/65503928/215507644-c140bac4-9c45-4157-99a3-c3436214f26a.png" alt="Gambar 4" width="800">

- Maka datamu beserta status SPTJM & Surat Rekomendasi akan muncul:
<img src="https://user-images.githubusercontent.com/65503928/215507687-19f31a1e-2998-4641-a03e-b26e7405bbec.png" alt="Gambar 5" width="800">

---

### 🤔 Cek Dokumen sudah update atau belum <a name = "cek_dokumen"></a>

- Copy filename dari dokumen yang ingin diperiksa di halaman document kampus merdeka <a href="https://kampusmerdeka.kemdikbud.go.id/profile/document" target="_blank">Document - Kampus Merdeka</a>


- Paste kan filename tersebut ke akhir link di bawah ini:
```
https://kampusmerdeka.kemdikbud.go.id/files?name=
```
- Contoh:
```
https://kampusmerdeka.kemdikbud.go.id/files?name=mahasiswa_h89fw34q-3fhu-8df5-7781-4213ab00tf632.pdf
```

- Copy gabungan url tersebut dan paste kan ke url search, maka dokumen terupdate mu akan muncul
