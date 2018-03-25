import { observable, autorun } from 'mobx';

import {extendObservable, computed} from "mobx";


/* ===============script================ */

var todoStore = observable({
    /* 一些观察的状态 */
    todos: [],

    /* 推导值 */
    get completedCount() {
        return this.todos.filter(todo => todo.completed).length;
    }
});

/* 观察状态改变的函数 */
autorun(function () {
    console.log("Completed %d of %d items",
        todoStore.completedCount,
        todoStore.todos.length
    );
});

/* ..以及一些改变状态的动作 */
todoStore.todos[0] = {
    title: "Take a walk",
    completed: false
};
// -> 同步打印 'Completed 0 of 1 items'

todoStore.todos[0].completed = true;
// -> 同步打印 'Completed 1 of 1 items'


// 第一种写法（装饰器写法，需要编辑器开启支持装饰器）

// class OrderLine {
//     @observable price = 0;
//     @observable amount = 1;

//     constructor(price) {
//         this.price = price;
//     }

//     @computed get total() {
//         return this.price * this.amount;
//     }
// }

// 第二种写法代码
class OrderLine {
    constructor(price) {
        extendObservable(this, {
            price: price,
            amount: 1,
            // 有效:
            get total() {
                return this.price * this.amount
            },
            // 同样有效:
            total: computed(function() {
                return this.price * this.amount
            })
        })
    }
}

var numbers = observable([1,2,3]);
var sum = computed(() => numbers.reduce((a, b) => a + b, 0));

var disposer = autorun(() => console.log(sum.get()));
// 输出 '6'
numbers.push(4);
// 输出 '10'

disposer();
numbers.push(5);
// 不会再输出任何值。`sum` 不会再重新计算。



  /* ===============script================ */