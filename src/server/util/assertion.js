const oneOf = (choices) => {
  return {
    assert(option) {
      return choices.indexOf(option) >= 0;
    },
    message: `should be one of [${choices}]`
  };
};

module.exports = {
  oneOf,
  anyOf(choices) {
    return {
      assert(options) {
        const assertion = oneOf(choices);
        return options.every((it) => assertion.assert(it));
      },
      message: `should be any of [${choices}]`
    };
  },
  inRange(from, to) {
    return {
      assert(number) {
        return number >= from && number <= to;
      },
      message: `should be in range ${from}..${to}`
    };
  },
  textRange(from, to) {
    return {
      assert(text) {
        return text.length >= from && text.length <= to;
      },
      message: `should be in range ${from}..${to}`
    };
  },
  isImage() {
    return {
      assert(image) {
        return image.mimetype.startsWith(`image/`);
      },
      message: `should be an image`
    };
  },
  unique() {
    return {
      assert(options) {
        const set = new Set(options);
        return set.size === options.length;
      },
      message: `should be unique`
    };
  },
  isTime() {
    return {
      assert(time) {
        return /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/.test(time);
      },
      message: `should be a time in format HH:mm`
    };
  }
};
