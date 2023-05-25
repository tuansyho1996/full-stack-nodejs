'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Doctor_Clinin_Specialty extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    Doctor_Clinin_Specialty.init({
        doctorId: DataTypes.INTEGER,
        clininId: DataTypes.INTEGER,
        specialtyId: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Doctor_Clinin_Specialty',
    });
    return Doctor_Clinin_Specialty;
};