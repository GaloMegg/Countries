const { Router } = require('express');
const axios = require('axios').default;
const { Country, Activity } = require('../../db.js');
const { Op } = require('sequelize');
const router = Router();

router.get('/:id', async (req, res, next) => {
    const { id } = req.params;
    try {
        const country = await Country.findAll({
            where: {
                id,
            },
            include: Activity,
        });
        res.json(...country);
    } catch (e) {
        next(e);
    }
});

router.get('/', async (req, res, next) => {
    const { name } = req.query;
    try {
        let AllC = await Country.findAll({
            include: Activity,
        });
        if (AllC.length === 0) {
            const response = await axios.get('https://restcountries.com/v3/all');
            response.data
                .filter((e) => e.capital?.length > 0 && e.currencies)
                .forEach((e) => {
                    Country.create({
                        id: e.cca3,
                        name: e.name.common,
                        img: e.flags[0],
                        continent: e.region,
                        capital: e.capital[0],
                        subregion: e.subregion || null,
                        population: e.population,
                        area: e.area,
                    });
                });
            AllC = await Country.findAll();
            res.json(AllC);
            return;
        }
        if (name) {
            const found = await Country.findAll({
                where: {
                    name: {
                        [Op.like]: `%${name.toLowerCase()}%`,
                    }
                },
                include: Activity,
            });
            res.json(found ? found : 'no hay paises con ese nombre');
            return;
        }
        res.json(AllC);
    } catch (e) {
        next(e);
    }
});
router.get("/filter/:continent", async (req, res, next) => {
    const { continent } = req.params;
    try {
        const found = await Country.findAll({
            where: {
                continent: continent,
            },
            include: Activity,
        });
        res.json(found);
    } catch (e) {
        next(e);
    }
})

module.exports = router;