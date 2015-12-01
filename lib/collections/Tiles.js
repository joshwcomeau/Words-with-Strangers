Tiles = new Mongo.Collection('tiles', {
  transform(doc) {
    // Add convenience properties for accessing co-ordinates.
    // Position is stored as [x, y], but that's not always the nicest
    // for fetching.
    doc.x = doc.position[0];
    doc.y = doc.position[1];

    return doc;
  }
});
Tiles.attachSchema( new SimpleSchema({
  playerId:   { type: String },
  gameId:     { type: String },
  turnId:     { type: String, optional: true },
  letter:     { type: String, max: 1 },
  points:     { type: Number, min: 1, max: 10 },
  position:   { type: [Number], optional: true, minCount: 2, maxCount: 2 },
  location:   { type: String, allowedValues: ['board', 'rack']},

  // Timestamps
  createdAt:  SchemaHelpers.createdAt,
  updatedAt:  SchemaHelpers.updatedAt

}));

Meteor.methods({
  returnTiles(tiles) {
    const tileIds = _.pluck(tiles, '_id');

    Tiles.update({
      _id: { $in: tileIds }
    }, { $set: {
      position: undefined,
      location: 'rack'
    }});
  }
})
