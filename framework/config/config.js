import 'dotenv/config'

const config = {
    baseURL: process.env.BASEURL,
    alreadyInUseUsername: process.env.ALREADY_IN_USE_USERNAME
} 
const getConfig = () => config

export default { getConfig }