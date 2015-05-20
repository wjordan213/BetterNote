BetterNote.Views.NotebookForm = Backbone.View.extend(
  _.extend({}, BetterNote.Mixins.PaneChanger, {

  template: JST['primary_view/notebook_form'],

  initialize: function() {
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.model, 'destroy', this.remove);
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
    // debugger;
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
      this.remove();
    }


    var notebookShow = new BetterNote.Views.SidePane({ collection: this.model.notes(), type: "notes", model: this.model });
    this._swapPaneView(this.model.notes(), 'notes', this.model);

    Backbone.history.navigate('', { trigger: true });
  }
}))
