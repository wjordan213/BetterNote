BetterNote.Collections.Notebooks = Backbone.Collection.extend({
  url: "/api/notebooks",
  model: BetterNote.Models.Notebook
});

BetterNote.notebooks = new BetterNote.Collections.Notebooks();
