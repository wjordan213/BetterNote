BetterNote.Views.NotebookForm = Backbone.View.extend({
  template: JST['primary_view/notebook_form'],

  initialize: function() {
    this.listenTo(this.model, 'sync', this.render);
  },

  events: {
    'submit form' : 'submitForm'
  },

  render: function() {
    var message;
    if (this.model.isNew()) {
      message = 'New'
    } else {
      message = 'Edit'
    }
    var content = this.template({notebook: this.model, message: message});

    this.$el.html(content);
    return this;
  },

  submitForm: function(event) {
    event.preventDefault();
    var formData = $(event.currentTarget).serializeJSON();
    this.model.set(formData);
    if (this.model.isNew()) {
      this.model.save({}, {
        success: function() {
          BetterNote.notebooks.add(this.model);
          this.remove();
        }.bind(this)
      });
    } else {
      this.model.save();
    }

    Backbone.history.navigate('', { trigger: true });
  }
})