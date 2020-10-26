import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const taskState = {
  default: {
    value: '',
    label: '',
  },
  wip: {
    value: 'wip',
    label: '作業中'
  },
  done: {
    value: 'done',
    label: '完了'
  }
}

class Task {
  constructor(id, state, value) {
    this.id = id;
    this.state = state;
    this.value = value;
  }
}

export const store = new Vuex.Store({
  state: {
    tasks: [],
    filterState: taskState.default.value,
  },
  getters: {
    tasks: state => {
      if (state.filterState === taskState.default.value) return state.tasks;

      return state.tasks.filter(task => task.state.value === state.filterState);
    },
    filterState: state => {
      return state.filterState;
    }
  },
  mutations: {
    addTask: (state, taskName) => {
      state.tasks.push(new Task(state.tasks.length, taskState.wip, taskName));
    },
    changeFilterState: (state, filterState) => {
      state.filterState = filterState;
    },
    switchTaskState: (state, taskId) => {
      const tmp = [];
      state.tasks.forEach(task => {
        if (task.id !== taskId) {
          tmp.push(task);
          return;
        }

        const state = task.state === taskState.wip ? taskState.done : taskState.wip;
        tmp.push(new Task(task.id, state, task.value));
      })
      state.tasks = tmp;
    },
    deleteTask: (state, taskId) => {
      const tmp = [];
      state.tasks.filter(task => task.id !== taskId).forEach(task => tmp.push(new Task(tmp.length, task.state, task.value)));
      state.tasks = tmp;
    }
  },
  actions: {
    addTask: (context, taskName) => {
      context.commit('addTask', taskName);
    },
    deleteTask: (context, taskId) => {
      context.commit('deleteTask', taskId);
    },
    switchTaskState: (context, taskId) => {
      context.commit('switchTaskState', taskId);
    },
    changeFilterState: (context, filterState) => {
      context.commit('changeFilterState', filterState);
    }
  }
})
