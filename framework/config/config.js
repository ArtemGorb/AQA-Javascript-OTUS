import 'dotenv/config';

const config = {
  baseURL: process.env.BASEURL,
  alreadyInUseUsername: process.env.ALREADY_IN_USE_USERNAME,
  alwaysPresentUsername: process.env.ALWAYS_PRESENT_USERNAME,
  alwaysPresentPassword: process.env.ALWAYS_PRESENT_PASSWORD,
  alwaysPresentUserId: process.env.ALWAYS_PRESENT_USERID,
  alwaysPresentISBN: process.env.ALWAYS_PRESENT_ISBN
};
const getConfig = () => config;

export default {getConfig};
