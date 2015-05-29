BetterNote.Mixins.PaneChanger = {
  _swapPaneView: function(collection, type, model) {
    var sidePane;
    if (model) {
      sidePane = new BetterNote.Views.SidePane({type: type, collection:  collection, model: model});
    } else {
      sidePane = new BetterNote.Views.SidePane({type: type, collection: collection});
    }
    if (BetterNote._currentPane) {
      BetterNote._currentPane.remove();
    }
    BetterNote._currentPane = sidePane;
    $('.sidePane').html(BetterNote._currentPane.render().$el);
  }
};

BetterNote.Mixins.NoteSubmit = {
  modelsEqual: function(mod1, mod2) {
    if (mod1.get('updated_at') === undefined || mod2.get('updated_at') === undefined) {
      return false;
    }
    return (mod1.get('updated_at') === mod2.get('updated_at'));
  },

  submit: function(event) {
    var formData = this.$form.serializeJSON();

    if ((($(event.target).html() === "") && this.model.isNew()) ||
        ($('input.title_input').val() === "") ||
              (formData.notebook_id == this.model.get('notebook_id') &&
              formData.title === this.model.get('title') &&
              formData.body === this.model.get('body') &&
              !($(event.target).hasClass('tag_input')))) {
      return false;
    }

    delete formData.tag;
    var notebook = BetterNote.notebooks.get(formData.notebook_id);

    if (BetterNote._currentPane.model) {
      this.collection = BetterNote._currentPane.model.notes();
    } else {
      this.collection = BetterNote.notebooks;
    }

    this.model.set(formData);
    this.model.set({body: this.$('.main_input').html()})
    this.model.set({tag_ids: []});



    this.model.tags().each(function(tag) {
      this.model.get('tag_ids').push(tag.get('id'));
    }.bind(this));

    var wasNew = this.model.isNew();
    this.model.save({}, {
      parse: true,
      success: function(response) {
        if (this.collection.url === this.model.urlRoot) {

          if ((this.collection.tag &&
            this.model.tags().models.some(function(tag) {
              return this.modelsEqual(this.collection.tag, tag);
            }.bind(this))) ||
              (wasNew && this.collection.notebook && this.model.notebook().get('updated_at') === this.collection.notebook.get('updated_at'))
            ) {
              this.collection.add(this.model, { merge: true });
          }

        }
        BetterNote.notes.add(this.model, { merge: true });

        if (!wasNew) {
          BetterNote._currentPane.removeAndInsert(this.model);
        }

        if (wasNew) {
          Backbone.history.navigate('notes/' + this.model.id, {trigger: true});

          $('p.main_input').dblclick();
        } else {
          // sort the collection?
        }
      }.bind(this),

      failure: function(response) {
        this.render();
      }.bind(this)
    });

    return true;
  }
};
