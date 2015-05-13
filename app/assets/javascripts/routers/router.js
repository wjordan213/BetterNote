BetterNote.Routers.Router = Backbone.Router.extend({
  initialize: function(options) {
    $rootEl = options.$rootEl;
  },

  routes: {
    '' : 'index'
  },

  index: function() {
    
  }
})
