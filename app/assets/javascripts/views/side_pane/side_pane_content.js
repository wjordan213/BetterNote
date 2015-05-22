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
      Backbone.history.navigate('notes/' + id, {trigger: true});
    } else {
      this.model.fetch();
      this._swapPaneView(this.model.notes(), "notes", this.model);
    }
  },

  destroy: function(event) {
    event.preventDefault();

    this.model.destroy();

    if (Backbone.history.getFragment().match('/' + this.model.id)) {
      Backbone.history.navigate('/notes/new', {trigger: true});
    }
    this.remove();
  },

  edit: function(event) {
    event.preventDefault();
    Backbone.history.navigate($(event.target).data('href'), {trigger: true});
  },

  render: function() {
    var contents = this.template({content: this.model, type: this.type});
    this.$el.html(contents);
    return this;
  }
}));
