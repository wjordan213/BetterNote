BetterNote.Views.NoteForm = Backbone.CompositeView.extend({
  tagName: 'form',
  template: JST['primary_view/note_form'],

  events: {
    'dblclick .notebook' : 'sendToBody'
  },

  initialize: function() {
    this.listenTo(this.model, 'change:title', this.renderNewTitleField);
    this.listenTo(this.model, 'change:notebook_id', this.renderNotebookOptions);
    this.listenTo(this.model, 'change:body', this.renderNewBodyField);
    this.listenTo(this.model.tags(), 'add', this.addTagButton);
  },

  sendToBody: function() {
    $('.main_input').focus();
  },

  addTagButton: function(tag) {
    var tagButton = new BetterNote.Views.TagButton({model: tag, note: this.model});
    this.addSubview('.allTags', tagButton);
  },

  render: function() {
    var content = this.template({note: this.model});
    this.$el.html(content);
    this.addNotebookInputField();
    this.addTagInputField();
    this.addTitleInputField();
    this.addBodyInputField();

    return this;
  },

  renderNotebookOptions: function() {
    console.log('yup');
    this._notebookInput.remove();
    this.addNotebookInputField();
  },

  renderNewTitleField: function() {
    this._titleInput.remove();
    this.addTitleInputField();
  },

  renderNewBodyField: function() {
    this._bodyInput.remove();
    this.addBodyInputField();
  },

  addNotebookInputField: function() {
    this._notebookInput = new BetterNote.Views.AddNotebook({model: this.model, $form: this.$el, collection: this.collection });
    this.addSubview('.notebooks', this._notebookInput, true);
  },

  addTitleInputField: function() {
    this._titleInput = new BetterNote.Views.AddTitle({model: this.model, $form: this.$el, collection: this.collection });
    this.addSubview('.note_input', this._titleInput, true);
  },

  addBodyInputField: function() {
    this._bodyInput = new BetterNote.Views.AddBody({model: this.model, $form: this.$el, collection: this.collection });
    this.addSubview('.note_input', this._bodyInput);
  },

  addTagInputField: function() {
    var addTag = new BetterNote.Views.AddTag({model: this.model, $form: this.$el, collection: this.collection });
    this.addSubview('.add_tags', addTag);
  }
})
