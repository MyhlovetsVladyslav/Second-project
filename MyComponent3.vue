<template>
    <div>
        <h1>Hello: {{ componentMessage3 }}</h1>
        <my-component2 :data-prop="parentData"></my-component2>
        From B: {{ store.count = 2 }}
    </div>
</template>
  
<script>
import MyComponent2 from './MyComponent2.vue'
export default {
    components: {
    'my-component2': MyComponent2 
  },
    data() {
        return {
            componentMessage3: 'Повідомлення з нового объекту Vue!',
            parentData: 'Дані від основного об\'єкта'
        };
    },
    
};
</script>
  
<script setup>
import { store } from './store.mjs'
</script>

