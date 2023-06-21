const { request, response } = require('express');
const queries = require('../queries');
const addBin = require('./helpers/add-bin')

exports.addBin = async (request, response) => {
  
    const { didError, speechResponse } = await addBin.addBin();

    if (didError) {
        response.status(400).send(speechResponse);
    } else {
        response.status(200).send(speechResponse);
    }
};
