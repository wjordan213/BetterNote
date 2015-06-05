BetterNote.Models.Notebook = Backbone.Model.extend({
  urlRoot: "/api/notebooks",

  parse: function(response) {
    if (response.notes) {
      this.notes().set(response.notes);
      delete response.notes;
    }
    return response;
  },

  notes: function() {
    if (!this._notes) {
      this._notes = new BetterNote.Collections.Notes({ notebook: this });
      this._notes.remove(this._notes.models[0]);
    }

    return this._notes;
  }
});
