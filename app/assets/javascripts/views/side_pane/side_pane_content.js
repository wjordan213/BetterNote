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
    this.listenTo(this.model, 'change:title sync', this.render);
  },

  changePane: function(event) {
    event.preventDefault();
    var id = $(event.target).data('id');
    if (this.type === "notes") {
      Backbone.history.navigate('notes/' + id, {trigger: true})
    } else {

      // debugger;

      var notebookShow = new BetterNote.Views.SidePane({ collection: this.model.notes(), type: "notes", model: this.model });
      this.model.fetch();
      this._swapPaneView(notebookShow);
    }
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
    var contents = this.template({content: this.model, type: this.type});
    this.$el.html(contents);
    return this;
  }
}))
