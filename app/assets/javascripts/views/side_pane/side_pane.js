BetterNote.Views.SidePane = Backbone.CompositeView.extend({

  initialize: function(options) {
    this.collectionViews = [new Backbone.Collection(), {}];
    this.collectionViews[0].comparator = this.collection.comparator;
    this.type = options.type;
    this.listenTo(this.collection, 'sort', this.addContentViews);
    this.listenTo(this.collection, 'remove', this.removeContentView);

    this._beenSorted = false;

    if (options.model) {
      this.listenTo(this.model, 'sync', this.render);
    }

    if (this.type === "notebooks") {
      this.collection.sort();
    }

    this.addContentViews();
  },

  removeAndInsert: function(model) {
    // debugger;
    if (this.containsModel(model) && this.collectionViews[0].contains(model)) {
      console.log('called rmandins');
      this.removeContentView(model);

      // debugger;

      var subview = new BetterNote.Views.SideContent({ model: model, type: this.type, collection: this.collection });
      this.insertContent(subview);
    }
  },

  containsModel: function(model) {
    return this.collection.some(function(curModel) {
      return curModel.get('updated_at') === model.get('updated_at');
    })
  },

  addLastContentView: function() {
    this.addContentView(this.collection.last());
  },

  addContentViews: function() {
    if (!this._beenSorted && this.collection.length > 0) {
      this._beenSorted = true;
      this.listenTo(this.collection, 'add', this.prependContent);

      this.collection.each(function(item) {
        this.addContentView(item);
      }.bind(this))
    } else {
      this.addLastContentView;
    }
  },

  prependContent: function(content) {
    var subview = new BetterNote.Views.SideContent({ model: content, type: this.type, collection: this.collection });
    this.collectionViews[1][content.get('id')] = subview;
    this.collectionViews[0].add(content, {sort: true});
    this.addSubview('.content', subview, true);
  },

  events: {
    'click .new' : 'newContent',
    'input .search' : 'searchContent'
  },

  template: JST['side_pane/side_pane'],

  searchContent: function(event) {
    var inputVal = $(event.target).val();
    // debugger;
    this.collection.each(function(content) {
      this.compareContent(content, inputVal);
    }.bind(this))
  },

  compareContent: function(content, inputVal) {
    // 1) check to see if the title of content matches inputVal
    // debugger;
    if (content.get('title').match(inputVal)) {
      if (!this.collectionViews[0].contains(content)) {
        this.addContentView(content, {insert: true});
      }
    } else if(this.collectionViews[0].contains(content)) {
      this.removeContentView(content, {insert: true});
    }
  },

  insertContent: function(subview) {
    var inserted = false;

    for (var idx in this.collectionViews[0].models) {
      var model = this.collectionViews[0].models[idx];
      var contentView = this.collectionViews[1][model.id];

      if (contentView === false) {
        continue;
      }

      var result = this.collection.comparator(contentView.model, subview.model) * -1;
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
    this.collectionViews[1][content.get('id')] = false;
    this.collectionViews[0].remove(content);
  },

  addContentView: function(content, options) {
    var subview = new BetterNote.Views.SideContent({ model: content, type: this.type, collection: this.collection });


      this.collectionViews[1][content.get('id')] = subview;
      this.collectionViews[0].add(content, {sort: true});
    if (options && options.insert) {
      this.insertContent(subview);
    } else{
      this.addSubview('.content', subview);
    }
  },

  render: function() {
    var contents = this.template({type: this.type });
    this.$el.html(contents);
    this.attachSubviews();
    return this;
  }
})
