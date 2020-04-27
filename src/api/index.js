import texts from "../texts";

function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}

function FetchData(url) {
  if (window.navigator.onLine === false) {
    const error = texts["no-internet"];
    throw new Error(error);
  } else {
      return fetch(url)
        .then(handleErrors)
        .then((response) => response.json())
  }
}

export function GetStationCodes() {
    const url = "https://rata.digitraffic.fi/api/v1/metadata/stations";
   return FetchData(url);
}

export function GetCurrentStation(code) {
    let url = `https://rata.digitraffic.fi/api/v1/live-trains/station/${code}?minutes_before_departure=30&minutes_after_departure=15&minutes_before_arrival=30&minutes_after_arrival=15`;
    return FetchData(url);
}
