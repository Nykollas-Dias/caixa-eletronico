const { contextBridge } = require('electron');

contextBridge.exposeInMainWorld('api', {
  // futuros métodos aqui
});
