BetterNote.Views.SideContent = Backbone.View.extend({
  tagName: 'li',
  template: JST["side_pane/side_pane_content"],
  render: function() {
    var content = this.template({content: this.model});
    this.$el.html(content);
    return this;
  }
})
