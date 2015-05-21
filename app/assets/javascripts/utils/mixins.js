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
    // debugger;
    var formData = this.$form.serializeJSON();

    delete formData.tag;
    var notebook = BetterNote.notebooks.get(formData.notebook_id);

    this.collection = notebook.notes();
    // debugger;
    this.model.set(formData);
    // debugger;
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


    this.model.save({}, {
      parse: true,
      success: function(response) {

        this.collection.add(this.model, { merge: true });
        BetterNote.notes.add(this.model, { merge: true });

        if (!wasNew) {
          // debugger;
          BetterNote._currentPane.removeAndInsert(this.model);
        }


        if (wasNew) {
          Backbone.history.navigate('notes/' + this.model.id + '/edit', {trigger: true});
          $('.main_input').focus()
        } else {
          // sort the collection?
        }
      }.bind(this),

      failure: function(response) {
        this.render();
      }.bind(this)
    })
  }
}
