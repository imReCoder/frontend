const wardOptions = {
    "zone1": [
        {
            "name": "Ward 1",
            "value": "ward1"
        },
        {
            "name": "Ward 2",
            "value": "ward2"
        },
        {
            "name": "Ward 3",
            "value": "ward3"
        }
    ],
    "zone2": [
        {
            "name": "Ward 4",
            "value": "ward4"
        },
        {
            "name": "Ward 5",
            "value": "ward5"
        },
        {
            "name": "Ward 6",
            "value": "ward6"
        }
    ],
    "zone3": [
        {
            "name": "Ward 7",
            "value": "ward7"
        },
        {
            "name": "Ward 8",
            "value": "ward8"
        },
        {
            "name": "Ward 9",
            "value": "ward9"
        }
    ],
}

const getWardOptions = function (zone) {
    return wardOptions[zone];
}