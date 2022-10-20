<template>
  <div class="container">
    <div>
      <form>
        <input type="text" placeholder="Enter your Task" v-model="content">
        <button :disabled="!content" @click.prevent="addTodo">Add</button>
      </form>
    </div>
    <div class="Tasks">
        <div v-for="task in tasks" :key="task.id" :class="{'done':task.status}" id="todo">
          <p>{{task.detail}}</p>
          <div>
            <button @click="togleTodo(task.id,task.status)" :class="task.status? 'btn btn-success': 'btn'">&check;</button>
            <button @click="crossTodo(task.id)" class="btn btn-danger">&Cross;</button>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
import { db } from "@/data";
import { collection, getDocs, onSnapshot, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";

const DbRef = collection(db, "Todos");

export default {
  name: 'App',
  data() {
    return {
      tasks:[
        // {id:1, detail:'Learn Vue', status:false},
        // {id:2, detail:'Apply for evolve', status:false},
        // {id:3, detail:'Exam preperation', status:false},
    ],
    content: ''
    }
  },
  methods:{
    addTodo(){
      const ref = addDoc(DbRef, {
      detail: this.content,
      status: false
    });
    this.content = ''
      console.log('Id', ref)
    },

    togleTodo(id,status){
    //  this.tasks.forEach(task => {
    //      if(task.id === id){
    //          task.status = !task.status
    //        }
    //       }) 
      const UpdatedRef = doc(DbRef, id);
      updateDoc(UpdatedRef, {
        status: !status
      });
    },

    crossTodo(id){
      // this.tasks = this.tasks.filter(task => task.id !== id)
       deleteDoc(doc(DbRef, id));
    }
  },
  mounted(){
    // const querySnapshot = await getDocs(collection(db, 'Todos'));
    // let dbTodos = []
    // querySnapshot.forEach((doc) => {
    //   console.log(doc.id, " => ", doc.data());
    // });
    onSnapshot(DbRef, (querySnapshot) => {
    const dbTodos = [];
    querySnapshot.forEach((doc) => {
      const todos ={
        id : doc.id,
        detail: doc.data().detail,
        status: doc.data().status
      }
      dbTodos.push(todos)
  });
    this.tasks = dbTodos
  }, (error) => {
    console.log(error)
  })
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.Tasks{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
#todo{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 10px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 300px;
  box-shadow: 0 0 10px #ccc;
}
.done{
  background-color: rgba(154, 207, 124, 0.521);
  text-decoration: line-through;
}
button{
  border: 0.5px solid #ccc;
  background: none;
  cursor: pointer;
  margin-left: 5px;
}
p{
  margin: 0;
}
</style>
