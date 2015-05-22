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
		if (this.model.isNew()) {
			this.state = "textarea";
		} else {
			this.state = "p";
		}
	},

	submitAndToggle: function(event) {
		var data = $('textarea.main_input').val();
		if (this.model.isNew()) {
			this.model.set({body: data}, {silent: true});
			this.render();
		}
		if (!this.submit(event)) {
			this.toggleInactive(event);
		}
	},

	justBlur: function(event) {
		var keyCode = event.keyCode || event.which;
		if (keyCode === 9) {
			event.preventDefault();
			this.$('textarea.main_input').blur();
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
		// debugger;
		this.$('.main_input').toggleClass("inactive");
		this.toggleState();
		if (this.state === "textarea") {
			input = $('textarea.main_input').focus();
			// debugger;
		}
		// debugger;
	},


	render: function() {
		var content = this.template({note: this.model});
		this.$el.html(content);

		return this;
	}

}));
