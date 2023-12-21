function setLocations () {
  // Add locations here. Atm we are only searching from Helsinki districts.
  // To change city modify: "FI_UUSIMAA_HELSINKI_" to something else
  let locations = [
    'lauttasaari',
    'kapyla',
    'pasila',
    'toolo',
    'arabia',
    'tammisalo',
    'laajasalo',
    'herttoniemi',
    'siilitie',
    'viikki',
    'verkkosaari',
    'vallila',
    'hermanni',
    'rastila',
    'haaga',
    'etela-haaga',
    'pohjois-haaga',
    'meri-rastila',
    'kulosaari',
    'alppila',
    'arabianranta',
    'herttoniemenranta',
    'ramsinranta',
    'kallahti',
    'meilahti',
    'ruskeasuo',
    'munkkiniemi',
    'munkkivuori',
    'kivihaka',
    'huopalahti',
    'tali',
    'lassila',
    'marttila',
    'maunula',
  ];
  // here is manually added locations from node command args
  const locationArgs = process.argv.slice(2);
  locations = [ ...locations, ...locationArgs ];
  console.log('Search locations: ', locations);

  const city = 'FI_UUSIMAA_HELSINKI_';

  return locations.map(location => ({
    "type": "DISTRICT",
    "index": 0,
    "classified": true,
    "code": `${city.toUpperCase()}${location.toUpperCase()}`,
  }))
}

exports.payload = () => {
  return {
    "locationSearchCriteria": {
      "unclassifiedLocationTerms": [],
      "classifiedLocationTerms": setLocations()
    },
    "pagination": {
      "firstResult": 0,
      "maxResults": 100,
      "page": 1,
      "sortingOrder": {
        "property": "PUBLISHED_OR_UPDATED_AT",
        "direction": "DESC"
      }
    },
    "priceMin": null,
    "priceMax": 500000,
    "sizeMin": 58,
    "sizeMax": null,
    "sellerType": "ALL",
    "officesId": [],
    "bidType": "ALL",
    "publishingTimeSearchCriteria": null,
    "showingSearchCriteria": {},
    "propertyType": "RESIDENTIAL",
    "residentialPropertyTypes": [
      "APARTMENT_HOUSE",
      "ROW_HOUSE",
      "SEMI_DETACHED_HOUSE",
      "DETACHED_HOUSE"
    ],
    "freeTextSearch": "",
    "plotAreaMin": null,
    "plotAreaMax": null,
    "yearMin": null,
    "yearMax": null,
    "priceSquareMeterMin": null,
    "priceSquareMeterMax": null,
    "maintenanceChargeMin": null,
    "maintenanceChargeMax": null,
    "newBuildingSearchCriteria": "ALL_PROPERTIES",
    "plotHoldingTypes": [
      "OWN"
    ],
    "ownershipTypes": [
      "OWN"
    ],
    "hasShore": null,
    "checkIfHasImages": null,
    "checkIfHasPanorama": null,
    "checkIfHasVideo": null,
    "checkIfHasRemoteShowings": null,
    "roomCounts": [],
    "overallConditions": [
      "GOOD",
      "SATISFACTORY"
    ],
    "heatingSystems": null,
    "apartmentHasSauna": true,
    "apartmentHasNoSauna": null,
    "housingCompanyHasSauna": null,
    "apartmentHasBalcony": null, // <- use this option with caution. It will filter lot of options away.
    "housingCompanyHasElevator": null,
    "residentialFloorCountType": null,
    "floorPositionInHighrise": null,
    "carParkingFeatures": null,
  }
}

exports.headers = () => {
  return {
    'X-XSRF-TOKEN': '1d40193d-4491-4edb-b793-ae650f4d86b8',
    'Content-Type': 'application/json',
    'XSRF-TOKEN': '1d40193d-4491-4edb-b793-ae650f4d86b8',
    'Cookie': 'XSRF-TOKEN=1d40193d-4491-4edb-b793-ae650f4d86b8;',
  }
}

