<template>
    <section
        v-show="todoList.length"
        class="main">
        <input
            id="toggle-all"
            v-model="isAllTodoCompleted"
            class="toggle-all"
            type="checkbox">
        <label for="toggle-all">
            Mark all as complete
        </label>
        <ul class="todo-list">
            <li                    
                v-for="{id, value, completed}, idx in filteredTodoList"
                :key="id"
                :class="{completed, editing: idx == editIdx}"
                class="todo">
                <div class="view">
                    <input
                        type="checkbox"
                        class="toggle"
                        :checked="completed"
                        @input="updateCompleteStatus(id, !completed)">
                    <label
                        @dblclick="setEditTodo(idx, value)"
                        v-text="value" />
                    <button
                        class="destroy"
                        @click="removeTodoItem(id)" />
                </div>
                <input
                    v-model="editTodo"
                    v-focus="idx == editIdx"
                    class="edit"
                    type="text"
                    @blur="saveTodoItem(id)"
                    @keydown.enter="$event.target.blur()"
                    @keydown.esc="cancelEdit">
            </li>
        </ul>
    </section>
    <footer
        v-show="todoList.length"
        class="footer">
        <span class="todo-count">
            <strong v-text="remaining" />
            {{ pluralize('item', remaining) }} left
        </span>
        <ul class="filters">
            <li
                v-for="filter in Filter.enums"
                :key="filter.value">
                <a
                    :href="`#${filter.key}`"
                    :class="{selected: visibility === filter}">
                    {{ filter.key.toUpperCase() }}
                </a>
            </li>
        </ul>
        <button
            v-show="todoList.length > remaining"
            class="clear-completed"
            @click="removeCompletedTodo">
            Clear completed
        </button>
    </footer>
</template>

<script>
import {
    ref, unref, computed,
    onMounted,
} from 'vue';
import {Filter} from 'enums/Filter';
import {filterMap} from 'maps/Filter';

const focus = (el, binding) => {
    if (binding.value) {
        el.focus();
    }
};

export default {
    directives: {
        focus,
    },
    props: {
        todoList: {
            required: true,
            type: Array,
        },
    },
    emits: ['remove:todo', 'update:todo'],
    setup(props, {emit}) {
        const editTodo = ref(undefined);
        const editIdx = ref(undefined);
        const remaining = computed(() => props.todoList.filter(({completed}) => !completed).length);
        const isAllTodoCompleted = computed({
            get: () => (unref(remaining) === 0),
            set: value => {
                props.todoList.forEach(({id}) => {
                    updateCompleteStatus(id, value);
                });
            },
        });
        const visibility = ref(undefined);
        const filteredTodoList = computed(() => {
            const visibilityValue = unref(visibility);
            const todoList = props.todoList;

            return visibilityValue ?
                filterMap.get(visibilityValue)(todoList) :
                todoList;
        });

        const changeVisibility = () => {
            const value = window.location.hash.slice(1);
            const enumItem = Filter.get(value);

            if (!enumItem) {
                window.location.hash = '';
            }

            visibility.value = enumItem;
        }

        const pluralize = (word, count) => {
            return word + (count <= 1 ? '' : 's');
        }

        const removeTodoItem = (id) => {
            emit('remove:todo', id);
        }

        const setEditTodo = (idx, value) => {
            editIdx.value = idx;
            editTodo.value = value;
        }

        const updateCompleteStatus = (id, completed) => {
            emit('update:todo', id, {completed});
        }

        const saveTodoItem = (id) => {
            const idx = unref(editIdx);
            const value = unref(editTodo);

            if (idx === undefined || !value) {
                return;
            }

            emit('update:todo', id, {value});
            setEditTodo(undefined, undefined);
        }

        const cancelEdit = () => {
            setEditTodo(undefined, undefined);
        }

        const removeCompletedTodo = () => {
            const completedList = props.todoList.filter(({completed}) => completed);

            completedList.forEach(({id}) => {
                removeTodoItem(id);
            });
        }

        onMounted(() => {
            changeVisibility();
        });

        window.addEventListener('hashchange', changeVisibility);

        return {
            Filter,
            editTodo,
            editIdx,
            remaining,
            isAllTodoCompleted,
            visibility,
            filteredTodoList,
            pluralize,
            removeTodoItem,
            setEditTodo,
            updateCompleteStatus,
            saveTodoItem,
            cancelEdit,
            removeCompletedTodo,
        };
    },
}
</script>