BetterNote.Models.Note = Backbone.Model.extend({
  urlRoot: '/api/notes',

  toJSON: function() {
    var json = Backbone.Model.prototype.toJSON.call(this);
    var object = json
    if (json.tag_ids) {
      var tag_ids = json.tag_ids
      delete json.tag_ids
      object = {note: json, tag_ids: tag_ids};
    }
    debugger;
    return object;
  },

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
