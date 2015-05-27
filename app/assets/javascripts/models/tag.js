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
    // here we want to connect to
    if (!this._notes) {
      this._notes = new BetterNote.Collections.Notes({tag: this});
    }

    return this._notes;
  }
});
