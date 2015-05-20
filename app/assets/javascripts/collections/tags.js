BetterNote.Collections.Tags = Backbone.Collection.extend({
  url: '/api/tags',
  model: BetterNote.Models.Tag,
  comparator: function(first, second) {
    var first_updated = first.get('updated_at');
    var second_updated = second.get('updated_at');
    if (first_updated > second_updated) {
      return -1;
    } else if (first_updated === second_updated) {
      return 0;
    } else {
      return 1;
    }
  },
  
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
BetterNote.tags.fetch();
