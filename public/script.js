// const { getContractorOptions } = require("./contractor");

const zoneSelect = document.getElementById('zone');
const contractorSelect = document.getElementById('contractor');
const tpiNameSelect = document.getElementById('tpiName');
const wardSelect = document.getElementById('ward');
const submitBtn = document.getElementById('submitBtn');

const documentUploadFields = [
    'documentUploadRFC', 'documentUploadRiser', 'documentUploadServiceLine',
    'documentUploadLay20mm', 'documentUploadLay32mm', 'documentUploadLay63mm',
    'documentUploadLay125mm', 'documentUploadLay180mm'
];

const zones = [
    {
        "name": "Zone 1",
        "value": "zone1"
    },
    {
        "name": "Zone 2",
        "value": "zone2"
    },
    {
        "name": "Zone 3",
        "value": "zone3"
    }
]

function appendZones() {
    zones.forEach(zone => {
        const optionElement = document.createElement('option');
        optionElement.value = zone.value;
        optionElement.innerText = zone.name;
        zoneSelect.appendChild(optionElement);
    });

    // set contractor options for zone 1
    setContractOptions('zone1');
    setTpiOptions('zone1');
    setWardOptions('zone1');
}


function setOptions(selectElement, options) {
    selectElement.innerHTML = '';
    options.forEach(option => {
        const optionElement = document.createElement('option');
        optionElement.value = option.value;
        optionElement.innerText = option.name;
        selectElement.appendChild(optionElement);
    });
}
function onZoneChange(event) {
    const zone = event.target.value;
    setContractOptions(zone);
    setTpiOptions(zone);
    setWardOptions(zone);
}

function setContractOptions(zone) {
    const contractorOptions = getContractorOptions(zone);
    // set options for contractor
    setOptions(contractorSelect, contractorOptions);
}

function setWardOptions(zone) {
    const wardOptions = getWardOptions(zone);
    // set options for ward
    setOptions(wardSelect, wardOptions);
}


function setTpiOptions(zone) {
    const tpiOptions = getTpiOptions(zone);
    setOptions(tpiNameSelect, tpiOptions);

}


function isDocumentUploadActive(value) {
    return parseFloat(value) > 0;
}

function isAnyDocumentUploadActive() {
    const lay20mmValue = document.getElementById('lay20mm').value;
    const lay32mmValue = document.getElementById('lay32mm').value;
    const lay63mmValue = document.getElementById('lay63mm').value;
    const lay125mmValue = document.getElementById('lay125mm').value;
    const lay180mmValue = document.getElementById('lay180mm').value;
    const rfcValue = document.getElementById('rfc').value;
    const riserConnectivityValue = document.getElementById('riserConnectivity').value;
    const serviceLineValue = document.getElementById('serviceLine').value;

    return (
        isDocumentUploadActive(lay20mmValue) ||
        isDocumentUploadActive(lay32mmValue) ||
        isDocumentUploadActive(lay63mmValue) ||
        isDocumentUploadActive(lay125mmValue) ||
        isDocumentUploadActive(lay180mmValue) ||
        isDocumentUploadActive(rfcValue) ||
        isDocumentUploadActive(riserConnectivityValue) ||
        isDocumentUploadActive(serviceLineValue)
    );
}

function enableDisableDocumentUpload() {


    documentUploadFields.forEach(field => {
        const documentUploadInput = document.getElementById(field);
        documentUploadInput.disabled = !isDocumentUploadActive(document.getElementById(field.replace('documentUpload', '')));
    });
}

function uploadDocument(documentInputId) {
    return new Promise((resolve, reject) => {
        const documentUploadInput = document.getElementById(documentInputId);
        const file = documentUploadInput.files[0];

        if (file) {
            const storageRef = firebase.storage().ref();
            const documentRef = storageRef.child(`documents/${file.name}`);
            documentRef.put(file).then((snapshot) => {
                console.log('Document uploaded successfully!');
                snapshot.ref.getDownloadURL().then(function (downloadURL) {
                    console.log("File available at", downloadURL);
                    resolve(downloadURL);
                });
            }).catch((error) => {
                console.error('Error uploading document:', error);
                reject(error);
            });
        }

    })
}


function validateData(payload) {
    // none of the fields should be empty
    // all the fields should be valid
    const keys = Object.keys(payload)

    let flag = true;
    for (const key of keys) {
        if (!payload[key]) {
            alert(`${key} is empty`);
            flag = false;
            break;
        }
    }

    if (!flag) {
        return false;
    }

    flag = true;
    // check is documnet fields contains fiels
    for (const documentInputId of documentUploadFields) {
        const documentUploadInput = document.getElementById(documentInputId);
        const file = documentUploadInput.files[0];

        if (!file) {
            alert(`${field} document is empty`);
            flag = false;
            return false;
        }

        // if file size is greater than 5MB
        if (file.size > 5 * 1024 * 1024) {
            alert(`${field} document is greater than 5MB`);
            flag = false;
            return false;
        }
    }
    return flag;
}



async function submitForm() {
    console.log('Submitting form...');
    enableDisableDocumentUpload();
    const formData = {
        zone: document.getElementById('zone').value,
        contractor: document.getElementById('contractor').value,
        tpiName: document.getElementById('tpiName').value,
        ward: document.getElementById('ward').value,
        rfc: document.getElementById('rfc').value,
        riserConnectivity: document.getElementById('riserConnectivity').value,
        serviceLine: document.getElementById('serviceLine').value,
        lay20mm: document.getElementById('lay20mm').value,
        lay32mm: document.getElementById('lay32mm').value,
        lay63mm: document.getElementById('lay63mm').value,
        lay125mm: document.getElementById('lay125mm').value,
        lay180mm: document.getElementById('lay180mm').value,
        malbaSection: document.getElementById('malbaSection').value,
        hardRockSection: document.getElementById('hardRockSection').value,
        documentsUrl: {
            rfc: '',
            riserConnectivity: '',
            serviceLine: '',
            lay20mm: '',
            lay32mm: '',
            lay63mm: '',
            lay125mm: '',
            lay180mm: ''
        }
    };

    if (!validateData(formData)) {
        return;
    }
    Swal.showLoading();

    const promiseArray = [
        uploadDocument('documentUploadRFC'),
        uploadDocument('documentUploadRiser'),
        uploadDocument('documentUploadServiceLine'),
        uploadDocument('documentUploadLay20mm'),
        uploadDocument('documentUploadLay32mm'),
        uploadDocument('documentUploadLay63mm'),
        uploadDocument('documentUploadLay125mm'),
        uploadDocument('documentUploadLay180mm')
    ]



    Promise.all(promiseArray).then(async (documentURLs) => {
        console.log('All documents uploaded successfully!');
        console.log('documentURLs:', documentURLs);
        documentURLs.forEach((url, index) => {
            const documentName = documentUploadFields[index].replace('documentUpload', '');
            formData.documentsUrl[documentName] = url;
        })
        const refId = await setDataToFirestore(formData);
        Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Data submitted successfully! \n Referenced ID: ' + refId,
            showConfirmButton: true,
            confirmButtonText: 'OK'

        }).then((result) => {
            window.location.reload();
        })
    }).catch((error) => {
        console.error('Error uploading documents:', error);
    })

}

zoneSelect.addEventListener('change', onZoneChange);
submitBtn.addEventListener('click', submitForm);
// Append zones to zone select on page load
appendZones();