BetterNote.Views.SidePane = Backbone.CompositeView.extend({

  initialize: function(options) {
    this.type = options.type;
    this.listenTo(this.collection, 'add', this.addContentView);
    this.collection.each(this.addContentView.bind(this)); // possibly redundant
  },

  events: {
    'click .new' : 'newContent'
  },

  template: JST['side_pane/side_pane'],

  newContent: function() {
    event.preventDefault();

    Backbone.history.navigate($(event.target).data('href'));
  },

  addContentView: function(content) {
    var subview = new BetterNote.Views.SideContent({ model: content });
    this.addSubview('.content', subview);
  },

  render: function() {
    var contents = this.template({type: this.type});
    this.$el.html(contents);
    this.attachSubviews();
    return this;
  }
})
