const { Router } = require('express');
const { Op } = require('sequelize');
const { Country } = require('../db.js');
const axios = require('axios').default;
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();
router.get("/countries/:id", async (req, res, next) => {
    const { id } = req.params
    console.log(id)
    try {
        const country = await Country.findAll({
            where: {
                id
            }
        })
        console.log(country)
        res.json(country)
    } catch (error) {
        next(error)
    }
})

router.get("/countries", async (req, res, next) => {
    const { name } = req.query
    try {
        let AllC = await Country.findAll()
        if (AllC.length === 0) {
            const response = await axios.get('https://restcountries.com/v3/all')
            const count = response.data.filter(e => e.capital?.length > 0 && e.currencies)
            count.forEach((e) => {
                Country.create({
                    id: e.cca3.toLowerCase(),
                    name: e.name.common.toLowerCase(),
                    img: e.flags[0],
                    continent: e.region.toLowerCase(),
                    capital: e.capital[0].toLowerCase(),
                    subregion: e.subregion || null,
                    population: e.population,
                    area: e.area,
                })
            })
            AllC = await Country.findAll()
            res.json(AllC)
            return
        }
        if (name) {
            const countries = await Country.findAll({
                where: {
                    name: {
                        [Op.like]: `%${name.toLowerCase()}%`
                    }
                }
            })
            console.log(countries)
            res.json(countries.length > 0 ? countries : "no hay paises con ese nombre")
            return
        }
        res.json(AllC)

    }
    catch (error) {
        next(error)
    }
})

//GET /countries
//get /countries(idpais)
// get countries?name
//post activity
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
