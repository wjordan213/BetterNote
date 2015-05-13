window.BetterNote = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    new BetterNote.Routers.Router($rootEl: $(".main"));
    this.populateSidebar();
    Backbone.history.start();
  },

  populateSidebar: function() {
    var sidebar = new BetterNote.Views.Sidebar();
    $(".sidebar").html(sidebar.render().$el)
  }
};

$(document).ready(function(){
  BetterNote.initialize();
});
