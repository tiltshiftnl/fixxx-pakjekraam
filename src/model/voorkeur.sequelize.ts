import { Sequelize, DataTypes } from 'sequelize';
import { Voorkeur } from './voorkeur.model';

export const initVoorkeur = (sequelize: Sequelize) => {
    const attributes = {
        erkenningsNummer: {
            type: DataTypes.STRING,
            allowNull: false,
            // unique: 'key',
        },
        marktId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            unique: 'key',
        },
        marktDate: {
            type: DataTypes.DATEONLY,
            allowNull: true,
            unique: 'key',
        },
        anywhere: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },
        minimum: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        maximum: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        brancheId: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        parentBrancheId: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        inrichting: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        absentFrom: {
            type: DataTypes.DATEONLY,
            allowNull: true,
        },
        absentUntil: {
            type: DataTypes.DATEONLY,
            allowNull: true,
        },
    };

    Voorkeur.init(attributes, {
        modelName: 'voorkeur',
        freezeTableName: true,
        sequelize,
        tableName: 'voorkeur',
    });

    return Voorkeur;
};

export default initVoorkeur;
