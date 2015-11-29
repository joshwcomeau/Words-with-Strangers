Games = new Mongo.Collection('games')
Games.attachSchema( new SimpleSchema({
  playerIds:  { type: [String] },
  title:      { type: String },
  isActive:   { type: Boolean, defaultValue: false },
  playerTurn: { type: String },

  // Timestamps
  createdAt:  SchemaHelpers.createdAt,
  updatedAt:  SchemaHelpers.updatedAt

}));
