"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _react = require("@testing-library/react");
var _page = _interopRequireDefault(require("../login/page"));
afterEach(_react.cleanUp);

// Checks that username and password inputs, as well as submit button render
it('checks username and password inputs render', function () {
  var _render = (0, _react.render)(/*#__PURE__*/React.createElement(_page["default"], null)),
    getByPlaceholderText = _render.getByPlaceholderText;
  var emailInput = getByPlaceholderText('Email address');
  var passwordInput = getByPlaceholderText('Password');
  expect(emailInput).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();
});

// Checks that submit button renders
it('checks submit button renders', function () {
  var _render2 = (0, _react.render)(/*#__PURE__*/React.createElement(_page["default"], null)),
    getByRole = _render2.getByRole;
  var submitButton = getByRole('submit');
  expect(submitButton).toBeInTheDocument();
});

// Checks that username and password inputs accept text and submit button is functional
it('checks username and password inputs accept text and submit button is functional', function () {
  // Render the login page
  (0, _react.render)(/*#__PURE__*/React.createElement(_page["default"], null));
  var emailInput = (0, _react.getByPlaceholderText)('Email address');
  var passwordInput = (0, _react.getByPlaceholderText)('Password');
  var submitButton = (0, _react.getByRole)('button', {
    name: 'Sign in'
  });
  _react.fireEvent.change(emailInput, {
    target: {
      value: 'admin2@admin.com'
    }
  });
  _react.fireEvent.change(passwordInput, {
    target: {
      value: 'admin123'
    }
  });
  _react.fireEvent.click(submitButton);
  expect(emailInput.value).toBe('admin2@admin.com');
  expect(passwordInput.value).toBe('admin123');

  // Assert redirection to admin dashboard page
  expect(window.location.pathname).toBe('/admin');
});