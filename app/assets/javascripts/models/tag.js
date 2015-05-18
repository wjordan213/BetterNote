BetterNote.Models.Tag = Backbone.Model.extend({
  urlRoot: "/api/tags",

  parse: function(response) {
    if (response.notes) {
      this.notes().set(response.notes);
      delete response.notes;
    }
    return response;
  },

  notes: function() {
    if (!this._notes) {
      this._notes = new BetterNote.Collections.Notes([], { notebook: this });
    }

    return this._notes;
  }
})
