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

const getValidApartments = async() => {
    const d = moment().format();
    const validApartments = await etuoviService.getApartments();
    console.log('GetApartments request done! DateTime: ', d);
    console.log('Amount of apartments found: ', validApartments.amountOfPotentialApartments);

    validApartments.potentialApartmentsListByDistricts.forEach(apartmentsByDistrict => {
        console.log(`${apartmentsByDistrict.district}:`);
        apartmentsByDistrict.apartments.forEach(apartment => {
            console.log(`${apartment.link} koko: ${apartment.livingArea} m², hinta: ${apartment.price} €`)
        });
        console.log('------------------------------------------------------------------');
    });
    console.log('___________DONE____________');
};
