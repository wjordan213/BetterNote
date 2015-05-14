BetterNote.Views.Sidebar = Backbone.View.extend(
  _.extend({}, BetterNote.Mixins.PaneChanger, {
  tagName: 'nav',
  template: JST['sidebar'],

  events: {
    'click .notebooks' : 'changeToIndex'
  },

  render: function() {
    var content = this.template();
    this.$el.html(content);

    return this;
  },

  changeToIndex: function() {
    BetterNote.notebooks.fetch();
    var sidePane = BetterNote.sidePane = new BetterNote.Views.SidePane({type: 'notebooks', collection: BetterNote.notebooks })
    this._swapPaneView(sidePane);
  }

}))
