BetterNote.Views.SidePane = Backbone.CompositeView.extend({

  initialize: function(options) {
    // default: notebooks
    this.type = options.type;
    this.listenTo(this.collection, 'add', this.addContentView);

    // 1 level deep
    if (options.model) {
      this.listenTo(this.model, 'sync', this.render);
    }

    // necessary, but potential issue with overlap. fix later
    this.collection.each(function(item) {
      this.addContentView(item);
    }.bind(this))
  },

  events: {
    'click .new' : 'newContent'
  },

  template: JST['side_pane/side_pane'],

  newContent: function() {
    event.preventDefault();

    Backbone.history.navigate($(event.target).data('href'), {trigger: true});
  },

  addContentView: function(content) {
    var subview = new BetterNote.Views.SideContent({ model: content, type: this.type });
    this.addSubview('.content', subview);
  },

  render: function() {
    var contents = this.template({type: this.type });
    this.$el.html(contents);
    this.attachSubviews();
    return this;
  }
})
