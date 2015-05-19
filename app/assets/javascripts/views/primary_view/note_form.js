BetterNote.Views.NoteForm = Backbone.CompositeView.extend({
  tagName: 'form',

  events: {
    'click .submit' : 'submit',
    'click .new_tag' : 'tagInput',
    'blur .main_input' : 'submit',
    'blur .tag_input' : 'addTag'
  },

  template: JST['primary_view/note_form'],

  initialize: function() {
    this.listenTo(BetterNote.notebooks, 'sync', this.render)
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.model.tags(), 'add', this.render);
  },

  render: function() {
    var content = this.template({note: this.model});
    // debugger;
    this.$el.html(content);
    if (this.model.tags().length > 0) {
      var $tags = $('.allTags').toggleClass('inactive');
      this.model.tags().each(function(tag) {
        var newTag = $('<li>');
        newTag.html(tag.get('title')).addClass('tag');
        $tags.append(newTag);
      })
    }
    return this;
  },

  tagInput: function(event) {
    event.preventDefault();
    this.toggleTagInput();
    $('.tag_input').focus();
  },

  addTag: function(event) {
    var newTag;
    var tag_input = $('.tag_input').val();
    $('.tag_input').val('');

    this.toggleTagInput();
    if ($.trim(tag_input).length === 0)  {
      return;
    }
    // here we've got a title that's got a length greater than 0
    // debugger;
    if (!this.model.tags().some(function(tag) {return tag.get('title') === tag_input })) {
      newTag = new BetterNote.Models.Tag();
      newTag.set({title: tag_input});
      this.model.tags().add(newTag);
      var something = newTag;
      newTag.save();
    }

  },


  toggleTagInput: function() {
    $('.new_tag').toggleClass('inactive');
    $('.tag_input').toggleClass('inactive');
  },

  submit: function(event) {
    event.preventDefault();
    var formData = $(this.$el).serializeJSON();
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

    this.model.save({}, {
      success: function() {
        this.collection.add(this.model, { merge: true });
        BetterNote.notes.add(this.model, { merge: true });
        Backbone.history.navigate('notes/' + this.model.id + '/edit', {trigger: true});

      }.bind(this),

      failure: function(response) {
        this.render();
      }.bind(this)
    })
  }
})
