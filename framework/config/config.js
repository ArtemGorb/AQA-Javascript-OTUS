import 'dotenv/config';

const config = {
  baseURL: process.env.BASEURL,
  alreadyInUseUsername: process.env.alreadyInUseUsername
};
const getConfig = () => config;

export default {getConfig};
