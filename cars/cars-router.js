const express = require('express');

const db = require('../data/db-config.js');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
      const cars = await db('cars');
      if(cars.length) {
          res.json(cars);
      } else {
          res.status(400).json({ error: "There are no cars in the database"})
      }
    } catch (err) {
      res.status(500).json({ message: 'Failed to retrieve cars' });
    }
  });
  
  router.get('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const car = await db('cars').where({ id });
  
      if(car.length) {
        res.json(car);
    } else {
        res.status(400).json({ error: "There is no car with that ID in the database"})
    }
    } catch (err) {
      res.status(500).json({ message: 'Failed to retrieve car' });
    }
  });
  
  router.post('/', async (req, res) => {
    try {
      const carData = req.body;
      const [id] = await db('cars').insert(carData);
      const newCarEntry = await db('cars').where({ id });
      if ( 
        carData.vin
        && carData.make
        && carData.model
        && carData.name
        && carData.mileage ) {
            const alreadyExisting = await db('cars').where({name: carData.name});
            if (alreadyExisting.length == 0) {
                res.status(201).json(newCarEntry);
            } else {
                res.status(400).json({error: "A car with that name already exists"})
            }
        } else {
            res.status(400).json({ error: "You're missing data from a required field"})
        }

    } catch (err) {
      console.log('POST error', err);
      res.status(500).json({ message: 'Failed to store data' });
    }
  });
  
  module.exports = router;