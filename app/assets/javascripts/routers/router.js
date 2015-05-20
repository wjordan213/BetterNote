BetterNote.Routers.Router = Backbone.Router.extend({
  initialize: function(options) {
    BetterNote.notes.fetch();
    this.$rootEl = options.$rootEl;
    this.$rootEl
    .$noteEl = this.$rootEl.append($('<section class="noteView"></section>')) // so is this

    this.$paneEl = this.$rootEl.find('.sidePane');
    this.$primaryEl = this.$rootEl.find('.noteView');
  },

  routes: {
    'notebooks/new': 'newNotebook',
    'notebooks/:id/edit': 'notebookEdit',
    'notebooks/:notebook_id/notes/new' : 'new',
    'notes/new' : 'new',
    'notes/:id' : 'show',
    'notes/:id/edit' : 'edit'
  },

  notebookEdit: function(id) {
    var notebook = BetterNote.notebooks.getOrFetch(id);
    var editNotebookView = new BetterNote.Views.NotebookForm({model: notebook})
    notebook.fetch();

    this._swapPrimaryView(editNotebookView);
  },

  newNotebook: function() {
    var newNotebook = new BetterNote.Models.Notebook;
    var newNotebookView = new BetterNote.Views.NotebookForm({model: newNotebook})

    this._swapPrimaryView(newNotebookView);
  },

  new: function(notebook_id) {
    if (BetterNote.notebooks.length === 0) {
      Backbone.history.navigate('notebooks/new', {trigger: true})
    } else {
      var newNote = new BetterNote.Models.Note();

      if (notebook_id) {
        newNote.set({notebook_id: notebook_id})
      }
      var newNoteView = new BetterNote.Views.NoteForm({model: newNote});

      this._swapPrimaryView(newNoteView);
    }
  },

  edit: function(id){
    var note = BetterNote.notes.getOrFetch(id);

    var editNoteView = new BetterNote.Views.NoteForm({model: note});

    this._swapPrimaryView(editNoteView);
  },

  show: function(id) {
    var note = BetterNote.notes.getOrFetch(id);
    var noteShow = new BetterNote.Views.NoteShow({model: note});

    this._swapPrimaryView(noteShow);
  },

  _swapPrimaryView: function(view) {
    if (this._currentView) {
      this._currentView.remove();
    }
    this._currentView = view;
    this.$primaryEl.html(this._currentView.render().$el);
  }
})
