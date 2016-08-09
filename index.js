const koa = require('koa');
const ctRegisterMicroservice = require('ct-register-microservice-node');
const logger = require('./logger');
var bodyParser = require('koa-bodyparser');
const app = koa();

app.use(bodyParser({
    jsonLimit: '50mb'
}));


app.use(function *(next){
    if(this.path === '/awesome'){
        try{
            logger.debug('Body', this.request.body);
            logger.debug('Query', this.request.query);

            // let result = yield ctRegisterMicroservice.requestToMicroservice({
            //     uri: '/users/4',
            //     method: 'GET',
            //     json: true,
            // });
            // // logger.debug('result', result);
            // this.body = result;
            this.body = 1;
            return;
        } catch (err){
            logger.error(err);
            this.throw(500, 'Unexpected error');
        }
    }
    yield next;
})

//Instance of http module
var server = require('http').Server(app.callback());

// get port of environment, if not exist obtain of the config.
// In production environment, the port must be declared in environment variable
var port = process.env.PORT || 3000;

server.listen(port, () => {

    ctRegisterMicroservice.register({
        info: require('./microservice/register.json'),
        swagger: require('./microservice/swagger.json'),
        mode: ctRegisterMicroservice.MODE_AUTOREGISTER,
        framework: ctRegisterMicroservice.KOA1,
        app,
        logger,
        name: 'microservice-koa1',
        ctUrl: process.env.CT_URL,
        url: process.env.LOCAL_URL,
        active: true,
    }).then(() => {}, (err) => {
        logger.error(err);
        process.exit(1);
    });

});

logger.info('Server started in port:' + port);
