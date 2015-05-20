BetterNote.Views.AddBody = Backbone.View.extend(
	_.extend({}, BetterNote.Mixins.NoteSubmit, {

	events: {
		'blur .main_input' : 'submit'
	},

	template: JST['primary_view/add_body'],

	initialize: function(options) {
		this.$form = options.$form;
	},

	render: function() {
		var content = this.template({note: this.model});
		this.$el.html(content);

		return this;
	}

}))
