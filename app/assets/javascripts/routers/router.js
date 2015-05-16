BetterNote.Routers.Router = Backbone.Router.extend({
  initialize: function(options) {
    BetterNote.notebooks.fetch();
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
    'notes/:id' : 'show'
  },

  notebookEdit: function(id) {
    var notebook = BetterNote.notebooks.getOrFetch(id);
    var editNotebookView = new BetterNote.Views.NotebookForm({model: notebook})

    this._swapPrimaryView(editNotebookView);
  },

  newNotebook: function() {
    var newNotebook = new BetterNote.Models.Notebook;
    var newNotebookView = new BetterNote.Views.NotebookForm({model: newNotebook})

    this._swapPrimaryView(newNotebookView);
  },

  new: function(notebook_id) {
    var newNote = new BetterNote.Models.Note();

    if (notebook_id) {
      newNote.set({notebook_id: notebook_id}) 
    }
    var newNoteView = new BetterNote.Views.NoteForm({model: newNote});

    this._swapPrimaryView(newNoteView);
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
