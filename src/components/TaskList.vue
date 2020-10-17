<template>
  <div>
    <h1>TODOリスト</h1>
    <div>
      <input type="radio" v-model="filterState" value="">すべて
      <input type="radio" v-model="filterState" value="wip">作業中
      <input type="radio" v-model="filterState" value="done">完了
    </div>
    <table>
      <thead>
      <tr>
        <th>ID</th>
        <th>コメント</th>
        <th>状態</th>
        <th></th>
      </tr>
      </thead>
      <tbody>
        <template v-for="task in tasks">
            <task :key="task.id" :task="task"></task>
        </template>
      </tbody>
    </table>
    <div>
      <h2>新規タスクの追加</h2>
      <input type="text" v-model="taskName">
      <button @click="addTask">送信</button>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import Task from "@/components/Task";

  export default {
    components: {Task},
    data() {
      return {
        taskName: ''
      }
    },
    computed: {
      ...mapGetters(['tasks']),
      filterState: {
        get() {
          return this.$store.getters.filterState;
        },
        set(filterState) {
          this.$store.dispatch('changeFilterState', filterState);
        }
      }
    },
    methods: {
      addTask() {
        if (!this.taskName.trim().length) return;

        this.$store.dispatch('addTask', this.taskName);
        this.taskName = '';
      }
    }
  }
</script>