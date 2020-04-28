"use strict";
function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly)
      symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(
          target,
          key,
          Object.getOwnPropertyDescriptor(source, key)
        );
      });
    }
  }
  return target;
}
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true,
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _slicedToArray(arr, i) {
  return (
    _arrayWithHoles(arr) ||
    _iterableToArrayLimit(arr, i) ||
    _unsupportedIterableToArray(arr, i) ||
    _nonIterableRest()
  );
}
function _nonIterableRest() {
  throw new TypeError(
    "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
  );
}
function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(n);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
    return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }
  return arr2;
}
function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr)))
    return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;
  try {
    for (
      var _i = arr[Symbol.iterator](), _s;
      !(_n = (_s = _i.next()).done);
      _n = true
    ) {
      _arr.push(_s.value);
      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }
  return _arr;
}
function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}
var removeDupes = function removeDupes(arr, prop) {
  var set = new Set(
    arr.map(function (a) {
      return a[prop];
    })
  );
  return Array.from(set);
};
var DropDown = function DropDown(props) {
  return /*#__PURE__*/ React.createElement(
    React.Fragment,
    null,
    /*#__PURE__*/ React.createElement(
      "select",
      {
        onChange: function onChange(e) {
          return props.getId(e);
        },
        name: "wordcloud",
        id: "wordcloud",
      },
      /*#__PURE__*/ React.createElement(
        "option",
        {
          defaultValue: props.id,
        },
        props.id
      ),
      props.options.map(function (o, i) {
        return /*#__PURE__*/ React.createElement(
          "option",
          {
            id: props.id,
            key: i,
          },
          o
        );
      })
    )
  );
};
var WordCloud = function WordCloud() {
  var _React$useState = React.useState([]),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    data = _React$useState2[0],
    setData = _React$useState2[1];
  var _React$useState3 = React.useState(null),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    date = _React$useState4[0],
    setDate = _React$useState4[1];
  var _React$useState5 = React.useState(null),
    _React$useState6 = _slicedToArray(_React$useState5, 2),
    newspaper = _React$useState6[0],
    setNewsPaper = _React$useState6[1];
  var getId = function getId(e) {
    if (e.target.selectedOptions[0].id === "date") {
      setDate(e.target.selectedOptions[0].textContent);
    } else {
      setNewsPaper(e.target.selectedOptions[0].textContent);
    }
  };
  React.useEffect(function () {
    fetch(
      "https://raw.githubusercontent.com/heathersaul-nos3lf/heathersaul-nos3lf.github.io/master/wordcloudimages.json"
    )
      .then(function (res) {
        return res.json();
      })
      .then(function (data) {
        var values = Object.values(data);
        setData(
          values.map(function (val, i) {
            return _objectSpread({}, val, {
              id: i,
            });
          })
        );
      })
      ["catch"](function (err) {
        return console.error(err);
      });
  }, []);
  return /*#__PURE__*/ React.createElement(
    "div",
    {
      className: "App",
    },
    /*#__PURE__*/ React.createElement(DropDown, {
      options: removeDupes(data, "newspaper"),
      getId: getId,
      id: "newspaper",
    }),
    /*#__PURE__*/ React.createElement(DropDown, {
      options: removeDupes(data, "date"),
      getId: getId,
      id: "date",
    }),
    /*#__PURE__*/ React.createElement(
      "div",
      null,
      " ",
      data
        .filter(function (d) {
          return d.date === date && d.newspaper === newspaper;
        })
        .map(function (d, i) {
          return d["IMG URL"] !== "none"
            ? /*#__PURE__*/ React.createElement("img", {
                key: i,
                src: d["IMG URL"],
                alt: "Wordcloud for "
                  .concat(d.newspaper, " on ")
                  .concat(d.date),
              })
            : /*#__PURE__*/ React.createElement(
                "p",
                {
                  key: i,
                },
                "Sorry! A wordcloud couldn't be generated for ",
                d.newspaper,
                " on the selected date (",
                d.date,
                ")."
              );
        })
    )
  );
};
ReactDOM.render(
  /*#__PURE__*/ React.createElement(WordCloud, null),
  document.getElementById("wordcloud")
);
