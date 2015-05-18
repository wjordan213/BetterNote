BetterNote.Mixins.PaneChanger = {




  _swapPaneView: function(collection, type) {
    collection.fetch();
    var sidePane = BetterNote.sidePane = new BetterNote.Views.SidePane({type: type, collection: collection});

    if (BetterNote._currentPane) {
      BetterNote._currentPane.remove();
    }
    BetterNote._currentPane = sidePane;
    $('.sidePane').html(BetterNote._currentPane.render().$el)
  }
}
