BetterNote.Routers.Router = Backbone.Router.extend({
  initialize: function(options) {
    $rootEl = options.$rootEl;
  },

  routes: {
    'notebooks' : 'notebookIndex'
  },

  notebookIndex: function() {
    var notebooksView = new BetterNote.Views.SideContent({ collection: BetterNote.notebooks })
  }
})
