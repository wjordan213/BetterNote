BetterNote.Views.AddNotebook = Backbone.View.extend(
	_.extend({}, BetterNote.Mixins.NoteSubmit, {

		template: JST['primary_view/add_notebook'],

		events: {
			'change .notebook' : 'submit'
		},

		initialize: function(options) {
			this.$form = options.$form;
		},

		render: function() {
			var content = this.template({note: this.model});
			this.$el.html(content);

			return this;
		}
}));
