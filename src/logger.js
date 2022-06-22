import pino from 'pino'

export const logger = pino({
    name: "todo-rutas",
    level: 'info',
    sync: false,
    transport:{
      target: 'pino-pretty',
      options: {
        levelFirst: true,
        translateTime: 'yyyy-mm-dd HH:MM:ss:l'
      }
    }
  });

  export default logger;