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
    // debugger;
    // check if the target is a nonempty tag input
    if (formData.title === this.model.get('title') && formData.body === this.model.get('body') && !($(event.target).hasClass('tag_input') && $(event.target).val().length > 0)) {
      return false;
    }

    delete formData.tag;
    var notebook = BetterNote.notebooks.get(formData.notebook_id);

    if (BetterNote._currentPane.model) {
      this.collection = BetterNote._currentPane.model.notes();
      BetterNote._currentPane.model;
    } else {
      this.collection = BetterNote.notebooks;
    }


    this.model.set(formData);
    // if (this.model.get('title') === "") {
    //   // remove tags from collection and delete from database
    //   // this.removeAndDestroyTags(this.model);
    //   return;
    // }

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

    return true;
  }
}