// here is unused searchData by district. Found that whole object is not required to fetch districts apartment data.
// List should be part of the: "classifiedLocationTerms":  -property
/* [
        {
          "type": "DISTRICT",
          "index": 0,
          "classified": true,
          "code": "FI_UUSIMAA_HELSINKI_LAUTTASAARI",
          "shortName": "Lauttasaari",
          "parentCountryCode": "FI",
          "parentRegionCode": "FI_UUSIMAA",
          "parentRegionName": "Uusimaa",
          "parentMunicipalityCode": "FI_UUSIMAA_HELSINKI",
          "parentMunicipalityName": "Helsinki",
          "fullName": "Lauttasaari, Helsinki",
          "latitude": 60.158971,
          "longitude": 24.867967
        },
        {
          "type": "DISTRICT",
          "index": 0,
          "classified": true,
          "code": "FI_UUSIMAA_HELSINKI_KAPYLA",
          "shortName": "Käpylä",
          "parentCountryCode": "FI",
          "parentRegionCode": "FI_UUSIMAA",
          "parentRegionName": "Uusimaa",
          "parentMunicipalityCode": "FI_UUSIMAA_HELSINKI",
          "parentMunicipalityName": "Helsinki",
          "fullName": "Käpylä, Helsinki",
          "latitude": 60.212879,
          "longitude": 24.948217
        },
        {
          "type": "DISTRICT",
          "index": 0,
          "classified": true,
          "code": "FI_UUSIMAA_HELSINKI_PASILA",
          "shortName": "Pasila",
          "parentCountryCode": "FI",
          "parentRegionCode": "FI_UUSIMAA",
          "parentRegionName": "Uusimaa",
          "parentMunicipalityCode": "FI_UUSIMAA_HELSINKI",
          "parentMunicipalityName": "Helsinki",
          "fullName": "Pasila, Helsinki"
        },
        {
          "type": "DISTRICT",
          "index": 0,
          "classified": true,
          "code": "FI_UUSIMAA_HELSINKI_HERTTONIEMI",
          "shortName": "Herttoniemi",
          "parentCountryCode": "FI",
          "parentRegionCode": "FI_UUSIMAA",
          "parentRegionName": "Uusimaa",
          "parentMunicipalityCode": "FI_UUSIMAA_HELSINKI",
          "parentMunicipalityName": "Helsinki",
          "fullName": "Herttoniemi, Helsinki",
          "latitude": 60.194168,
          "longitude": 25.03077
        },
        {
          "type": "DISTRICT",
          "index": 0,
          "classified": true,
          "code": "FI_UUSIMAA_HELSINKI_KATAJANOKKA",
          "shortName": "Katajanokka",
          "parentCountryCode": "FI",
          "parentRegionCode": "FI_UUSIMAA",
          "parentRegionName": "Uusimaa",
          "parentMunicipalityCode": "FI_UUSIMAA_HELSINKI",
          "parentMunicipalityName": "Helsinki",
          "fullName": "Katajanokka, Helsinki",
          "latitude": 60.165875,
          "longitude": 24.971324
        },
        {
          "type": "DISTRICT",
          "index": 0,
          "classified": true,
          "code": "FI_UUSIMAA_HELSINKI_LAAJASALO",
          "shortName": "Laajasalo",
          "parentCountryCode": "FI",
          "parentRegionCode": "FI_UUSIMAA",
          "parentRegionName": "Uusimaa",
          "parentMunicipalityCode": "FI_UUSIMAA_HELSINKI",
          "parentMunicipalityName": "Helsinki",
          "fullName": "Laajasalo, Helsinki",
          "latitude": 60.175209,
          "longitude": 25.030861
        },
        {
          "type": "DISTRICT",
          "index": 0,
          "classified": true,
          "code": "FI_UUSIMAA_HELSINKI_RUOHOLAHTI",
          "shortName": "Ruoholahti",
          "parentCountryCode": "FI",
          "parentRegionCode": "FI_UUSIMAA",
          "parentRegionName": "Uusimaa",
          "parentMunicipalityCode": "FI_UUSIMAA_HELSINKI",
          "parentMunicipalityName": "Helsinki",
          "fullName": "Ruoholahti, Helsinki",
          "latitude": 60.16333,
          "longitude": 24.913992
        },
        {
          "type": "DISTRICT",
          "index": 0,
          "classified": true,
          "code": "FI_UUSIMAA_HELSINKI_RASTILA",
          "shortName": "Rastila",
          "parentCountryCode": "FI",
          "parentRegionCode": "FI_UUSIMAA",
          "parentRegionName": "Uusimaa",
          "parentMunicipalityCode": "FI_UUSIMAA_HELSINKI",
          "parentMunicipalityName": "Helsinki",
          "fullName": "Rastila, Helsinki",
          "latitude": 60.210308,
          "longitude": 25.118198
        },
        {
          "type": "DISTRICT",
          "index": 0,
          "classified": true,
          "code": "FI_UUSIMAA_HELSINKI_SORNAINEN",
          "shortName": "Sörnäinen",
          "parentCountryCode": "FI",
          "parentRegionCode": "FI_UUSIMAA",
          "parentRegionName": "Uusimaa",
          "parentMunicipalityCode": "FI_UUSIMAA_HELSINKI",
          "parentMunicipalityName": "Helsinki",
          "fullName": "Sörnäinen, Helsinki",
          "latitude": 60.185814,
          "longitude": 24.965965
        },
        {
          "type": "DISTRICT",
          "index": 0,
          "classified": true,
          "code": "FI_UUSIMAA_HELSINKI_MERIHAKA",
          "shortName": "Merihaka",
          "parentCountryCode": "FI",
          "parentRegionCode": "FI_UUSIMAA",
          "parentRegionName": "Uusimaa",
          "parentMunicipalityCode": "FI_UUSIMAA_HELSINKI",
          "parentMunicipalityName": "Helsinki",
          "fullName": "Merihaka, Helsinki",
          "latitude": 60.178882,
          "longitude": 24.960086
        },
        {
          "type": "DISTRICT",
          "index": 0,
          "classified": true,
          "code": "FI_UUSIMAA_HELSINKI_VUOSAARI",
          "shortName": "Vuosaari",
          "parentCountryCode": "FI",
          "parentRegionCode": "FI_UUSIMAA",
          "parentRegionName": "Uusimaa",
          "parentMunicipalityCode": "FI_UUSIMAA_HELSINKI",
          "parentMunicipalityName": "Helsinki",
          "fullName": "Vuosaari, Helsinki",
          "latitude": 60.218662,
          "longitude": 25.147945
        },
        {
          "type": "DISTRICT",
          "index": 0,
          "classified": true,
          "code": "FI_UUSIMAA_HELSINKI_KULOSAARI",
          "shortName": "Kulosaari",
          "parentCountryCode": "FI",
          "parentRegionCode": "FI_UUSIMAA",
          "parentRegionName": "Uusimaa",
          "parentMunicipalityCode": "FI_UUSIMAA_HELSINKI",
          "parentMunicipalityName": "Helsinki",
          "fullName": "Kulosaari, Helsinki",
          "latitude": 60.18572,
          "longitude": 25.005146
        },
        {
          "type": "DISTRICT",
          "index": 0,
          "classified": true,
          "code": "FI_UUSIMAA_HELSINKI_VALLILA",
          "shortName": "Vallila",
          "parentCountryCode": "FI",
          "parentRegionCode": "FI_UUSIMAA",
          "parentRegionName": "Uusimaa",
          "parentMunicipalityCode": "FI_UUSIMAA_HELSINKI",
          "parentMunicipalityName": "Helsinki",
          "fullName": "Vallila, Helsinki",
          "latitude": 60.196804,
          "longitude": 24.956823
        },
        {
          "type": "DISTRICT",
          "index": 0,
          "classified": true,
          "code": "FI_UUSIMAA_HELSINKI_VERKKOSAARI",
          "shortName": "Verkkosaari",
          "parentCountryCode": "FI",
          "parentRegionCode": "FI_UUSIMAA",
          "parentRegionName": "Uusimaa",
          "parentMunicipalityCode": "FI_UUSIMAA_HELSINKI",
          "parentMunicipalityName": "Helsinki",
          "fullName": "Verkkosaari, Helsinki",
          "latitude": 60.190457,
          "longitude": 24.982758
        },
        {
          "type": "DISTRICT",
          "index": 0,
          "classified": true,
          "code": "FI_UUSIMAA_HELSINKI_KALASATAMA",
          "shortName": "Kalasatama",
          "parentCountryCode": "FI",
          "parentRegionCode": "FI_UUSIMAA",
          "parentRegionName": "Uusimaa",
          "parentMunicipalityCode": "FI_UUSIMAA_HELSINKI",
          "parentMunicipalityName": "Helsinki",
          "fullName": "Kalasatama, Helsinki"
        },
        {
          "type": "DISTRICT",
          "index": 0,
          "classified": true,
          "code": "FI_UUSIMAA_HELSINKI_TAMMISALO",
          "shortName": "Tammisalo",
          "parentCountryCode": "FI",
          "parentRegionCode": "FI_UUSIMAA",
          "parentRegionName": "Uusimaa",
          "parentMunicipalityCode": "FI_UUSIMAA_HELSINKI",
          "parentMunicipalityName": "Helsinki",
          "fullName": "Tammisalo, Helsinki",
          "latitude": 60.192268,
          "longitude": 25.066711
        },
        {
          "type": "DISTRICT",
          "index": 0,
          "classified": true,
          "code": "FI_UUSIMAA_HELSINKI_ARABIA",
          "shortName": "Arabia",
          "parentCountryCode": "FI",
          "parentRegionCode": "FI_UUSIMAA",
          "parentRegionName": "Uusimaa",
          "parentMunicipalityCode": "FI_UUSIMAA_HELSINKI",
          "parentMunicipalityName": "Helsinki",
          "fullName": "Arabia, Helsinki"
        }
      ]*/
