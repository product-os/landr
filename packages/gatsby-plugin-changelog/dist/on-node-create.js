'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var crypto = require(`crypto`);
var changelogParser = require('changelog-parser');
var _ = require('lodash');

module.exports = function () {
  var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(_ref, pluginOptions) {
    var node = _ref.node,
        getNode = _ref.getNode,
        loadNodeContent = _ref.loadNodeContent,
        boundActionCreators = _ref.boundActionCreators;
    var createNode, createParentChildLink, content, entries, EntryNodes;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            createNode = boundActionCreators.createNode, createParentChildLink = boundActionCreators.createParentChildLink;

            // We are only concerned with readmes
            // console.log(node.name)

            if (!(node.name !== `CHANGELOG`)) {
              _context.next = 3;
              break;
            }

            return _context.abrupt('return');

          case 3:
            if (!(node.internal.mediaType !== `text/x-markdown`)) {
              _context.next = 5;
              break;
            }

            return _context.abrupt('return');

          case 5:
            _context.next = 7;
            return loadNodeContent(node);

          case 7:
            content = _context.sent;
            entries = changelogParser(content, pluginOptions.headerDepth || 2);
            EntryNodes = entries.map(function (obj, i) {

              if (!obj.title) return;
              var objStr = (0, _stringify2.default)(obj);
              var contentDigest = crypto.createHash(`md5`).update(objStr).digest(`hex`);

              return (0, _extends3.default)({}, obj, {
                id: obj.id ? obj.id : `${node.id} [${i}] >>> changelog`,
                children: [],
                parent: node.id,
                internal: {
                  contentDigest,
                  mediaType: `application/json`,
                  // TODO make choosing the "type" a lot smarter. This assumes
                  // the parent node is a file.
                  // PascalCase
                  type: 'Changelog',
                  content: objStr
                }
              });
            });


            _.each(EntryNodes, function (j) {
              createNode(j);
              createParentChildLink({ parent: node, child: j });
            });

            return _context.abrupt('return');

          case 12:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  function onNodeCreate(_x, _x2) {
    return _ref2.apply(this, arguments);
  }

  return onNodeCreate;
}();