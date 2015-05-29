BetterNote.Views.AddTag = Backbone.View.extend(
	_.extend({}, BetterNote.Mixins.NoteSubmit, {
	template: JST['primary_view/add_tag'],
	events: {
		'click .new_tag' : 'tagInput',
		'keydown .tag_input' : 'justBlur',
		'blur .tag_input' : 'addTag'
	},

	initialize: function(options) {
		this.$form = options.$form;
	},

	justBlur: function(event) {
		var keyCode = event.keyCode || event.which;
		if (keyCode === 9) {
			event.preventDefault();
			$('input.tag_input').blur()
		}
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
			$('.tag_input').val('');
			this.toggleTagInput();
			return;
		}

		if (!this.model.tags().some(function(tag) {return tag.get('title') === tag_input; })) {
			newTag = new BetterNote.Models.Tag();
			newTag.set({title: tag_input});
			newTag.save({}, {
			success: function() {
				this.model.tags().add(newTag, {merge: true});
				BetterNote.tags.add(newTag, {merge: true});
				if (!this.model.isNew()) {

					this.submit.call(this, event);
					$('.tag_input').val('');
				}
			}.bind(this)
			});
		}
		this.toggleTagInput();
	},

	toggleTagInput: function() {
		$('.new_tag').toggleClass('inactive');
		$('.tag_input').toggleClass('inactive');
	}
}));
