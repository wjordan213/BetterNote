BetterNote.Views.SideContent = Backbone.View.extend(
  _.extend({}, BetterNote.Mixins.PaneChanger, {

  tagName: 'li',
  template: JST["side_pane/side_pane_content"],

  events: {
    'click .edit' : 'edit',
    'click .delete' : 'destroy',
    'click .title' : 'changePane'
  },

  initialize: function(options) {
    this.type = options.type;
    this.listenTo(this.model, 'change:title', this.render);
  },

  changePane: function(event) {
    event.preventDefault();

    if (this.type === 'note') {
      Backbone.history.navigate($(event.target).data('href'), {trigger: true});
    } else { // (if this.type === 'notebook')
      // swapView
      newPane = new Backbone.Views.Notebooks({
        type: 'notebook'
      })
    }



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
}))
