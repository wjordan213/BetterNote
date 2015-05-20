BetterNote.Collections.Notebooks = Backbone.Collection.extend({
  url: "/api/notebooks",
  model: BetterNote.Models.Notebook,
  comparator: 'updated_at',

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
BetterNote.notebooks.fetch();
