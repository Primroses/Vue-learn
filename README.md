# Vue MvvM的学习笔记
> MvvM 是Model-View-ViewModel的缩写，它是一种基于前端开发的架构模式。它的核心就是双向数据绑定。Vue.js专注于View层，核心是VM。ViewModel是负责连接View和Model的，保证视图的一致性。当Model发生变化是，ViewModel会操作View从而改变视图 Vue 实现双向绑定就是在表单元素上添加了一个input事件。


## Vue的双向绑定
> 实现双向绑定首先需要实现三个东西 1(observer) 2(complier) 3(watcher)

- observer 主要的功能就是利用Object.defineProperty方法劫持了数据的所有属性，并添加get set方法。 并且维护一个 订阅器的 数组(用来监听数据变化)
- complier 解析模板，把实例数据填充进模板，渲染页面，并在数据上绑定订阅器。订阅数据变化，及时更新页面
- watcher 至于watcher就是这两者间的桥梁。数据发生变动的时候，observer就会告诉watcher触发notify事件通知complier 更新视图

这就是 Vue的双向绑定的原理 利用的是发布者订阅者模式+数据劫持

发布者订阅者是一个观察者模式的进阶版。观察者和订阅者两个角色还有中间一个传输通道。当发布者发布信息后，通过传输通道告诉订阅者触发事件

## Vue的生命周期
> Vue的生命周期包括开始创建，初始化数据，编译模板，挂载DOM,渲染->更新->渲染，卸载等一系列过程。
```
var app = new Vue({       --------> 创建Vue对象
                          --------> beforeCreate 钩子
    el : '#app',
    data : {             ----------> 开始监控Data对象的数据变化
        message : 'Hello Vue!'
    }
})

-  init Events Vue的内部初始化事件
                         ----------> created 钩子
-   数据观测(observer data) 挂载阶段尚未开始 $el属性不可见
                         ----------> beforMount 钩子
-   render函数首次被调用。实例已经编译了模板，把data里面的数据和模板     生成HTMl。但是html还没有挂载到页面上
                         ----------> mounted 钩子
-   用已经编译好的html内容替换el属性所指向的DOM对象。模板中的HTML渲染到了HTML页面上。这里一般可以做些Ajax操作。mounted只会执行一次
                         ---------->beforeUpdate钩子
-  不会触发附加的重新渲染过程
                         ----------->Upade 钩子
- 调用时，组件已经更新，可以执行依赖于DOM的操作。避免更新状态，这回导致无线循环。在服务端渲染期间不被调用
                        ------------>beforeDestroy钩子
- 实例销毁前，实例仍然可以用
                        ------------>destroyed 钩子
- 实例销毁后，所以实例都会消除，服务端渲染期间不被调用

```
## 子父组件进行通信
> 在Vue中，父子组件的关系可以总结为prop向下传递，事件向上传递。父组件通过prop给子组件下发数据，子组件通过事件给父组件发送消息。

**父组件通过prop向子组件传递**

- 如果不是动态的数据就不用v-bind绑定                                                                          
    exam:<child my-message="parentMsg"></child> // 这里的my-message 不是动态绑定的，是定死的。就是说message初始化，子组件接收后不会再动态变化。
- 如果是动态绑定 就要用v-bind绑定                                                                            
    exam:<child :my-message="parentMsg"></child> // 这里的my-message已经是动态绑定的，只要父组件中的传过来的prop改变 子组件中的也会跟着改变
    
<font size=3 color=red>请注意Prop是单向数据流</font>                                                          
- prop是单向数据流，父组件传递给子组件后，子组件就不能传给父组件 父->子这是为了防止子组件无意间修改了父组件的状态。                                                           
**因为JS中的对象和数组都是引用的数据类型，指向内存的同一块区域**


- 如果prop想做局部变量的时候，我们可以这样解决

