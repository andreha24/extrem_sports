require("dotenv").config()

const storageConfig = {
  projectId: process.env.PROJECT_ID,
  credentials: {
    client_email: process.env.CLIENT_EMAIL,
    private_key: process.env.PRIVATE_KEY.replace(/\\n/g, '\n'),
  }
};

module.exports = storageConfig;
