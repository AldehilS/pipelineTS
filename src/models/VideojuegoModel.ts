import { Model, Sequelize } from 'sequelize';

interface VideojuegoAttributes {
    Id: string;
    nombre: string;
    genero: string;
    clasificacion: string;
}

module.exports = (sequelize: Sequelize, DataTypes: any) => {
    class Videojuego extends Model<VideojuegoAttributes> implements VideojuegoAttributes {
        public Id!: string;
        public nombre!: string;
        public genero!: string;
        public clasificacion!: string;

        static associate(models: any) {
            
        }
    }

    Videojuego.init({
        Id: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        genero: {
            type: DataTypes.STRING,
            allowNull: false
        },
        clasificacion: {
            type: DataTypes.STRING,
            allowNull: false
        },
    }, {
        sequelize,
        modelName: 'Videojuego'
    })

    return Videojuego
}