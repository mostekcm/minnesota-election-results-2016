var frontend = require('./client/client');
frontend.set('port', process.env.PORT || 3000);

frontend.listen(frontend.get('port'), function() {
    console.log('Frontend server listening on port ' + frontend.get('port') + ' in ' + frontend.get('env') + ' mode');
});
