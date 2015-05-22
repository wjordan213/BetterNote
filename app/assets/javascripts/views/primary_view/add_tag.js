BetterNote.Views.AddTag = Backbone.View.extend(
	_.extend({}, BetterNote.Mixins.NoteSubmit, {
	template: JST['primary_view/add_tag'],
	events: {
		'click .new_tag' : 'tagInput',
		'blur .tag_input' : 'addTag'
	},

	initialize: function(options) {
		this.$form = options.$form;
	},

	render: function() {
		var content = this.template();
		this.$el.html(content);

		return this;
	},

	tagInput: function(event) {
    event.preventDefault();
    this.toggleTagInput();
    $('.tag_input').focus();
  },

	addTag: function(event) {
		var newTag;
		var tag_input = $('.tag_input').val();

		if ($.trim(tag_input).length === 0)  {
			return;
		}

		// 	LEFT OFF OVER HERE

		if (!this.model.tags().some(function(tag) {return tag.get('title') === tag_input })) {
			newTag = new BetterNote.Models.Tag();
			newTag.set({title: tag_input});
			this.model.tags().add(newTag);
			BetterNote.tags.add(newTag);

			newTag.save({}, {
			success: function() {
					if (!this.model.isNew()) {

						this.submit.call(this, event);
						$('.tag_input').val('');
				}
			}.bind(this)
			});
		}
		this.toggleTagInput();
		// this.submit(event);
	},

	toggleTagInput: function() {
		$('.new_tag').toggleClass('inactive');
		$('.tag_input').toggleClass('inactive');
	}
}))
