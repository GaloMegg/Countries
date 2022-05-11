const { Activity, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Activity model', () => {
    before(() => conn.authenticate()
        .catch((err) => {
            console.error('Unable to connect to the database:', err);
        }));
    describe('Validators', () => {
        beforeEach(() => Activity.sync({ force: true }));
        //!Name
        describe('~|° Name °|~', () => {
            it("Shouldn't work with out name property", (done) => {
                Activity.create({ difficulty: 3, duration: 10 })
                    .then(() => done(new Error("Name property can't be null")))
                    .catch(() => done())
            });
            it("Shouldn't work if the property name isn't a String", (done) => {
                Activity.create({ name: 5, difficulty: 3, duration: 10 })
                    .then(() => done(new Error("The property name must be a String")))
                    .catch(() => done())
            });
            it('Shoud be setted in lower cases', (done) => {
                Activity.create({ name: "Argentina", difficulty: 3, duration: 10 }).then((res) => res.name === "argentina" ? done() : done(new Error("The response of the db must recieve all lower cases")))
                    .catch(() => done())
            });
            it('Should work when the name is a valid value', (done) => {
                Activity.create({ name: 'Argentina', difficulty: 2, duration: 10 })
                    .then(() => done())
                    .catch(() => done(new Error("Name must be a String and can't be null ")))
            });
        });
        //!Difficulty
        describe('~|° Difficulty °|~', () => {
            it("Shouldn't work when the difficulty is null", (done) => {
                Activity.create({ name: "Argentina", duration: 10 })
                    .then(() => done(new Error("Difficulty property can't be null")))
                    .catch(() => done())
            });
            it("Shouldn't work when difficulty isn't a Number", (done) => {
                Activity.create({ name: "Argentina", difficulty: "Dificil", duration: 10 })
                    .then(() => done(new Error("Difficulty property must be a Number")))
                    .catch(() => done())
            });
            it("Shouldn't work when difficulty is greater than 5", (done) => {
                Activity.create({ name: "Argentina", difficulty: 6, duration: 10 })
                    .then(() => done(new Error("The difficulty value must be less than 5")))
                    .catch(() => done())
            });
            it("Shouldn't work when difficulty value is less than 1", (done) => {
                Activity.create({ name: 'Argentina', difficulty: 0, duration: 10 })
                    .then(() => done(new Error("The difficulty value must be greater than 5")))
                    .catch(() => done())
            });
            it("Should work when difficulty value is a valid value", (done) => {
                Activity.create({ name: 'Argentina', difficulty: 2, duration: 10 })
                    .then(() => done())
                    .catch(() => done(new Error("Difficulty value must be grater than 1, less than 5, a number, and cannot be null")))
            });
        });
        //!Duration
        describe('~|° Duration °|~', () => {
            it("Shouldn't work when the duration is null", (done) => {
                Activity.create({ name: "Argentina", difficulty: 1 })
                    .then(() => done(new Error("Duration property can't be null")))
                    .catch(() => done())
            });
            it("Shouldn't work when the duration isn't a Number", (done) => {
                Activity.create({ name: "Argentina", difficulty: 1, duration: "un año" })
                    .then(() => done(new Error("Duration property must be a Number")))
                    .catch(() => done())
            });
            it('Should work when duration value is a valid value', (done) => {
                Activity.create({ name: "Argentina", difficulty: 5, duration: 10 })
                    .then(() => done())
                    .catch(() => done(new Error("Duration value must be a number and cannot be null")))
            });
        });
        describe('~|° Season °|~', () => {
            it('Should work when season is null', (done) => {
                Activity.create({ name: "Argentina", difficulty: 1, duration: 10 })
                    .then(() => done())
                    .catch(() => done(new Error("Season can be null")))
            });
            it("If season is not null, it should be part of the enum", (done) => {
                Activity.create({ name: "Argentina", difficulty: 1, duration: 10, season: "pre-winter" })
                    .then(() => done(new Error("Season must be one of these 'summer', 'winter', 'autumn', 'spring'")))
                    .catch(() => done())
            });
            it('Should work when the season is part of the enum', (done) => {
                Activity.create({ name: "Argentina", difficulty: 1, duration: 10, season: "winter" })
                    .then(() => done())
                    .catch(() => done(new Error("Season must be one of these 'summer', 'winter', 'autumn', 'spring'")))
            });
        });
    });
});
