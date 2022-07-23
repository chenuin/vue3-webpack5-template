<template>
    <div v-cloak>
        <section class="todoapp">
            <header class="header">
                <h1>todos</h1>
                <input
                    v-model="newTodo"
                    v-focus
                    class="new-todo"
                    placeholder="What needs to be done?"
                    @keydown.enter="addTodo">
            </header>
            <TodoListEditor
                :todo-list="todoList"
                @remove:todo="removeTodo"
                @update:todo="updateTodo" />
        </section>
        <footer class="info">
            <p>Double-click to edit a todo</p>
            <!-- eslint-disable-next-line vue/max-attributes-per-line -->
            <p>This <a href="https://todomvc.com/examples/vue/" target="_blank">TodoMVC</a> application was originally created by <a href="http://evanyou.me" target="_blank">Evan You</a>. I rewrite it with Vue3+sfc.</p>
        </footer>
    </div>
</template>

<script>
import { ref, unref, computed } from 'vue';
import TodoListEditor from 'components/TodoListEditor.vue';

const focus = {
    mounted: el => el.focus(),
};

export default {
    components: {
        TodoListEditor,
    },
    directives: {
        focus,
    },
    setup() {
        const newTodo = ref(undefined);
        const todoList = ref(JSON.parse(localStorage.getItem('todo')) || []);
        const todoIndexMap = computed(() => (
            unref(todoList).reduce((carry, {id}, idx) => {
                carry[id] = idx;

                return carry;
            }, {})
        ));

        const saveToLocalStorage = (data) => {
            localStorage.setItem('todo', JSON.stringify(unref(data)));
        }

        const addTodo = () => {
            const newTodoValue = unref(newTodo);
            
            if (!newTodoValue) {
                return;
            }

            const item = {
                id: Date.now(),
                value: newTodoValue,
                completed: false,
            };

            todoList.value.push(item);
            newTodo.value = undefined;
            saveToLocalStorage(todoList);
        }

        const removeTodo = (id) => {
            const todoListValue = unref(todoList);

            todoListValue.splice(unref(todoIndexMap)[id], 1);
            saveToLocalStorage(todoList);
        }

        const updateTodo = (id, obj) => {
            const todoListValue = unref(todoList);
            const idx = unref(todoIndexMap)[id];

            todoListValue[idx] = Object.assign(todoListValue[idx], obj);
            saveToLocalStorage(todoList);
        }

        return {
            newTodo,
            todoList,
            addTodo,
            removeTodo,
            updateTodo,
        };
    },
}
</script>

<style scoped>
[v-cloak] {
    display: none;
}
</style>
