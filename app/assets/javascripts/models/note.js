BetterNote.Models.Note = Backbone.Model.extend({
  urlRoot: '/api/notes',

  toJSON: function() {
    var json = Backbone.Model.prototype.toJSON.call(this);

    var object = {note: {id: json.id, tag_ids: json.tag_ids, title: json.title, body: json.body, notebook_id: json.notebook_id}};
    delete json;
    return object;
  },

  parse: function(response) {
    if (response.tags) {
      response.tags.forEach(function(tag) {
        this.tags().push(BetterNote.tags.getOrFetch(tag.id));
      }.bind(this));
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
});
