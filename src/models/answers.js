module.exports = (sequelize, DataTypes) => {
    const Answers = sequelize.define('answers', {
        question: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        answer: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: '',
        },
        is_annon: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        }
    });

    return Answers;
}