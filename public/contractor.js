const contractorOptions = {
    "zone1": [
        {
            "name": "Contractor 1",
            "value": "contractor1"
        },
        {
            "name": "Contractor 2",
            "value": "contractor2"
        },
        {
            "name": "Contractor 3",
            "value": "contractor3"
        }
    ],
    "zone2": [
        {
            "name": "Contractor 4",
            "value": "contractor4"
        },
        {
            "name": "Contractor 5",
            "value": "contractor5"
        },
        {
            "name": "Contractor 6",
            "value": "contractor6"
        }
    ],
    "zone3": [
        {
            "name": "Contractor 7",
            "value": "contractor7"
        },
        {
            "name": "Contractor 8",
            "value": "contractor8"
        },
        {
            "name": "Contractor 9",
            "value": "contractor9"
        }
    ],
}

const getContractorOptions = function (zone) {
    return contractorOptions[zone];
}