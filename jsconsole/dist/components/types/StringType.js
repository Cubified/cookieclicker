var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import classnames from 'classnames';

var StringType = function (_Component) {
  _inherits(StringType, _Component);

  function StringType(props) {
    _classCallCheck(this, StringType);

    var _this = _possibleConstructorReturn(this, (StringType.__proto__ || Object.getPrototypeOf(StringType)).call(this, props));

    _this.state = {
      value: props.value,
      multiline: props.value.includes('\n'),
      expanded: !props.shallow
    };
    _this.onToggle = _this.onToggle.bind(_this);
    return _this;
  }

  _createClass(StringType, [{
    key: 'onToggle',
    value: function onToggle(e) {
      e.preventDefault();
      e.stopPropagation();
      this.setState({
        expanded: !this.state.expanded
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          _props$bare = _props.bare,
          bare = _props$bare === undefined ? false : _props$bare,
          _props$html = _props.html,
          html = _props$html === undefined ? false : _props$html;
      var _state = this.state,
          multiline = _state.multiline,
          expanded = _state.expanded;
      var value = this.state.value;


      if (multiline && !expanded) {
        value = value.replace(/\n/g, '↵');
      }

      var expand = React.createElement(
        'button',
        { onClick: this.onToggle, className: 'icon expand' },
        '+'
      );

      var child = html ? React.createElement('span', { dangerouslySetInnerHTML: { __html: value } }) : value;

      var className = classnames(['type', 'string', {
        toggle: expanded,
        bareString: bare,
        quote: !bare
      }]);

      return React.createElement(
        'div',
        { ref: function ref(e) {
            return _this2.string = e;
          }, className: className },
        multiline && expand,
        child
      );
    }
  }]);

  return StringType;
}(Component);

export default StringType;