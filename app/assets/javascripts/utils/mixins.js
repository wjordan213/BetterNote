BetterNote.Mixins.PaneChanger = {




  _swapPaneView: function(collection, type, model) {
    // collection.fetch();
    console.log("========================")
    console.log(collection);
    console.log(type);
    console.log(model);
    console.log("========================")
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
