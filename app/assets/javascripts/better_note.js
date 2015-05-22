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

    BetterNote.notebooks.fetch({
      success: function() {
        Backbone.history.start();
      },
      failure: function() {
        Backbone.history.start();
      }
    });

  },

  populateSidepane: function() {
    var sidePane = BetterNote._currentPane = new BetterNote.Views.SidePane({type: 'notes', collection: BetterNote.notes });
    $(".sidePane").html(sidePane.render().$el);
  },

  populateSidebar: function() {
    var sidebar = new BetterNote.Views.Sidebar();
    $(".sidebar").html(sidebar.render().$el);
  }
};

$(document).ready(function(){
  BetterNote.initialize();
});
