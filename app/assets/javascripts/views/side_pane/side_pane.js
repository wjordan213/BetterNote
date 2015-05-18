BetterNote.Views.SidePane = Backbone.CompositeView.extend({

  initialize: function(options) {
    // default: notebooks
    this.type = options.type;
    this.listenTo(this.collection, 'add', this.addContentView);
    this.listenTo(this.collection, 'remove', this.removeContentView)
    // 1 level deep
    // TODO: refactor header so the whole view doesn't have to re-render
    if (options.model) {
      this.listenTo(this.model, 'sync', this.render);
    }
    // debugger;
    // necessary, but potential issue with overlap. fix later
    this.collection.each(function(item) {
      this.addContentView(item);
    }.bind(this))
  },

  events: {
    'click .new' : 'newContent'
  },

  template: JST['side_pane/side_pane'],

  newContent: function(event) {
    event.preventDefault();
    if (this.model instanceof BetterNote.Models.Notebook) {
      Backbone.history.navigate('notebooks/' + this.model.get('id') + '/notes/new', {trigger: true})
    } else {

      Backbone.history.navigate($(event.target).data('href'), {trigger: true});
    }
  },

  removeContentView: function(content) {
    this.removeModelSubview('.content', content);
  },

  addContentView: function(content) {
    var subview = new BetterNote.Views.SideContent({ model: content, type: this.type, collection: this.collection });
    this.addSubview('.content', subview);
  },

  render: function() {
    var contents = this.template({type: this.type });
    this.$el.html(contents);
    this.attachSubviews();
    return this;
  }
})
