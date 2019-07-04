export async function GetStationCodes() {
    let stations = [];

    try {
        const url = "https://rata.digitraffic.fi/api/v1/metadata/stations";
        await fetch(url)
        .then(response => response.json())
        .then(data => data.map(item => stations.push(
            {
                station: item.stationName,
                code: item.stationShortCode
            }
        )));
        return stations;
    }catch (error) {
        console.log(error);
    }
}

export async function GetCurrentStation(code) {
    let trains = [];
    try {
        let url = `https://rata.digitraffic.fi/api/v1/live-trains/station/${code}?minutes_before_departure=30&minutes_after_departure=15&minutes_before_arrival=30&minutes_after_arrival=15`;
        await fetch(url)
        .then(response => response.json())
        .then(data => data.map(item => trains.push(item)));
        return trains;
    }catch (error) {
        console.log(error);
    }
}