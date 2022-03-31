const axios = require('axios');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const requestData = require('./requestData');

// keeps the alreadySearchedIds state while app is running
let alreadySearchedIds = [];

exports.getApartments = async() => {
  let potentialApartmentsListByDistricts = [];
  let amountOfPotentialApartments = 0;

  const apartmentsList = await getApartmentListing();
  for (const apartment of apartmentsList.data.announcements) {
    const id = apartment.friendlyId;

    if (alreadySearchedIds.find(alreadySearchedId => alreadySearchedId === id)) {
      continue;
    }

    const apartmentSpecificData = await getApartmentSpecificData(id);
    if (isInWantedCondition(apartmentSpecificData.property)) {
      addToPotentialApartmentsList(apartmentSpecificData, potentialApartmentsListByDistricts);
      amountOfPotentialApartments++;
    }
    alreadySearchedIds.push(id);
  }

  return { amountOfPotentialApartments, potentialApartmentsListByDistricts };
};

const getApartmentListing = () => {
  const config = {
    headers: requestData.headers()
  };

  try {
    return axios.post('https://www.etuovi.com/api/v2/announcements/search/listpage', requestData.payload(), config);
  } catch (err) {
    console.error(err);
  }
}

const getApartmentSpecificData = async (id) => {
  try {
    const rawHtmlData = await axios.get(`https://www.etuovi.com/kohde/${id}`);
    const apartmentDataDom = new JSDOM(rawHtmlData.data, { runScripts: 'dangerously' });
    const apartmentData = apartmentDataDom.window.__INITIAL_STATE__.item.data;
    // console.log('DATA: ', apartmentData)
    return apartmentData;
  } catch (err) {
    console.error(err);
  }
}

const isInWantedCondition = (apartmentData) => {
  const renovationsPlannedKeyWords = [
    'seinä',
    'saneeraus',
    'linja',
    'putki',
    'julkisivu',
    'rappukäytäv',
    'kylpyhuone',
    'katto',
    'ulkoseinien',
    'ulkoseinä',
    'ulkovaip', //ulkovaippa/vaipan
  ];

  // console.log('renovationsXX: ', apartmentData.housingCompany.renovationsPlannedDescription)
  const badWordFoundFromUpcomingRenovationsDesc =
    renovationsPlannedKeyWords.some(word => apartmentData.housingCompany?.renovationsPlannedDescription?.toLowerCase().includes(word));
  if (badWordFoundFromUpcomingRenovationsDesc) {
    return false;
  }

  const periodicChargesMaxAmount = 500;
  const totalPeriodicCharge = apartmentData.periodicCharges?.find(chargeType => chargeType.periodicCharge === 'HOUSING_COMPANY_TOTAL_CHARGE');
  if (totalPeriodicCharge?.price >= periodicChargesMaxAmount) {
    return false;
  }

  return true;
}

const addToPotentialApartmentsList = (apartmentSpecificData, list) => {
   const districtName = apartmentSpecificData.property.districtNameFreeForm;
   const existingDistrictIndex = list.findIndex(item => item.district === districtName);
   const linkToApartment = `https://www.etuovi.com/kohde/${apartmentSpecificData.friendlyId}`;

   const validApartmentObj = {
     link: linkToApartment,
     price: apartmentSpecificData.debfFreePrice,
     livingArea: apartmentSpecificData.residenceDetailsDTO?.livingArea,
   };

   // district item already exists => add new link inside it
   if (existingDistrictIndex !== -1) {
     list[existingDistrictIndex].apartments.push(validApartmentObj);
     list[existingDistrictIndex].apartments.sort( (a, b) => a.price - b.price);
   } else {
     list.push({ district: districtName, apartments: [validApartmentObj] });
   }
}
