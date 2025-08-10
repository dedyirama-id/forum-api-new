/* eslint-disable camelcase */
exports.up = (pgm) => {
  pgm.createTable('user_comment_likes', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    user_id: {
      type: 'VARCHAR(50)',
      notNull: true,
      references: 'users',
      referencesConstraintName: 'fk_user_comment_likes_user_id_users_id',
      onDelete: 'CASCADE',
    },
    comment_id: {
      type: 'VARCHAR(50)',
      notNull: true,
      references: 'comments',
      referencesConstraintName: 'fk_user_comment_likes_comment_id_comments_id',
      onDelete: 'CASCADE',
    },
  });

  pgm.addConstraint(
    'user_comment_likes',
    'unique_user_id_comment_id',
    'UNIQUE(user_id, comment_id)',
  );
};

exports.down = (pgm) => {
  pgm.dropTable('user_comment_likes');
};
