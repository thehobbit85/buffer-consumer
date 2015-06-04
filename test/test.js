var consumer = require(__dirname + '/../buffer-consumer')
var assert = require('assert')
var crypto = require('crypto')

var buf = crypto.randomBytes(0x3fffff)

describe('Consume', function () {
  it('should return the right buffer for fixed 1 jump length', function (done) {
    this.timeout(0)
    var consume = consumer(buf)
    for (var i = 0; i < buf.length; i++) {
      assert.equal(consume(1)[0], buf[i], 'Should be equal')
    }
    done()
  })

  it('should return the right buffer for fixed 4 jump length', function (done) {
    this.timeout(0)
    var consume = consumer(buf)
    for (var i = 0; i < buf.length; i += 4) {
      assert.equal(consume(4)[0], buf[i], 'Should be equal')
    }

    done()
  })

  it('should return the right buffer for any jump length', function (done) {
    this.timeout(0)
    for (var j = 1; j < buf.length; j++) {
      var consume = consumer(buf)
      for (var i = 0; i < buf.length; i += j) {
        assert.equal(consume(j)[0], buf[i], 'Should be equal')
      }
    }

    done()
  })
})
