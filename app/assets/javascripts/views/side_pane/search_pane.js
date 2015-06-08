BetterNote.Views.SearchPane = Backbone.CompositeView.extend({
  initialize: function() {
    this.collectionViews = [new BetterNote.Collections.SearchResults(), {}];
    this.listenTo(this.collectionViews[0], 'sync', this.renderResults);
  },

  events: {
    "submit form" : "search"
  },

  template: JST['side_pane/search_pane'],

  render: function() {
    var content = this.template();
    this.$el.html(content);
    this.attachSubviews();

    return this;
  },

  search: function(event) {
    event.preventDefault();
    var $input = this.$("#query");
    this.collectionViews[0].searchInfo.query = $input.val();
    this.collectionViews[0].fetch({
      data: this.collectionViews[0].searchInfo,
      success: function () {
        console.log(this.collectionViews[0].length);
      }.bind(this)
    });
  },

  renderResults: function() {
    var $container = this.$(".content");
    $container.empty();

    var view;
    this.collectionViews[0].each(function(note) {
      view = new BetterNote.Views.SideContent({model: note, type: "notes"});
      this.collectionViews[1][note.id] = view;
      this.addSubview('.content', view, true);
    }.bind(this));
  },

  removeContentView: function(content) {
    this.removeModelSubview('.content', content);
    this.collectionViews[1][content.get('id')] = false;
    this.collectionViews[0].remove(content);
  },

  removeAndInsert: function(model) {
      var workingModel = this.collectionViews[0].findWhere({id: model.get('id')});
      this.removeContentView(workingModel);
      var subview = new BetterNote.Views.SideContent({ model: model, type: this.type, collection: this.collectionViews[0] });
      this.insertContent(subview);
  },

  insertContent: function(subview) {
    var inserted = false;

    for (var idx in this.collectionViews[0].models) {
      var model = this.collectionViews[0].models[idx];
      var contentView = this.collectionViews[1][model.id];

      if (contentView === false) {
        continue;
      }

      var result = this.collectionViews[0].comparator(contentView.model, subview.model) * -1;
      if (result === -1) {
        inserted = true;

        subview.render().$el.insertBefore(contentView.$el);
        this.collectionViews[1][subview.model.get('id')] = subview;
        this.collectionViews[0].add(subview.model, {sort: true});
        break;
      }
    }

    if (!inserted) {
      this.collectionViews[1][subview.model.get('id')] = subview;
      this.collectionViews[0].add(subview.model, {sort: true});
      this.addContentView(subview.model);
    } else {
      this.subviews('.content').push(subview);
    }
  },

  addContentView: function(content, options) {
    var subview = new BetterNote.Views.SideContent({ model: content, type: this.type, collection: this.collection });
    this.collectionViews[1][content.get('id')] = subview;
    this.collectionViews[0].add(content, {sort: true});
    this.addSubview('.content', subview);
  }

});
