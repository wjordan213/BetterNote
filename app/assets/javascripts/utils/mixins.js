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

  // fetch note if side pane type is notebooks

  submit: function(event) {
    event.preventDefault();
    var formData = this.$form.serializeJSON();
    var body = $('.main_input').html();
    var title = $('.title_input').html();
    if (!(event.target.tagName === "INPUT" && $(event.target).val() !== "")) {
      if ((($(event.target).html() === "") && this.model.isNew()) ||
          ($('div.title_input').html() === "") ||
                (formData.notebook_id == this.model.get('notebook_id') &&
                title === this.model.get('title') &&
                body.trim() === this.model.get('body').trim() &&
                !($(event.target).hasClass('tag_input')))) {
        return false;
      }
    }
    delete formData.tag;
    var notebook = BetterNote.notebooks.get(formData.notebook_id);

    if (BetterNote._currentPane.model) {
      this.collection = BetterNote._currentPane.model.notes();
    } else {
      this.collection = BetterNote.notebooks;
    }

    this.model.set(formData);
    this.model.set({body: body, tag_ids: [], title: title});

    this.model.tags().each(function(tag) {
      this.model.get('tag_ids').push(tag.get('id'));
    }.bind(this));

    var wasNew = this.model.isNew();
    this.model.save({}, {
      parse: true,
      success: function(response) {
        if (BetterNote.currentNotebook && BetterNote.currentNotebook.id === this.model.get('notebook_id')) {
          BetterNote.currentNotebook.fetch();
        }
        if (this.collection.url === this.model.urlRoot) {
          if ((this.collection.tag &&
            this.model.tags().models.some(function(tag) {
              return this.modelsEqual(this.collection.tag, tag);
            }.bind(this))) ||
              (wasNew && this.collection.notebook && this.model.notebook().get('updated_at') === this.collection.notebook.get('updated_at'))
            ) {
              debugger;
              this.collection.add(this.model, { merge: true });
          }

        }
        BetterNote.notes.add(this.model, { merge: true });

        if (!wasNew) {
          if ($('strong.Message').length > 0) {
            $('strong.Message').remove();
          }
          // debugger;
          this.collection.add(this.model, { merge: true });
          BetterNote._currentPane.removeAndInsert(this.model);
        }

        if (wasNew) {
          Backbone.history.navigate('notes/' + this.model.id, {trigger: true});
          $('section.noteView').prepend($('<strong class="Message">Note Created!</strong>'));
          $('div.main_input').dblclick();
        }
      }.bind(this),

      failure: function(response) {
        this.render();
      }.bind(this)
    });

    return true;
  }
};
