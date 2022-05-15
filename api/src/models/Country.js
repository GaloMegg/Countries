const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
    // defino el modelo

    sequelize.define('country', {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
            set(v) {
                this.setDataValue('id', v.toLowerCase());
            }
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            set(v) {
                this.setDataValue('name', v.toLowerCase());
            },
            get() {
                const name = this.getDataValue('name');
                const NAME_CAPITALIZED = name[0].toUpperCase() + name.slice(1);
                return NAME_CAPITALIZED
            }
        },
        img: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        continent: {
            type: DataTypes.STRING,
            allowNull: false,
            set(v) {
                this.setDataValue('continent', v.toLowerCase());
            },
            get() {
                const cont = this.getDataValue('continent');
                const CONT_CAPITALIZED = cont[0].toUpperCase() + cont.slice(1);
                return CONT_CAPITALIZED
            }
        },
        capital: {
            type: DataTypes.STRING,
            allowNull: false,
            set(v) {
                this.setDataValue('capital', v.toLowerCase());
            },
            get() {
                const capital = this.getDataValue('capital');
                const CAP_CAPITALIZED = capital[0].toUpperCase() + capital.slice(1);
                return CAP_CAPITALIZED
            }
        },
        subregion: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        population: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        area: {
            type: DataTypes.FLOAT,
            allowNull: true,
        }
    });
    sequelize.define('activity', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            set(v) {
                this.setDataValue('name', v.toLowerCase());
            }
        },
        difficulty: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 1,
                max: 5
            }
        },
        duration: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        season: {
            type: DataTypes.ENUM("summer", "winter", "autumn", "spring"),
            allowNull: true,
            set(v) {
                this.setDataValue('season', v.toLowerCase());
            }
        },
    });
};
