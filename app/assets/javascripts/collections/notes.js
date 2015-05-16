BetterNote.Collections.Notes = Backbone.Collection.extend({
  url: '/api/notes',
  model: BetterNote.Models.Note
})

BetterNote.notes = new BetterNote.Collections.Notes();
