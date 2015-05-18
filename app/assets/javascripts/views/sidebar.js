BetterNote.Views.Sidebar = Backbone.View.extend(
  _.extend({}, BetterNote.Mixins.PaneChanger, {
  tagName: 'nav',
  template: JST['sidebar'],

  events: {
    'click .notebooks' : 'changeToNotebooks',
    'click .notes' : 'changeToNotes',
    'click .tags' : 'changeToTags'
  },

  render: function() {
    var content = this.template();
    this.$el.html(content);

    return this;
  },

  changeToNotes: function() {
    BetterNote.notes.fetch();
    var sidePane = BetterNote.sidePane = new BetterNote.Views.SidePane({type: 'notes', collection: BetterNote.notes});

    this._swapPaneView(sidePane);
  },

  changeToNotebooks: function() {
    BetterNote.notebooks.fetch();
    var sidePane = BetterNote.sidePane = new BetterNote.Views.SidePane({type: 'notebooks', collection: BetterNote.notebooks })
    this._swapPaneView(sidePane);
  },

  changeToTags: function() {
    BetterNote.tags.fetch();
    var sidePane = BetterNote.sidePane = new BetterNote.Views.SidePane({type: 'tags', collection: BetterNote.tags });

    this._swapPaneView(sidePane);
  }

}))
