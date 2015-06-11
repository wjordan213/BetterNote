BetterNote.Views.AddTitle = Backbone.View.extend(
	_.extend({}, BetterNote.Mixins.NoteSubmit, {

	events: {
		'keydown div.title_input' : 'goToBody',
		'blur div.title_input' : 'submitAndToggle'
	},

	template: JST['primary_view/title_input_field'],

	initialize: function(options) {
		this.$form = options.$form;
	},

	goToBody: function(e) {
		var keyCode = e.keyCode || e.which;
		if (keyCode === 9) {
			if (!this.model.isNew()){
				e.preventDefault();
				$('div.main_input').dblclick();
			} else {
				e.preventDefault();
				$('div.main_input').dblclick();
			}
		}
	},

	submitAndToggle: function(event) {
		event.preventDefault();
		if ($(event.target).html() === "" || $('div.title_input').html() === "") {
			return false;
		}
		
		this.submit(event);
	},

	render: function() {
		var content = this.template({note: this.model});
		this.$el.html(content);

		return this;
	}

}));
