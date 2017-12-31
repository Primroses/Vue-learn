# Vue MvvM的学习笔记
> MvvM 是Model-View-ViewModel的缩写，它是一种基于前端开发的架构模式。它的核心就是双向数据绑定。Vue.js专注于View层，核心是VM。ViewModel是负责连接View和Model的，保证视图的一致性。当Model发生变化是，ViewModel会操作View从而改变视图 Vue 实现双向绑定就是在表单元素上添加了一个input事件。

## Vue实现MvvM
**数据劫持结合发布者订阅者模式的方式**，通过```Object.defineProperty()```来劫持各个属性的setter和getter，在数据发生变化时发布消息给订阅者，触发相应的监听回调。

- Observer
  是数据监听器，它是采用```Object.defineProperty()```遍历对象中的属性，在属性上添加getter和setter来实现的监听对象属性变化，发生变化的同时拿到新属性值并通知订阅者
- Compile 
  指令解析器