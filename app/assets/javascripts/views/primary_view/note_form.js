BetterNote.Views.NoteForm = Backbone.View.extend({
  tagName: 'form',

  events: {
    'click .submit' : 'submit'
  },

  template: JST['primary_view/note_form'],

  initialize: function() {

    this.listenTo(this.model, 'sync', this.render);
  },

  render: function() {
    var content = this.template({note: this.model});
    // debugger;
    this.$el.html(content);
    return this;
  },

  submit: function(event) {
    event.preventDefault();
    var formData = $(this.$el).serializeJSON();
    var notebook = BetterNote.notebooks.get(formData.notebook_id);
    this.collection = notebook.notes();
    this.model.set(formData);

    this.model.save({}, {
      success: function() {
        this.collection.add(this.model, { merge: true });
        BetterNote.notes.add(this.model, {merge: true });
        Backbone.history.navigate('notes/' + this.model.id, {trigger: true});
      }.bind(this),

      failure: function(response) {
        this.render();
      }.bind(this)
    })
  }
})
