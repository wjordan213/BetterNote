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
    this._swapPaneView(BetterNote.notes, 'notes');
  },

  changeToNotebooks: function() {
    this._swapPaneView(BetterNote.notebooks, 'notebooks');
  },

  changeToTags: function() {
    this._swapPaneView(BetterNote.tags, 'tags');
  }

}))
