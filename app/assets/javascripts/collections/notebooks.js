BetterNote.Collections.Notebooks = Backbone.Collection.extend({
  url: "/api/notebooks",
  model: BetterNote.Models.Notebook,
  comparator: function(first, second) {
    var first_updated = first.get('title').toLowerCase();
    var second_updated = second.get('title').toLowerCase();
    if (first_updated > second_updated) {
      return 1;
    } else if (first_updated === second_updated) {
      return 0;
    } else {
      return -1;
    }
  },

  getOrFetch: function(id, options) {
    var notebook = this.get(id);
    if (notebook) {
      notebook.fetch();
    } else {
      notebook = new this.model({id: id});
      notebook.fetch({
        success: function() {
          this.add(notebook);
        }.bind(this)
      });
    }

    return notebook;
  }
});

BetterNote.notebooks = new BetterNote.Collections.Notebooks();
// BetterNote.notebooks.fetch();
