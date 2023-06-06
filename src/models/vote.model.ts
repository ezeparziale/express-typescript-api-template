import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize'
import sequelize from '../configs/db.config'

class Vote extends Model<InferAttributes<Vote>, InferCreationAttributes<Vote>> {
  declare user_id: number
  declare post_id: number
  declare created_at: CreationOptional<Date>
  declare updated_at: CreationOptional<Date>
}

Vote.init(
  {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    post_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
  },
  {
    sequelize,
    tableName: 'votes',
    underscored: true,
  },
)

export default Vote
