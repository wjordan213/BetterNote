BetterNote.Views.AddBody = Backbone.View.extend(
	_.extend({}, BetterNote.Mixins.NoteSubmit, {

	events: {
		'keydown .main_input' : 'justBlur',
		'blur div.main_input' : 'submitAndToggle',
		'dblclick div.main_input' : 'toggleEditable',
		'change .fileInp' : 'getFile'
	},

	template: JST['primary_view/add_body'],

	initialize: function(options) {
		this.$el.addClass('addBody');
		this.$form = options.$form;
		if (this.model.isNew()) {
			this.state = true;
		} else {
			this.state = false;
		}
	},

	getFile: function(event) {
		var file = document.getElementsByClassName('fileInp')[0].files[0];
		var reader = new FileReader();
		reader.onloadend = function() {
			var image = reader.result;
			this.model.set({image: image});
			debugger;
			this.model.save({}, {
				success: function() {
					this.$('.main_input').append("<img src=" + this.model.get('image_url') + ">");
				}.bind(this),
				error: function() {
					console.log('this is weird');
				},
				failure: function() {
					console.log('happened');
				}
			});
		}.bind(this);

		if (file) {
			reader.readAsDataURL(file);
		}
	},

	submitAndToggle: function(event) {
		var data = $('div.main_input').val();
		if (this.model.isNew()) {
			this.model.set({body: data}, {silent: true});
			this.render();
		}
		if (!this.submit(event)) {
			this.toggleEditable(event);
		}
	},

	justBlur: function(event) {
		var keyCode = event.keyCode || event.which;
		if (keyCode === 9) {
			event.preventDefault();
			this.$('div.main_input').blur();
		}
	},

	toggleState: function() {
		if (this.state === "p") {
			this.state = true;
		} else{
			this.state = false;
		}
	},

	toggleEditable: function(event) {
		var $div = this.$('.main_input');
		$div.prop('contenteditable', !!$div.prop('contenteditable'));

		this.toggleState();

		if (this.state === true) {
			input = $('div.main_input').focus();
		}
	},


	render: function() {
		var content = this.template({note: this.model});
		this.$el.html(content);

		return this;
	}

}));
