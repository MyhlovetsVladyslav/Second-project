<template>
    <div>
        <p>{{ componentMessage }}</p>
        <button @click="changeComponentMessage">Змінити повідомлення у компоненті</button>
        <input type="text" v-model="inputText">
        <p>Ви ввели: {{ inputText }}</p>
        <my-component2></my-component2>
        From A: {{ store.count }}
    </div>
</template>
  
<script>
import MyComponent2 from './MyComponent2.vue'
export default {
    data() {
        return {
            componentMessage: 'Повідомлення з компоненту Vue!',
            inputText: ''
        };
    },
    methods: {
        changeComponentMessage() {
            this.componentMessage = 'Нове повідомлення з компоненту!';
        }
    },
    components: {
    'my-component2': MyComponent2 
  }
};
</script>

<script setup>
  import { store } from './store.mjs'
  </script>
  
  
  