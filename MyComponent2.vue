<template>
    <div>
      <p @click="changeColor" :style="{ color: textColor }">{{ childMessage }}</p>
      <p>{{ dataProp }}</p>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        childMessage: 'Привіт з дитячого компоненту Vue!',
        textColor: 'black',
      };
    },
    methods: {
        changeColor(){
            this.textColor = 'red'
        }
    },
    props: {
    dataProp: String
  }
  };
  </script>
  
  <style scoped>
  p{
    cursor: pointer;
    
  }
  </style>
  
  