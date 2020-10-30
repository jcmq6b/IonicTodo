import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Todo } from 'src/app/interfaces/todo/todo'
import { DataService } from 'src/app/services/TodoData/data.service'

@Component({
  selector: 'app-todo',
  templateUrl: './todo.page.html',
  styleUrls: ['./todo.page.scss'],
})
export class TodoPage implements OnInit {

  private todoForm: FormGroup;
  todoArray: Todo[]= [];

  constructor(private formBuilder: FormBuilder,
    private todoModel: DataService,) 
  {
    this.todoForm = this.formBuilder.group({
      todo: ["", Validators.required],
      done: false
    });

    this.todoModel.getData("todos").then((todos)=>{
      if(todos){
        this.todoArray = todos;
      }
    });
  }
  ngOnInit() {
  }
  addTodo(){
    if(this.todoForm.value.todo != ""){
      console.log(this.todoForm.value);
      let updatedModel = this.todoModel.addTodo(this.todoForm.value);
      if(updatedModel != null){
        this.todoArray = updatedModel;
      }else{
        alert("Error adding todo");
      }
    }else{
      alert("Todo field required!");
    }
  }

  deleteItem(selectedTodo){
    this.todoArray = this.todoModel.deleteItem(selectedTodo);
  }

}
