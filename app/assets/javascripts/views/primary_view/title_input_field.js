BetterNote.Views.AddTitle = Backbone.View.extend({

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
	},

	submit: function(event) {
		event.preventDefault();
		var formData = this.$form.serializeJSON();
		// debugger
		delete formData.tag;
		var notebook = BetterNote.notebooks.get(formData.notebook_id);

		this.collection = notebook.notes();
		this.model.set(formData);
		if (this.model.get('title') === "") {
			return;
		}

		// iterate through this.model.tags(), creating tag_ids
		this.model.set({tag_ids: []});



		this.model.tags().each(function(tag) {
			this.model.get('tag_ids').push(tag.get('id'));
		}.bind(this))

		// up to here everything looks good. query contains the right array

		var wasNew = this.model.isNew();

		this.model.save({}, {
			parse: true,
			success: function() {
				this.collection.add(this.model, { merge: true });
				BetterNote.notes.add(this.model, { merge: true });



				if (wasNew) {
					Backbone.history.navigate('notes/' + this.model.id + '/edit', {trigger: true});
					$('.main_input').focus()
				}
			}.bind(this),

			failure: function(response) {
				this.render();
			}.bind(this)
		})
	}
})
