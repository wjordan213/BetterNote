BetterNote.Views.NoteForm = Backbone.CompositeView.extend({
  tagName: 'form',
  template: JST['primary_view/note_form'],

  events: {
    'dblclick .notebook' : 'sendToBody',
    'change .fileInp' : 'getFile'
  },

  initialize: function() {
    this.listenTo(this.model, 'change:title', this.renderNewTitleField);
    this.listenTo(this.model, 'change:notebook_id', this.renderNotebookOptions);
    this.listenTo(this.model, 'change:body', this.renderNewBodyField);
    this.listenTo(this.model.tags(), 'add', this.addTagButton);
    this.listenTo(this.model, 'destroy', this.removeAndReroute);
  },

  getFile: function(event) {
    console.log('file');
		var file = document.getElementsByClassName('fileInp')[0].files[0];
    var reader = new FileReader();
    // debugger;
		reader.onloadend = function() {
	    var image = reader.result;
	    this.model.set({image: image});
			// either have event listener for above change or callback to save;
      // debugger;
			this.model.save();
		}.bind(this);

		if (file) {
			console.log('it');
			reader.readAsDataURL(file);
			console.log('worked');
		} else {
			console.log('nope');
		}

  },


  removeAndReroute: function() {
    this.remove();
    Backbone.history.navigate("");
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
    this.model.tags().each(this.addTagButton.bind(this));
    return this;
  },

  renderNotebookOptions: function() {
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
