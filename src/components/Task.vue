<template>
  <tr>
    <td>{{ task.id }}</td>
    <td>{{ task.value }}</td>
    <td><button @click="switchTaskState(task.id)">{{ task.state.label }}</button></td>
    <td><button @click="deleteTask(task.id)">削除</button></td>
  </tr>
</template>

<script>
  import { mapActions } from 'vuex';

  export default {
    props: ['task'],
    methods: {
      ...mapActions(['deleteTask', 'switchTaskState']),
    }
  }
</script>