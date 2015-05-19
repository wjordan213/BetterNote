BetterNote.Views.NoteForm = Backbone.CompositeView.extend({
  tagName: 'form',

  events: {
    'click .submit' : 'submit',
    'blur .main_input' : 'submit',
  },

  template: JST['primary_view/note_form'],

  initialize: function() {
    this.listenTo(BetterNote.notebooks, 'sync', this.render);
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.model.tags(), 'add', this.addTagButton);
  },

  addTagButton: function(tag) {
    var tagButton = new BetterNote.Views.TagButton({model: tag});
    this.addSubview('.allTags', tagButton);
  },

  render: function() {
    var content = this.template({note: this.model});
    this.$el.html(content);

    // BAD! needs fixing
    if (this.model.tags().length > 0) {
      var $tags = $('.allTags').toggleClass('inactive');
      this.model.tags().each(function(tag) {
        this.addTagButton(tag);
      }.bind(this))
    }

    this.addTagInputField();

    return this;
  },

  addTagInputField: function() {
    var addTag = new BetterNote.Views.AddTag({model: this.model});
    this.addSubview('.add_tags', addTag);
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

    // up to here everything looks good. query contains the right array

    var wasNew = this.model.isNew();

    this.model.save({}, {
      parse: true,
      success: function() {
        this.collection.add(this.model, { merge: true });
        BetterNote.notes.add(this.model, { merge: true });

        if (wasNew) {
          Backbone.history.navigate('notes/' + this.model.id + '/edit', {trigger: true});
        }
      }.bind(this),

      failure: function(response) {
        this.render();
      }.bind(this)
    })
  }
})
