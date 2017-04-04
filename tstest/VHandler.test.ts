import 'mocha';
import { VHandler } from '../src';

import * as assert from 'assert';
import * as path from 'path';
import * as fs from 'fs';
// import * as vig from '../lib/';

import * as express from 'express';

const app = express();
import * as request from 'supertest';

var componentPath = path.resolve(__dirname, '../../tstest/component/');

describe('VHandler', () => {
  it('should new VHandler', () => {
    var passed = false;
    try {
      const handler = new VHandler(null, null);
      var json = handler.toJSON();
      assert(json);
    } catch (e) {
      assert(e.message === 'urls MUST be specified.');
      passed = true;
    }
    assert(passed);

  });

  it('should new VHandler', () => {
    var passed = false;
    try {
      const handler = new VHandler(['/abc'], null);
      var json = handler.toJSON();
      assert(json);
    } catch (e) {
      assert(e.message === 'path MUST be specified.')
      passed = true;
    }
    assert(passed);
  });

  it('should new VHandler', () => {
    var passed = false;

    try {
      const handler = new VHandler(['/abc'], 'null');
      var json = handler.toJSON();
      assert(json);
    } catch (e) {
      assert(e.message === 'path MUST exist.')
      passed = true;
    }
    assert(passed);
  });

  it('should new VHandler', (done) => {
    const handler = new VHandler(
      [
        '/xxx'
      ],
      componentPath,
      '/send');
    var json = handler.toJSON();
    console.log(json);
    assert(json);
    handler.attach(app);
    request(app).get('/send/xxx').
      expect(200, function (err, res) {
        console.log(err, res);
        assert(res.text === 'get');
        done()
      });
  });

  it('should new VHandler', (done) => {
    const handler = new VHandler(
      [
        '/xxx'
      ],
      componentPath,
      '/send');
    var json = handler.toJSON();
    console.log(json);
    assert(json);
    handler.attach(app);
    request(app).put('/send/xxx').
      expect(404, function (err, res) {
        assert(!err);
        assert(res.text === 'Not Found!');
        done()
      });
  });
});