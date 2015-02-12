var assert = require('assert')
  , mongoose = require('mongoose')
  , Schema = require('../index').Schema;

describe('Schema', function() {
  it('works!', function() {
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

    var Animal = mongoose.model('Animal', AnimalSchema);
    var animal = new Animal({name: 'Tux', type: 'Penguin'});

    assert.equal(animal.name, 'Tux');
    assert.equal(animal.type, 'Penguin');
    assert.equal(animal.title, 'Tux: Penguin'); 
    
  });
});
