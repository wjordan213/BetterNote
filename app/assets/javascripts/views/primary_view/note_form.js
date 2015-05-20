BetterNote.Views.NoteForm = Backbone.CompositeView.extend({
  tagName: 'form',



  events: {
    // 'blur .main_input' : 'submit',
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
    this.addTitleInputField();

    return this;
  },

  addTitleInputField: function() {
    var addTitle = new BetterNote.Views.AddTitle({model: this.model, $form: this.$el, collection: this.collection });
    this.addSubview('.note_input', addTitle);
  },

  addTagInputField: function() {
    var addTag = new BetterNote.Views.AddTag({model: this.model});
    this.addSubview('.add_tags', addTag);
  }
})
