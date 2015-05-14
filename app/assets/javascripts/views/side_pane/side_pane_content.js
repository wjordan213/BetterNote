BetterNote.Views.SideContent = Backbone.View.extend({
  tagName: 'li',
  template: JST["side_pane/side_pane_content"],

  events: {
    'click .edit' : 'edit',
    'click .delete' : 'destroy',
    'click .title' : 'showContent'
  },

  initialize: function() {
    this.listenTo(this.model, 'change:title', this.render);
  },

  showContent: function(event) {
    var notebook = BetterNote.notebooks.getOrFetch(id);

    var notebookShow = new BetterNote.Views.SidePane({ collection: BetterNote.notebooks, type: "notebook", model: notebook });

    BetterNote.notebooks.fetch();
    this._swapPaneView(notebookShow);
  },

  destroy: function(event) {
    event.preventDefault();
    this.model.destroy();
    this.remove();
  },

  edit: function(event) {
    event.preventDefault();

    Backbone.history.navigate($(event.target).data('href'), {trigger: true})
  },

  render: function() {
    var contents = this.template({content: this.model});
    this.$el.html(contents);
    return this;
  }
})
