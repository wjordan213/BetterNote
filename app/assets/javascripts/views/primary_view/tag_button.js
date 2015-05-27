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
		// debugger;
		this.model.notes().remove(this.note);
		if (this.model.notes().length === 0) {
			BetterNote.tags.remove(this.model);
		}

		// debugger;

		if (BetterNote._currentPane && BetterNote._currentPane.collection.tag && BetterNote._currentPane.collection.tag.get('updated_at') === this.model.get('updated_at')) {
			BetterNote._currentPane.collection.remove(this.note);
		}

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
