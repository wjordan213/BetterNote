BetterNote.Views.AddTitle = Backbone.View.extend(
	_.extend({}, BetterNote.Mixins.NoteSubmit, {

	events: {
		'blur .title_input' : 'submit'
	},

	template: JST['primary_view/title_input_field'],

	initialize: function(options) {
		this.$form = options.$form;
	},

	render: function() {
		var content = this.template({note: this.model});
		this.$el.html(content);

		return this;
	}

}))
