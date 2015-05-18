window.BetterNote = {
  Mixins: {},
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    new BetterNote.Routers.Router({$rootEl: $(".main")});
    this.populateSidebar();
    this.populateSidepane();
    Backbone.history.start();
  },

  populateSidepane: function() {
    BetterNote.notes.fetch();
    var sidePane = new BetterNote.Views.SidePane({type: 'notes', collection: BetterNote.notes })
    $(".sidePane").html(sidePane.render().$el);
  },

  populateSidebar: function() {
    var sidebar = new BetterNote.Views.Sidebar();
    $(".sidebar").html(sidebar.render().$el)
  }
};

$(document).ready(function(){
  BetterNote.initialize();
});
