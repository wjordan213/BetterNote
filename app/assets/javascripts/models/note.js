BetterNote.Models.Note = Backbone.Model.extend({
  urlRoot: '/api/notes',

  parse: function(response) {
    if (response.tags) {
      this.tags().set(response.tags);
      delete response.tags;
    }

    return response;
  },

  tags: function() {
    if (!this._tags) {
      this._tags = new BetterNote.Collections.Tags([], { note: this });
    }

    return this._tags;
  }
})
