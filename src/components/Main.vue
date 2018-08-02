<template>
  <div>
    <h1>Hello from vue</h1>
    <br>
    <button @click="start">Start Server</button>
  </div>
</template>

<script>
const electron = require('electron');
const ipcRenderer = electron.ipcRenderer;
export default {
  name: 'main',
  data () {
    return {
       text: '',

    }
  },
  methods: {
    start(){
      ipcRenderer.send('start server');
    }
  }
}
</script>
