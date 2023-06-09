/* eslint-disable no-unused-vars */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const table = await queryInterface.createTable("users", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        unique: true,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: true
      },
      email: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true
      },
      password: {
        type: Sequelize.STRING,
        allowNull: true
      },
      phone: {
        type: Sequelize.STRING,
        allowNull: true
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      token: {
        type: Sequelize.STRING,
        allowNull: true
      },
      userType: {
        type: Sequelize.ENUM(
          "professional",
          "vendor",
          "private_client",
          "corporate_client"
        ),
        allowNull: true
      },
      address: {
        type: Sequelize.STRING,
        allowNull: true
      },
      state: {
        type: Sequelize.STRING,
        allowNull: true
      },
      city: {
        type: Sequelize.STRING,
        allowNull: true
      },
      street: {
        type: Sequelize.STRING,
        allowNull: true
      },
      kycScore: {
        type: Sequelize.INTEGER,
        defaultValue: false
      },
      kycTotal: {
        type: Sequelize.INTEGER,
        defaultValue: false
      },
      app: {
        type: Sequelize.STRING,
        defaultValue: false
      },
      facebook_id: {
        type: Sequelize.STRING,
        defaultValue: false
      },
      google_id: {
        type: Sequelize.STRING,
        defaultValue: false
      },
      apple_id: {
        type: Sequelize.STRING,
        defaultValue: false
      },
      login_trials: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      reason_for_suspension: {
        type: Sequelize.STRING,
        allowNull: true
      },
      last_login: {
        type: Sequelize.DATE,
        allowNull: true
      },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE },
      deletedAt: { allowNull: true, type: Sequelize.DATE }
    });
    return Promise.all(table);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable("users");
  }
};
