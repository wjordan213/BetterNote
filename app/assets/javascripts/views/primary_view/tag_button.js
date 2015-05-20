BetterNote.Views.TagButton = Backbone.View.extend({
	tagName: 'li',
	template: JST['primary_view/tag_button'],

	events: {
		'click .remove' : 'removeTag'
	},

	initialize: function(options) {
		this.note = options.note;
	},

	removeTag: function(event) {
		event.preventDefault();
		this.model.destroy({data: { note_id: this.note.get('id') }, processData: true});
		this.remove();
	},

	render: function() {
		var content = this.template({title: this.model.get('title')});
		this.$el.html(content);
		this.$el.addClass('tag');
		return this;
	}
})
