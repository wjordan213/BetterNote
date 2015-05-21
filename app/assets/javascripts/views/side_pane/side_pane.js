BetterNote.Views.SidePane = Backbone.CompositeView.extend({

  initialize: function(options) {
    this.collectionViews = {};
    this.type = options.type;
    this.listenTo(this.collection, 'sort', this.addContentViews);
    this.listenTo(this.collection, 'remove', this.removeContentView);

    this._beenSorted = false;

    if (options.model) {
      this.listenTo(this.model, 'sync', this.render);
    }

    this.addContentViews();
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
    this.collectionViews[content.get('id')] = subview;

    this.addSubview('.content', subview, true);
  },

  events: {
    'click .new' : 'newContent',
    'input .search' : 'searchContent'
  },

  template: JST['side_pane/side_pane'],

  searchContent: function(event) {
    var inputVal = $(event.target).val();
    this.collection.each(function(content) {
      this.compareContent(content, inputVal);
    }.bind(this))
  },

  compareContent: function(content, inputVal) {
    // 1) check to see if the title of content matches inputVal
    if (content.get('title').match(inputVal)) {
      if (!this.collectionViews[content.get('id')]) {
        this.addContentView(content, {insert: true});
      }
    } else if(this.collectionViews[content.get('id')]) {
      this.removeContentView(content, {insert: true});
    }
  },

  insertContent: function(subview) {
    var inserted = false;

    // iterate, call insertAfter on subview.$el, then add subview to this.subviews() and break out of loop
    for (var key in this.collectionViews) {
      var contentView = this.collectionViews[key];
      // debugger;
      if (contentView === false) {
        continue;
      }

      // from here forward, we know that contentView is something currently rendered on the page
      var result = this.collection.comparator(contentView.model, subview.model);
      console.log("===========================================");
      console.log(contentView.model.get("title"));
      console.log(subview.model.get("title"));
      console.log(result)
      console.log("===========================================");
      // if result is one, subview is older and contentView is newer, else, subview is newer
      if (result === -1) {
        inserted = true;
        // debugger;
        subview.render().$el.insertAfter(contentView.$el);
        // $('.content').before(subview.render(.$el, contentView.$el);
        break;
      }
    }
      // access this.collection's comparator function, giving it contentView and subView. It should start from newest and work it's way down to oldest. when it finds something older than it, it is inserted either before or after (not sure how the ordering works out)
    if (!inserted) {
      this.prependContent(subview.model);
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
    this.collectionViews[content.get('id')] = false;
  },

  addContentView: function(content, options) {
    var subview = new BetterNote.Views.SideContent({ model: content, type: this.type, collection: this.collection });


    if (options && options.insert) {
      this.insertContent(subview);
    } else{
      this.collectionViews[content.get('id')] = subview;
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
