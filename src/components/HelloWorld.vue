<script setup>
import { ref } from 'vue'
import {sayHello} from "../api/hello";
const count = ref(0)
const message = ref("space后台")
const hi = () => {
  sayHello().then(res=>{
    message.value = res.data
  })

}

</script>

<template>
  <h1>{{ message }}</h1>

    <q-btn color="dark" @click="count++">点击次数 {{ count }} </q-btn>
  <br>
  <br>
    <q-btn color="dark" @click="hi">请求接口 {{ count }} </q-btn>



</template>

<style scoped>
a {
  color: #42b983;
}


</style>
