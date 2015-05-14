BetterNote.Mixins.PaneChanger = {
  _swapPaneView: function(view) {
    if (BetterNote._currentPane) {
      BetterNote._currentPane.remove();
    }
    BetterNote._currentPane = view;
    this.$paneEl.html(BetterNote._currentPane.render().$el)
  }
}
