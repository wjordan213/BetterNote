BetterNote.Routers.Router = Backbone.Router.extend({
  initialize: function(options) {
    BetterNote.notes.fetch();
    this.$rootEl = options.$rootEl;
    this.$rootEl
    .$noteEl = this.$rootEl.append($('<section class="noteView"></section>')); // so is this

    this.$paneEl = this.$rootEl.find('.sidePane');
    this.$primaryEl = this.$rootEl.find('.noteView');
  },

  routes: {
    'notebooks/new': 'newNotebook',
    'notebooks/:id/edit': 'notebookEdit',
    'notebooks/:notebook_id/notes/new' : 'new',
    'notes/new' : 'new',
    'notes/:id' : 'edit',
    'search' : 'search'
  },

  search: function() {
    var searchPane = new BetterNote.Views.SearchPane();
    if (BetterNote._currentPane) {
      BetterNote._currentPane.remove();
    }
    BetterNote._currentPane = searchPane;
    $('.sidePane').html(BetterNote._currentPane.render().$el);
  },

  notebookEdit: function(id) {
    var notebook = BetterNote.notebooks.getOrFetch(id);
    var editNotebookView = new BetterNote.Views.NotebookForm({model: notebook});
    notebook.fetch();

    this._swapPrimaryView(editNotebookView);
  },

  newNotebook: function() {
    var newNotebook = new BetterNote.Models.Notebook();
    var newNotebookView = new BetterNote.Views.NotebookForm({model: newNotebook});

    this._swapPrimaryView(newNotebookView);
  },

  new: function(notebook_id) {
    if (BetterNote.notebooks.length === 0) {
      Backbone.history.navigate('notebooks/new', {trigger: true});
    } else {
      var newNote = new BetterNote.Models.Note();

      if (notebook_id) {
        newNote.set({notebook_id: notebook_id});
      }
      var newNoteView = new BetterNote.Views.NoteForm({model: newNote});

      this._swapPrimaryView(newNoteView);

      if (newNoteView.model.isNew()) {
        newNoteView._titleInput.state = 'input';
        newNoteView._bodyInput.state = true;
        // debugger;
        newNoteView._bodyInput.toggleEditable();
        newNoteView._titleInput.toggleInactive();
        $('input.title_input').focus();
      } else {
        newNoteView._titleInput.state = 'h1';
      }
    }
  },

  edit: function(id){
    var note = BetterNote.notes.getOrFetch(id);
    var editNoteView = new BetterNote.Views.NoteForm({model: note});

    this._swapPrimaryView(editNoteView);
  },

  _swapPrimaryView: function(view) {
    if (this._currentView) {
      this._currentView.remove();
    }
    this._currentView = view;
    this.$primaryEl.html(this._currentView.render().$el);
  }
});
