import Server from './src/server/config.js'
import router from './src/routes/index.routes.js'

// instanciar la clase server
const server = new Server();


//agregar las rutas del proyecto
server.app.use('/api',router)

//escuche el puerto. invocar al metodo listen
server.listen();