1.定义一个局部变量，并用prop初始化
```
props:['myMessage']
data(){
    return {
        counter : this.myMessage
    }
}
```
- Prop作为原始数据传入，由子组件处理成其他数据输出
2. 定义一个计算属性，处理prop的值并返回
```
props :['size'],  ---------------
                                |
computed:{                      |
    normalizedSize(){           |
                                |      
        return this.size    <---|
    }
}

```

**父组件在使用子组件中的地方直接用V-on来监听子组件触发的事件**
``` 
<div id="message-event-example" class="demo">
    <p v-for="msg in messages">{{ msg }}</p>
    <button-message v-on:message="handleMessage"></button-message>
</div>                                                  ^
                                                        |    
  Vue.component('button-message', { --------------------|
        //注册了一个新的全局组件
        template: `<div>
                    <input type="text" v-model="message" />
                    <button v-on:click="handleSendMessage">Send</button> // v-on 监听子组件触发的事件
                </div>`,                                                    
                
                
        data: function () {
            return {
                message: 'test message'
            }
        },
        methods: {
            handleSendMessage: function () {
                // 触发事件
                this.$emit('message', { message: this.message })
            }
        }
})

```

```

**v-model的实质就是**
```
<input v-model="number">

这两者是等价 === 全等

<input :value="number" @input='number=$event.target.value'>

```

*混合父组件的内容与子组件自己的模板。这个过程被称为内容分发 (即 Angular 用户熟知的“transclusion”)。**

## slot(插槽)
> 使用插槽来分发内容 
```
<parent>
    <child></child>
</parent>
```
**这里可能会有两个问题**
- <parent>组件不知道会收到怎样的内容，这是由parent的父组件(爷爷组件决定)
- child可能自己也有自己的模板
这里就出现了slot 用来混合组件和子组件的内容

**父组件模板在父组件作用域中编译，子组件模板在子组件作用域编译**
```
// 这是调用子组件 
<child>{{ message }}</child>
            |->  在子组件中绑定父组件的数据 是错误的 x
            
            
<!-- 无效 -->
<child v-show="Property"></child>
// 试图在子组件模板中绑定指令或者方法
```
当子组件中存在插槽(Slot)的时候 父组件的内容才不会被丢弃。至少还有一个地方去容纳这些内容
```
//子组件模板
<child>
    <h1>我是子组件</h1>
    <slot> 无内容插槽 在没有内容的时候才会显示 </slot>
</child>

//父组件模板1
<parent>
    <h1>我是父组件1</h1>
    // 引用子组件
    <child>  
        <p>这是一些内容</p>
    </child>
</parent>


//父组件模板2
<parent>
    <h1>我是父组件2</h1>
    // 引用子组件
    <child>
        
    </child>
</parent>
```
还有具名的slot 对着插入 
```
// 子组件
<child>
    <header>
        <slot name='header'></slot>
    </header>
        
    -------------------------
    
    <foot>
        <slot name='foot'></slot>
    </foot>
</child>

// 父组件
<parent>
    <h1 slot="header">这里可能是一个页面标题</h1>
    
    
    ---------------------------------------
    
    <p slot="footer">这里有一些联系信息</p>
</parent>
```
**作用域插槽(类似 Prop传递参数一样)**
> 只需要将数据写在插槽上就可以了
```
// child组件
<slot text='slot text'></slot>

//parent组件
<parent>
    <child slot-scope="prop">
        <span>{{ prop.text }}</span>
    </child>
</parent>
```
## 编写组件的时候....
- Prop 允许外部环境传递数据给组件；
- 事件允许从组件内触发外部环境的副作用；
- 插槽允许外部环境将额外的内容组合在组件中。


## Vue 的 style scoped的问题
> 给HTML的DOM节点加一个不重复data属性(形如：data-v-2311c06a)来表示他的唯一性
在每句css选择器的末尾（编译后的生成的css语句）加一个当前组件的data属性选择器（如[data-v-2311c06a]）来私有化样式

**会造成一个后果就是我如果要覆盖这个属性 就要用更高的属性去覆盖它**

