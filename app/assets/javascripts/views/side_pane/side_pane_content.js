BetterNote.Views.SideContent = Backbone.View.extend({
  tagName: 'li',
  template: JST["side_pane/side_pane_content"],

  events: {
    'click .edit' : 'edit',
    'click .delete' : 'destroy'
  },

  initialize: function() {
    this.listenTo(this.model, 'change:title', this.render);
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
