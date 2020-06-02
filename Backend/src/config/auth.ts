require('dotenv').config({ path: './.env' })

export default {
  secret: process.env.APP_SECRET,
  expiresIn: '7d',
};
