function cb(data) {        
  console.log("cb: " + JSON.stringify(data));
}

var auth = {
  // Update with your auth tokens.
  //
  consumerKey : "dSCexoWuXv7gq8FK1zs2Ag",
  consumerSecret : "jirZOsSP6P1PDHJSuBfecazkBY0",
  accessToken : "adTyZFiOrKM0jIYFIlNCO5YCQBzz_-Vl",
  accessTokenSecret : "fBOjdc17hM-_-vMZ3e5vQDYFg2Q",
  serviceProvider : {
      signatureMethod : "HMAC-SHA1"
  }
};

var terms = 'food';
var near = 'San+Francisco,CA';

var accessor = {
  consumerSecret : auth.consumerSecret,
  tokenSecret : auth.accessTokenSecret
};

var parameters = [];
parameters.push(['term', terms]);
parameters.push(['location', near]);
parameters.push(['callback', 'cb']);
parameters.push(['oauth_consumer_key', auth.consumerKey]);
parameters.push(['oauth_consumer_secret', auth.consumerSecret]);
parameters.push(['oauth_token', auth.accessToken]);
parameters.push(['oauth_signature_method', 'HMAC-SHA1']);

var message = {
  'action' : 'https://api.yelp.com/v2/search',
  'method' : 'GET',
  'parameters' : parameters
};

OAuth.setTimestampAndNonce(message);
OAuth.SignatureMethod.sign(message, accessor);

var parameterMap = OAuth.getParameterMap(message.parameters);
        
$.ajax({
  'url' : message.action,
  'data' : parameterMap,
  'dataType' : 'jsonp',
  'jsonpCallback' : 'cb',
  'cache': true
})
  .done(function(data, textStatus, jqXHR) {
    console.log('success[' + data + '], status[' + textStatus + '], jqXHR[' + JSON.stringify(jqXHR) + ']');
  })

  .fail(function(jqXHR, textStatus, errorThrown) {
    console.log('error[' + errorThrown + '], status[' + textStatus + '], jqXHR[' + JSON.stringify(jqXHR) + ']');
  }
);

