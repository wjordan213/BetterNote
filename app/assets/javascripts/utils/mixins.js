BetterNote.Mixins.PaneChanger = {




  _swapPaneView: function(collection, type, model) {
    if (model) {
      var sidePane = new BetterNote.Views.SidePane({type: type, collection:  collection, model: model});
    } else {
      var sidePane = new BetterNote.Views.SidePane({type: type, collection: collection});
    }
    if (BetterNote._currentPane) {
      BetterNote._currentPane.remove();
    }
    BetterNote._currentPane = sidePane;
    $('.sidePane').html(BetterNote._currentPane.render().$el)
  }
}
