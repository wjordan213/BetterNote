BetterNote.Collections.SearchResults = Backbone.Collection.extend({
  initialize: function () {
    this.searchInfo = {};
  },

  comparator: function(first, second) {
    var first_updated = first.get('updated_at');
    var second_updated = second.get('updated_at');
    if (first_updated > second_updated) {
      return 1;
    } else if (first_updated === second_updated) {
      return 0;
    } else {
      return -1;
    }
  },
  url: "/api/search",

  model: BetterNote.Models.Note
});
