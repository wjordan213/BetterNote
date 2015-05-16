BetterNote.Routers.Router = Backbone.Router.extend({
  initialize: function(options) {
    this.$rootEl = options.$rootEl;
    this.$rootEl
    .$noteEl = this.$rootEl.append($('<section class="noteView"></section>')) // so is this

    this.$paneEl = this.$rootEl.find('.sidePane');
    this.$primaryEl = this.$rootEl.find('.noteView');
  },

  routes: {
    'notebooks/new': 'newNotebook',
    'notebooks/:id/edit': 'notebookEdit',
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
