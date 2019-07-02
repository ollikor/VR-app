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

        let url = `https://rata.digitraffic.fi/api/v1/live-trains/station/${code}`;
        await fetch(url)
        .then(response => response.json())
        .then(data => data.map(item => trains.push(item)));
        return trains;
    }catch (error) {
        console.log(error);
    }
}


// export async function remove(urlName, id) {
//     try {
//       const url = `http://localhost:8000/${urlName}${id}`;
//       const {data} = await axios.delete(url);
//       return data;
//     } catch (error) {
//       console.log(error);
//     }
//   }