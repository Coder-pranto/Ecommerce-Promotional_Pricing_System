const CustomAPIError = require('./customErrorAPI');
const UnauthenticatedError = require('./unAuthenticate');
const NotFoundError = require('./notFound');
const BadRequestError = require('./badRequest');
const UnauthorizedError = require('./unAuthorized');

module.exports = {
  CustomAPIError,
  UnauthenticatedError,
  UnauthorizedError,
  NotFoundError,
  BadRequestError,
};
