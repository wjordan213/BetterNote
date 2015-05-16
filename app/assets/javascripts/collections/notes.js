BetterNote.Collections.Notes = Backbone.Collection.extend({
  url: '/api/notes',
  model: BetterNote.Models.Note,

  getOrFetch: function(id) {
    var note = this.get(id);
    if (note) {
      note.fetch();
    } else {
      note = new this.model({id: id});
      note.fetch({
        success: function() {
          this.add(note)
        }.bind(this)
      });
    }
    return note;
  }
})

BetterNote.notes = new BetterNote.Collections.Notes();
