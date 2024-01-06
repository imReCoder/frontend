const tpiOptions = {
    "zone1": [
        {
            "name": "TPI 1",
            "value": "tpi1"
        },
        {
            "name": "TPI 2",
            "value": "tpi2"
        },
        {
            "name": "TPI 3",
            "value": "tpi3"
        }
    ],
    "zone2": [
        {
            "name": "TPI 4",
            "value": "tpi4"
        },
        {
            "name": "TPI 5",
            "value": "tpi5"
        },
        {
            "name": "TPI 6",
            "value": "tpi6"
        }
    ],
    "zone3": [
        {
            "name": "TPI 7",
            "value": "tpi7"
        },
        {
            "name": "TPI 8",
            "value": "tpi8"
        },
        {
            "name": "TPI 9",
            "value": "tpi9"
        }
    ],
}

const getTpiOptions = function (zone) {
    return tpiOptions[zone];
}