const cron = require('node-cron');
const express = require('express');
const moment = require('moment');
const etuoviService = require('./etuovi-service');
const app = express();

// runs every day at 10:00am and 9:00pm(klo 21).
cron.schedule('0 10,21 * * *', async () => {
    getValidApartments();
});

app.listen(3333, () => {
    getValidApartments();
});

const KERROSTALO = 'APARTMENT_HOUSE';
const RIVITALO = 'ROW_HOUSE';
const PARITALO = 'SEMI_DETACHED_HOUSE';
const OMAKOTI = 'DETACHED_HOUSE';

const getValidApartments = async() => {
    const d = moment().format();
    const validApartments = await etuoviService.getApartments();
    console.log('GetApartments request done! DateTime: ', d);
    console.log('Amount of apartments found: ', validApartments.amountOfPotentialApartments);

    validApartments.potentialApartmentsListByDistricts.forEach(apartmentsByDistrict => {
        console.log(`${apartmentsByDistrict.district}:`);
        getApartmentsByPropertyType(KERROSTALO, apartmentsByDistrict.apartments);
        getApartmentsByPropertyType(RIVITALO, apartmentsByDistrict.apartments);
        getApartmentsByPropertyType(PARITALO, apartmentsByDistrict.apartments);
        getApartmentsByPropertyType(OMAKOTI, apartmentsByDistrict.apartments);

        console.log('------------------------------------------------------------------------------------------------------------');
    });
    console.log('___________DONE____________');
};

const getApartmentsByPropertyType = (type, apartments) => {
    const apartmentsList = apartments.filter(apartment => apartment.residentialPropertyType === type);
    if (apartmentsList?.length) {
        if (type === KERROSTALO) {
            console.log('__Kerrostalot: ');
        }
        if (type === RIVITALO) {
            console.log('__Rivitalot: ');
        }
        if (type === PARITALO) {
            console.log('__Paritalot: ');
        }
        if (type === OMAKOTI) {
            console.log('__Omakotitalot: ');
        }
        apartmentsList.forEach(apartment => {
            console.log(`${apartment.link} koko: ${apartment.livingArea} m², hinta: ${apartment.price} €`);
            if (apartment.carParkingInformation) {
                console.log(`Autopaikan tiedot: ${apartment.carParkingInformation}`);
            }
        });
        console.log('  ');
    }
};
