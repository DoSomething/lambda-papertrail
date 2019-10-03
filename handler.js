'use strict';

const path = require('path');
const zlib = require('zlib');
const winston = require('winston');

// Register Papertrail transport w/ Winston.
require('winston-papertrail');

module.exports.log = (event, context, callback) => {
  // Parse incoming Cloudwatch logs, which are base64-encoded & gzipped:
  const payload = new Buffer(event.awslogs.data, 'base64');
  zlib.gunzip(payload, (err, result) => {
    if (err) {
      callback(err);
    } else {
      const json = JSON.parse(result.toString('ascii'));

      // Parse a human-readable hostname & program from the log group.
      const logGroup = path.parse(json.logGroup);

      // Configure the Papertrail connection.
      const papertrail = new winston.transports.Papertrail({
        host: process.env.PAPERTRAIL_HOST,
        port: process.env.PAPERTRAIL_PORT,
        hostname: logGroup.name, // e.g. 'bertly-dev-app'
        program: logGroup.dir.replace('/aws/', ''), // e.g. 'lambda'
        logFormat: (level, message) => message,
        flushOnClose: true,
      });

      // Forward each of the log messages to Papertrail.
      const logger = new winston.Logger({ transports: [papertrail] });
      json.logEvents.forEach(log => {
        msg = log.message.trim()
        if (msg) logger.info(msg)
      });

      logger.close();
      callback(null);
    }
  });
};
