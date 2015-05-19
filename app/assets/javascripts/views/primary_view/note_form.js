BetterNote.Views.NoteForm = Backbone.CompositeView.extend({
  tagName: 'form',

  events: {
    'click .submit' : 'submit',
    'click .new_tag' : 'tagInput',
    'blur input' : 'submit',
    'blur textarea' : 'submit'
    // 'blur .tag_input' : 'addTag'
  },

  template: JST['primary_view/note_form'],

  initialize: function() {
    this.listenTo(BetterNote.notebooks, 'sync', this.render)
    this.listenTo(this.model, 'sync', this.render);
  },

  render: function() {
    var content = this.template({note: this.model});
    // debugger;
    this.$el.html(content);
    return this;
  },

  tagInput: function(event) {
    event.preventDefault();
    this.toggleTagInput();
    $('.tag_input').focus();
  },

  addTag: function(event) {
    var tag_input = $('.tag_input').val();
    this.toggleTagInput();
    if ($.trim(tag_input).length === 0)  {
      return;
    }
    var newTag = new BetterNote.Models.Tag();
    newTag.set({title: tag_input});
    return newTag;
    // this has gotten up to tag model formation
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
