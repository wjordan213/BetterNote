BetterNote.Views.SideContent = Backbone.View.extend(
  _.extend({}, BetterNote.Mixins.PaneChanger, {

  tagName: 'li',
  template: JST["side_pane/side_pane_content"],

  events: {
    'click .edit' : 'edit',
    'click .delete' : 'destroy',
    'click .list_item' : 'changePane'
  },

  initialize: function(options) {
    this.deleted = false;
    this.type = options.type;
    this.listenTo(this.model, 'change:title sync', this.render);

    // if(this.model.tags) {
    //   this.listenTo(this.model.tags(), 'remove', this.removeStuff);
    // }
  },

  changePane: function(event) {
    event.preventDefault();

    if (this.deleted) {
      this.deleted = false;
      return;
    }
    var id = $(event.currentTarget).data('id');
    if (this.type === "notes") {
      Backbone.history.navigate('notes/' + id, {trigger: true});
    } else {
      this.model.fetch({
        success: function() {
          this.model.notes().sort();
          // debugger;
          this._swapPaneView(this.model.notes(), 'notes', this.model);
        }.bind(this)
      });
      this._swapPaneView(this.model.notes(), "notes", this.model);
    }
  },

  destroy: function(event) {
    event.preventDefault();
    this.deleted = true;
    this.model.destroy();

    if ($('strong.Message').length > 0) {
      $('strong.Message').remove();
    }

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
