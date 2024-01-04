const isApiGatewayResponse = (response) => {
    const { body, headers, statusCode } = response;

    if (!body || !headers || !statusCode) return false;
    if (typeof statusCode !== 'number') return false;
    if (typeof body !== 'string') return false;
    if (!isCorrectHeaders(headers)) return false;
    return true;
};

const isCorrectHeaders = (headers) => {
  
    if (headers['content-type'] !== 'application/json') return false;
    if (headers['access-control-allow-method'] !== '*') return false;
    if (headers['access-control-allow-origin'] !== '*') return false;

    return true;
};

module.exports = {
    isApiGatewayResponse,
    isCorrectHeaders
};
