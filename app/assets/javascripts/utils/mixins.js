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

BetterNote.Mixins.NoteSubmit = {
  submit: function(event) {
    var formData = this.$form.serializeJSON();
    if (($(event.target).val() === "") || ($('input.title_input').val() === "") || (formData.title === this.model.get('title') && formData.body === this.model.get('body') && !($(event.target).hasClass('tag_input')))) {
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
    this.model.set({tag_ids: []});



    this.model.tags().each(function(tag) {
      this.model.get('tag_ids').push(tag.get('id'));
    }.bind(this))

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
          Backbone.history.navigate('notes/' + this.model.id, {trigger: true});

          $('p.main_input').dblclick()
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
