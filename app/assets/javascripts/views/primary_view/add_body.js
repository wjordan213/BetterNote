BetterNote.Views.AddBody = Backbone.View.extend(
	_.extend({}, BetterNote.Mixins.NoteSubmit, {

	events: {
		'keydown .main_input' : 'justBlur',
		'blur textarea.main_input' : 'submitAndToggle',
		'dblclick p.main_input' : 'toggleInactive'
	},

	template: JST['primary_view/add_body'],

	initialize: function(options) {
		this.$form = options.$form;
		this.state = "p";
	},

	submitAndToggle: function(event) {
		if (!this.submit(event)) {
			this.toggleInactive(event);
		}
	},

	justBlur(event) {
		var keyCode = event.keyCode || event.which;
		if (keyCode === 9) {
			event.preventDefault();
			$('textarea.main_input').blur()
		}
	},

	toggleState: function() {
		if (this.state === "p") {
			this.state = "textarea";
		} else{
			this.state = "p";
		}
	},

	toggleInactive: function(event) {
		$('.main_input').each(function(el) {
			$($('.main_input')[el]).toggleClass("inactive");
		});
		this.toggleState();
		if (this.state === "textarea") {
			input = $('textarea.main_input').focus();
		}
	},


	render: function() {
		var content = this.template({note: this.model});
		this.$el.html(content);

		return this;
	}

}))
