BetterNote.Views.AddTitle = Backbone.View.extend(
	_.extend({}, BetterNote.Mixins.NoteSubmit, {

	events: {
		'keydown input.title_input' : 'goToBody',
		'blur input.title_input' : 'submitAndToggle',
		'dblclick h1.title_input' : 'toggleInactive'
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
				// trigger custom event on model.
				$('p.main_input').dblclick();
			} else {
				e.preventDefault();
				$('p.main_input').dblclick();
			}
		}
	},

	submitAndToggle: function(event) {
		if ($(event.target).val() === "" || $('input.title').val() === "") {
			return false;
		}
		if (!this.submit(event)) {
			this.toggleInactive(event);
		} else {
			$('p.main_input').dblclick();
		}

	},

	toggleState: function() {
		if (this.state === "h1") {
			this.state = "input";
		} else{
			this.state = "h1";
		}
	},

	toggleInactive: function(event) {
		$('.title_input').each(function(el) {
			$($('.title_input')[el]).toggleClass("inactive");
		});
		this.toggleState();
		if (this.state === "input") {
			input = $('input.title_input').focus();
			var tmpStr = input.val();
			input.val('');
			input.val(tmpStr);
		}
	},

	render: function() {
		var content = this.template({note: this.model});
		this.$el.html(content);

		if (this.model.isNew()) {
			this.state = 'input';
			this.toggleInactive();
		} else {
			this.state = 'h1';
		}


		return this;
	}

}))
