BetterNote.Routers.Router = Backbone.Router.extend({
  initialize: function(options) {
    this.$rootEl = options.$rootEl;
    this.$rootEl
    .append($('<section class="sidePane"></section>')) // this is iffy
    .$noteEl = this.$rootEl.append($('<section class="noteView"></section>')) // so is this

    this.$paneEl = this.$rootEl.find('.sidePane');
    this.$noteEl = this.$rootEl.find('.noteView');
  },

  routes: {
    '' : 'notebookIndex'
  },

  notebookIndex: function() {
    var notebooksView = new BetterNote.Views.SidePane({ collection: BetterNote.notebooks, type: 'Notebooks' })
    BetterNote.notebooks.fetch();
    this._swapPaneView(notebooksView)
  },

  _swapPaneView: function(view) {
    if (this._currentPane) {
      this._currentPane.remove();
    }
    this._currentPane = view;
    this.$paneEl.html(this._currentPane.render().$el)
  }
})
