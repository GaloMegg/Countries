const { Router } = require('express');
const { Country, Activity } = require('../../db.js');

const router = Router();

router.post('/activity', async (req, res, next) => {
    const { name, dificulty, duration, season, country } = req.body;
    const seasons = ['summer', 'winter', 'autumn', 'spring'];
    try {
        if ((name, dificulty, duration, country)) {
            if (dificulty < 1 || dificulty > 5) {
                next('Dificulty must be a number between 1 and 5');
                return;
            }
            if (season && !seasons.includes(season)) {
                next(
                    'Season must be one of the following: summer, winter, autumn, spring'
                );
                return;
            }
            let act = await Activity.create({
                name,
                dificulty,
                duration,
                season,
            });
            const found = await Country.findByPk(country);
            act?.addCountry([found]);
            res.json(act.toJSON());
        }
    } catch (e) {
        next(e);
    }
});

router.get('/activity', async (req, res, next) => {
    const { id } = req.query;
    try {
        if (id) {
            let asd = await Activity.findAll({
                where: {
                    id,
                },
                include: Country,
            });
            res.json(asd);
        }
        res.json(await Activity.findAll());
    } catch (e) {
        next(e);
    }
});
module.exports = router;