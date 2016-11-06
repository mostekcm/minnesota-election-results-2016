var backend = require('./api/server');
backend.set('port', process.env.BACKEND_PORT || 3001);

backend.listen(backend.get('port'), function() {
    console.log('Backend server listening on port ' + backend.get('port') + ' in ' + backend.get('env') + ' mode');
});

var frontend = require('./client/client');
frontend.set('port', process.env.FRONTEND_PORT || 3000);

frontend.listen(frontend.get('port'), function() {
    console.log('Frontend server listening on port ' + frontend.get('port') + ' in ' + frontend.get('env') + ' mode');
});
