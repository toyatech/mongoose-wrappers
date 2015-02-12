# Mongoose Wrappers

Wrappers around the [Mongoose](http://mongoosejs.com) library that aims to simplify the way Schemas and Models are defined.  

## Schemas

Schemas can be defined with a single object literal.

```js
var Schema = require('mongoose-wrappers').Schema;

var AnimalSchema = new Schema({
  paths: {
    name: { type: 'String' },
    type: { type: 'String' }
  },
  virtuals: {
    title: {
      get: function() {
        return this.name + ': ' + this.type;
      }
    }
  }, 
  methods: {
    findSimilarTypes: function(cb) {
      return this.model('Animal').find({ type: this.type }, cb);
    }
  },
  statics: {
    findByName: function(name, cb) {
      this.find({ name: new RegExp(name, 'i') }, cb);
    }
  },
  indexes: [
    { name: 1, type: -1 }
  ]
});
```
