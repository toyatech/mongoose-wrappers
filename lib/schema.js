var util = require('util')
  , mongoose = require('mongoose');

function Schema(obj) {
  obj = obj || {};
  mongoose.Schema.apply(this);

  var paths = obj.paths || {};
  this.add(paths);

  var self = this;

  var options = obj.options || {};
  Object.keys(options).forEach(function(name) {
    self.set(name, options[name]);
  });

  var virtuals = obj.virtuals || {};
  Object.keys(virtuals).forEach(function(name) {
    if (virtuals[name].get) self.virtual(name).get(virtuals[name].get);
    if (virtuals[name].set) self.virtual(name).get(virtuals[name].set);
  });

  var methods = obj.methods || {};
  Object.keys(methods).forEach(function(name) {
    self.method(name, methods[name]);
  });

  var statics = obj.statics || {};
  Object.keys(statics).forEach(function(name) {
    self.statics(name, statics[name]);
  });

  var indexes = obj.indexes || {};
  Object.keys(indexes).forEach(function(name) {
    self.index(indexes[name]);
  });

  var plugins = obj.plugins || {};
  Object.keys(plugins).forEach(function(name) {
    self.plugin(plugins[name]);
  });

}
util.inherits(Schema, mongoose.Schema);

module.exports = exports = Schema; 
