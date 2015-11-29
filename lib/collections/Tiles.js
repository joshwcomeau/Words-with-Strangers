Tiles = new Mongo.Collection('tiles');
Tiles.attachSchema( new SimpleSchema({
  playerId:   { type: String },
  gameId:     { type: String },
  wordId:     { type: String, optional: true },
  letter:     { type: String, max: 1 },
  points:     { type: Number, min: 1, max: 10 },
  position:   { type: [Number], optional: true, minCount: 2, maxCount: 2 },
  location:   { type: String, allowedValues: ['board', 'rack']},

  // Timestamps
  createdAt:  SchemaHelpers.createdAt,
  updatedAt:  SchemaHelpers.updatedAt

}));
