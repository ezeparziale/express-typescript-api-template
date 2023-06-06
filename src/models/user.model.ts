import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize'
import sequelize from '../configs/db.config'
import Post from './post.model'
import Vote from './vote.model'

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare id: CreationOptional<number>
  declare email: string
  declare password: string
  declare created_at: CreationOptional<Date>
  declare updated_at: CreationOptional<Date>
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
  },
  {
    sequelize,
    tableName: 'users',
    underscored: true,
  },
)

User.hasMany(Post, {
  as: 'author',
  foreignKey: 'author_id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
})
Post.belongsTo(User, { foreignKey: 'author_id' })

User.hasMany(Vote, {
  as: 'user',
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
})
Vote.belongsTo(User, { foreignKey: 'user_id' })

export default User
