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
            }
        },
        capital: {
            type: DataTypes.STRING,
            allowNull: false,
            set(v) {
                this.setDataValue('capital', v.toLowerCase());
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
        },
        currency: {
            type: DataTypes.STRING,
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
        dificulty: {
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
