BetterNote.Views.SearchPane = Backbone.CompositeView.extend({
  initialize: function() {
    this.collection = new BetterNote.Collections.SearchResults();
    this.listenTo(this.collection, 'sync', this.renderResults);
  },

  events: {
    "click button" : "search"
  },

  template: JST['side_pane/search_pane'],

  render: function() {
    var content = this.template();
    this.$el.html(content);

    return this;
  },

  search: function(event) {
    event.preventDefault();
    var $input = this.$("#query");
    this.collection.searchInfo.query = $input.val();
    this.collection.fetch({
      data: this.collection.searchInfo,
      success: function () {
        console.log(this.collection.length);
      }.bind(this)
    });
  },

  renderResults: function() {
    var $container = this.$(".content");
    $container.empty();

    var view;
    this.collection.each(function(note) {
    debugger;
      view = new BetterNote.Views.SideContent({model: note, type: "notes"});
      $container.append(view.render().$el);
    });
  }


});
