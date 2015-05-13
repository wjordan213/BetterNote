BetterNote.Routers.Router = Backbone.Router.extend({
  initialize: function(options) {
    this.$rootEl = options.$rootEl;
    this.$rootEl
    .append($('<section class="sidePane"></section>')) // this is iffy
    .$noteEl = this.$rootEl.append($('<section class="noteView"></section>')) // so is this

    this.$paneEl = this.$rootEl.find('.sidePane');
    this.$primaryEl = this.$rootEl.find('.noteView');
  },

  routes: {
    '' : 'notebookIndex',
    'notebooks/new': 'new'
  },

  notebookIndex: function() {
    var notebooksView = new BetterNote.Views.SidePane({ collection: BetterNote.notebooks, type: 'notebook' })
    BetterNote.notebooks.fetch();
    this._swapPaneView(notebooksView)
  },

  new: function() {
    var newNotebook = new BetterNote.Models.Notebook;
    var newNotebookView = new BetterNote.Views.NotebookForm({model: newNotebook})

    this._swapPrimaryView(newNotebookView);
  },

  _swapPrimaryView: function(view) {
    if (this._currentView) {
      this._currentView.remove();
    }
    this._currentView = view;
    this.$primaryEl.html(this._currentView.render().$el);
  }

  _swapPaneView: function(view) {
    if (this._currentPane) {
      this._currentPane.remove();
    }
    this._currentPane = view;
    this.$paneEl.html(this._currentPane.render().$el)
  }
})