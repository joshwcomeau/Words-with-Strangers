Tiles = new Mongo.Collection('tiles', {
  transform(doc) {
    // TODO: Delete this?
    if ( doc.x && doc.y ) {
      doc.position = [doc.x, doc.y];
    }

    return doc;
  }
});
Tiles.attachSchema( new SimpleSchema({
  playerId:   { type: String },
  gameId:     { type: String },
  turnId:     { type: String, optional: true },
  letter:     { type: String, max: 1 },
  points:     { type: Number, min: 1, max: 10 },
  x:          { type: Number, min: 0, optional: true },
  y:          { type: Number, min: 0, optional: true },
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
      x: undefined,
      y: undefined,
      location: 'rack'
    }});
  }
})
