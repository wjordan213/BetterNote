BetterNote.Collections.Notes = Backbone.Collection.extend({
  url: '/api/notes',
  model: BetterNote.Models.Note,

  comparator: function(first, second) {
    var first_updated = first.get('updated_at');
    var second_updated = second.get('updated_at');
    if (first_updated > second_updated) {
      return -1;
    } else if (first_updated === second_updated) {
      return 0;
    } else {
      return 1;
    }
  },

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
BetterNote.notes.fetch();
