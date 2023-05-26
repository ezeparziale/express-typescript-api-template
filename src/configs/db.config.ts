import { Sequelize } from 'sequelize'

import {
  POSTGRES_HOSTNAME,
  POSTGRES_DB,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_PORT,
} from './general.config'

const sequelize = new Sequelize(POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD, {
  host: POSTGRES_HOSTNAME,
  port: POSTGRES_PORT,
  dialect: 'postgres',
  logging: false,
})

sequelize.sync()

export default sequelize
