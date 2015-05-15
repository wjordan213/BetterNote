BetterNote.Collections.Notes = Backbone.Collection.extend({
  url: '/api/notes'
})

BetterNote.notes = new BetterNote.Collections.Notes();
