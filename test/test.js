var Plugin = require("../lib");
var fs = require('fs');
var should = require('should');

describe('Plugin', function () {

  var plugin, config;

  beforeEach(function() {
    config = {};
    plugin = new Plugin(config);
  });

  it('should be an object', function() {
    plugin.should.be.ok;
  });

  it('compile', function (done) {
    var css = 'a{a:a}';
    plugin.compile({data: css}, function (err, data) {
      data.should.be.eql(css);
      done();
    });
  });

  it('optimize', function (done) {
    var css = 'a{a:a}';
    plugin.optimize({data: css}, function (err, data) {
      data.should.be.eql(css);
      done();
    });
  });

  describe('Options', function () {

    beforeEach(function() {
      config = {
        plugins: {
          postcss: {
            processors: [
              require('autoprefixer-core')({browsers: 'last 99 versions'}),
              require('css-mqpacker'),
              require('csswring')
            ]
          }
        }
      };
      plugin = new Plugin(config);
    });

    it('uses processors', function() {
      plugin.processors.should.be.an.instanceof(Array).with.lengthOf(3);
    });

    it('compile with options', function (done) {
      var css = fs.readFileSync('test/fixtures/sample.css', 'utf-8');
      var expected = fs.readFileSync('test/fixtures/sample.out.css', 'utf-8');
      plugin.compile({data: css}, function (err, data) {
        data.should.be.eql(expected);
        done();
      });
    });

    it('optimize with options', function (done) {
      var css = fs.readFileSync('test/fixtures/sample.css', 'utf-8');
      var expected = fs.readFileSync('test/fixtures/sample.out.css', 'utf-8');
      plugin.optimize({data: css}, function (err, data) {
        data.should.be.eql(expected);
        done();
      });
    });

  });

});