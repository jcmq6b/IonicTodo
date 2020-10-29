import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Todo } from 'src/app/interfaces/todo/todo'

@Component({
  selector: 'app-todo',
  templateUrl: './todo.page.html',
  styleUrls: ['./todo.page.scss'],
})
export class TodoPage implements OnInit {

  private todoForm: FormGroup;

  todoArray = [];

  constructor(private formBuilder: FormBuilder) {
    this.todoForm = this.formBuilder.group({
      todo: ["", Validators.required],
      done: false
    });
  }
  ngOnInit() {
  }

  addTodo(value) {
    if (value !== "") {
      let dataObject: Todo = {
        todo: value,
        done: false
      };
      this.todoArray.push(dataObject);
    } else {
      alert("Field required!");
    }
  }

  deleteItem(todo) {
    for (let i = 0; i < this.todoArray.length; i++) {
      if (todo == this.todoArray[i]) {
        this.todoArray.splice(i, 1);
        console.log("delete item");
      }
    }
  }

  todoSubmit(value: Todo) {
    if (value.todo !== "") {
      this.todoArray.push(value);
    } else {
      alert("Field Required");
    }
  }

}
