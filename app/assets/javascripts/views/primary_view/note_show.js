BetterNote.Views.NoteShow = Backbone.View.extend({
  template: JST['primary_view/note_show'],

  initialize: function() {
    this.listenTo(this.model, 'sync', this.render)
  },

  render: function() {
    var content = this.template({note: this.model});
    this.$el.html(content);

    return this;
  }
})
