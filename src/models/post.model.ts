import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize'
import sequelize from '../configs/db.config'
import Vote from './vote.model'

class Post extends Model<InferAttributes<Post>, InferCreationAttributes<Post>> {
  declare id: CreationOptional<number>
  declare title: string
  declare content: string
  declare published: boolean
  declare author_id: number
  declare created_at: CreationOptional<Date>
  declare updated_at: CreationOptional<Date>
}

Post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    published: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    author_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
  },
  {
    sequelize,
    tableName: 'posts',
    underscored: true,
  },
)

Post.hasMany(Vote, {
  as: 'vote',
  foreignKey: 'post_id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
})
Vote.belongsTo(Post, { foreignKey: 'post_id', as: 'vote' })

export default Post
