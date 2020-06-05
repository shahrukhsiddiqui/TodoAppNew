import React, { Component } from 'react';
import './App.css';
import TodoForm from './TodoForm/TodoForm'
import Todo from './TodoForm/Todo'

class App extends Component
{
  state ={
    todos:[],
    todosToShow:"all"
  };

addTodo = todo  =>{
this.setState({
  todos:[todo,...this.state.todos]
});
}

toggleComplete = (id) =>{
  this.setState({
    todos:this.state.todos.map(todo =>{
      if(todo.id === id){
        return {
         ...todo,
          complete:!todo.complete
        }
      }
        else {
          return todo;
        }
      
    })
  })
}

updateTodosToShow = (s) =>{
  this.setState({
    todosToShow:s
  })
}

  render(){
    let todos = [];

    if(this.state.todosToShow === "all"){
       todos = this.state.todos;
    }
    else if (this.state.todosToShow === "Active"){
      todos = this.state.todos.filter(todo => !todo.complete);
      
    }
    else if (this.state.todosToShow === "Completed"){
      todos = this.state.todos.filter(todo => todo.complete);
    }

    return(
      <div>
      <TodoForm onSubmit = {this.addTodo}></TodoForm>
      {todos.map(todo =>(
        <Todo key = {todo.id} 
        toggleComplete = {() => this.toggleComplete(todo.id)}
        todo = {todo}></Todo>
      ))}
      <div>
        todos left:{this.state.todos.filter(todo => !todo.complete).length}
      </div>
      <button onClick = {() =>this.updateTodosToShow("all")}>All</button>
      <button onClick = {() =>this.updateTodosToShow("Active")}>Active</button>
      <button onClick = {() =>this.updateTodosToShow("Completed")}>Completed</button>
      </div>
    )
  }
}

export default App;
