BetterNote.Collections.SearchResults = Backbone.Collection.extend({
  initialize: function () {
    this.searchInfo = {};
  },

  // parse: function(response) {
  //   response.search_results.forEach(function(item){
  //   var something = new this.model();
  //     something.set(item);
  //     this.add(something);
  //   }.bind(this));
  //   debugger;
  //   // delete response.search_results;
  //   // return response;
  //   delete response;
  //   return this;
  // },

  url: "/api/search",

  model: BetterNote.Models.Note
});
