<template>
  <div>
    <h1>Hello from vue</h1>
    <br>
    <button @click="install">Install Package</button>
  </div>
</template>

<script>
const electron = require('electron');
const ipcRenderer = electron.ipcRenderer;
export default {
  name: 'test',
  data () {
    return {
       text: '',

    }
  },
  methods: {
    install(){
      ipcRenderer.send('install package');
    }
  }
}
</script>
