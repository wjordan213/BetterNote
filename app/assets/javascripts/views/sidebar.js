BetterNote.Views.Sidebar = Backbone.View.extend({
  tagName: 'nav',
  template: JST['sidebar'],

  events: {
    'click .notebooks' : 'callIndex'
  },

  render: function() {
    var content = this.template();
    this.$el.html(content);

    return this;
  },

  callIndex: function() {
    Backbone.history.navigate('notebooks', {trigger: true});
  }

})
