BetterNote.Collections.Tags = Backbone.Collection.extend({
  url: '/api/tags',
  model: BetterNote.Models.Tag,

  getOrFetch: function(id) {
    var tag = this.get(id);

    if (tag) {
      tag.fetch();
    } else {
      tag = new BetterNote.Models.Tag({id: id});
      tag.fetch({
        success: function() {
          this.add(tag);
        }.bind(this)
      })
    }

    return tag;
  }
})


BetterNote.tags = new BetterNote.Collections.Tags();
