BetterNote.Views.Sidebar = Backbone.View.extend(
  _.extend({}, BetterNote.Mixins.PaneChanger, {
  tagName: 'nav',
  template: JST['sidebar'],

  events: {
    'click .notebooks' : 'changeToNotebooks',
    'click .notes' : 'changeToNotes',
    'click .tags' : 'changeToTags',
    'click .newNote' : 'newNote'
  },

  newNote: function(event) {
    event.preventDefault();
    Backbone.history.navigate($(event.target).data('href'), {trigger: true});
  },

  render: function() {
    var content = this.template();
    this.$el.html(content);

    return this;
  },

  changeToNotes: function() {
    BetterNote.notes.fetch();
    this._swapPaneView(BetterNote.notes, 'notes');
  },

  changeToNotebooks: function() {
    BetterNote.notebooks.fetch();
    this._swapPaneView(BetterNote.notebooks, 'notebooks');
  },

  changeToTags: function() {
    BetterNote.tags.fetch();
    this._swapPaneView(BetterNote.tags, 'tags');
  }

}))
