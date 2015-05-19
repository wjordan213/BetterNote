BetterNote.Views.NoteForm = Backbone.CompositeView.extend({
  tagName: 'form',

  events: {
    'click .submit' : 'submit',
    'click .new_tag' : 'tagInput',
    // 'blur input' : 'submit',
    // 'blur textarea' : 'submit',
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
    var tag_input = $('.tag_input').val();
    $('.tag_input').val('');

    this.toggleTagInput();
    if ($.trim(tag_input).length === 0)  {
      return;
    }
    // here we've got a title that's got a length greater than 0
    // debugger;
    if (!this.model.tags().some(function(tag) {return tag.get('title') === tag_input })) {
      var newTag = new BetterNote.Models.Tag();
      newTag.set({title: tag_input});
      this.model.tags().add(newTag);
    }
  },


  toggleTagInput: function() {
    $('.new_tag').toggleClass('inactive');
    $('.tag_input').toggleClass('inactive');
  },

  submit: function(event) {
    event.preventDefault();
    var formData = $(this.$el).serializeJSON();


    var notebook = BetterNote.notebooks.get(formData.notebook_id);

    this.collection = notebook.notes();
    this.model.set(formData);
    if (this.model.get('title') === "") {
      return;
    }

    // debugger;

    // if the event target is the tag input, construct it to a new tag and add tag button with it to view. also do this

  //   $.post( '/api/notes', { note: formData, tag: tagData }, function( resp ) {
  // else
  //   $.post( '/api/notes', { note: formData}, function( resp ) {
  // console.log( resp );
  // on save notebook notes and betternote notes both need this model saved.
  // maybe I could set the model with the response?
    this.model.save({}, {
      success: function() {
        this.collection.add(this.model, { merge: true });
        BetterNote.notes.add(this.model, { merge: true });
        // Backbone.history.navigate('notes/' + this.model.id, {trigger: true});

      }.bind(this),

      failure: function(response) {
        this.render();
      }.bind(this)
    })
  }
})
