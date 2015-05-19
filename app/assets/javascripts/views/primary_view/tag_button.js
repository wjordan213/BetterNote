BetterNote.Views.TagButton = Backbone.View.extend({
	tagName: 'li',
	template: JST['primary_view/tag_button'],
	render: function() {
		var content = this.template({title: this.model.get('title')});
		this.$el.html(content);
		this.$el.addClass('tag');
		return this;
	}
})
