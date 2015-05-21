BetterNote.Mixins.PaneChanger = {
  _swapPaneView: function(collection, type, model) {
    // debugger;
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

BetterNote.Mixins.NoteSubmit = {
  submit: function(event) {

    var formData = this.$form.serializeJSON();

    delete formData.tag;
    var notebook = BetterNote.notebooks.get(formData.notebook_id);

    this.collection = notebook.notes();
    this.model.set(formData);
    if (this.model.get('title') === "") {
      return;
    }

    // iterate through this.model.tags(), creating tag_ids
    this.model.set({tag_ids: []});



    this.model.tags().each(function(tag) {
      this.model.get('tag_ids').push(tag.get('id'));
    }.bind(this))

    // up to here everything looks good. query contains the right array

    var wasNew = this.model.isNew();

    // if (!wasNew) {
    //   console.log('called');
    //   BetterNote._currentPane.removeAndInsert(this.model);
    // }

    this.model.save({}, {
      parse: true,
      success: function(response) {



        if (wasNew) {
          this.collection.add(this.model, { merge: true });
          BetterNote.notes.add(this.model, { merge: true });
          Backbone.history.navigate('notes/' + this.model.id + '/edit', {trigger: true});
          $('.main_input').focus()
        }
      }.bind(this),

      failure: function(response) {
        this.render();
      }.bind(this)
    })
  }
}
