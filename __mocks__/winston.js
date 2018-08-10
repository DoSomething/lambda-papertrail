const winston = jest.genMockFromModule('winston');

// Mock Papertrail transport as no-op.
winston.transports = { Papertrail: jest.fn() };

// Mock logger that we can spy on later.
const info = jest.fn();
const close = jest.fn();
winston.Logger = jest.fn().mockImplementation(() => {
  return { info, close };
});

module.exports = winston;
module.exports.mockInfo = info;
module.exports.mockClose = close;
