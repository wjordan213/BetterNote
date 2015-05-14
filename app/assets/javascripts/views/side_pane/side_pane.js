BetterNote.Views.SidePane = Backbone.CompositeView.extend({

  initialize: function(options) {
    this.type = options.type;
    this.listenTo(this.collection, 'add', this.addContentView);
    if (options.model) {
      this.listenTo(this.model, 'sync', this.render);
    }
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
    var subview = new BetterNote.Views.SideContent({ model: content });
    this.addSubview('.content', subview);
  },

  render: function() {

    // if (this.model) {
    //   this.type = this.model.get('title');
    //   var contents = this.template({type: this.type, model: this.model });
    // } else {
      var contents = this.template({type: this.type });
    // }
    this.$el.html(contents);
    this.attachSubviews();
    return this;
  }
})
