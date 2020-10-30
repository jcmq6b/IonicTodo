import { Injectable } from '@angular/core';
import { Todo } from 'src/app/interfaces/todo/todo'
import { Storage } from '@ionic/storage'

@Injectable({
  providedIn: 'root'
})
export class DataService {
  todoArray: Todo[] = [];
  dataName: string = "todos";

  //constructor is loaded when service file is created
  constructor(private storage: Storage)
  { 
    //As soon as model is created it goes over to see if there is any data in local storage
    //If not then it defaults to empty array
    //the .then waits tell it reutrns something then executes the next line
    //Will never execute the rest w/o recieving data first
    this.getData(this.dataName).then((todos)=>{
      if(todos){
        this.todoArray = todos;
      }
    });
  }

  getData(name: string){
    return this.storage.get(name);
  }

  setData(name: string, data: Todo[]){
    this.storage.set(name, data);
  }

  addTodo(todoObject: Todo) {
    if (todoObject != null) {
      //updating todo array
      this.todoArray.push(todoObject);
      console.log(todoObject);

      //once array is updated then update local storage
      this.setData(this.dataName, this.todoArray);

      //returning updated todo array
      return this.todoArray;

    } else {
      // Model shouldn't call the view
      // alert("Field required!");
      console.log("Error adding todo");
      return null;
    }
  }

  deleteItem(todo) {
    //updating todo array
    //This will remove all occurances of the selected name
    //To delete only one, delete the first occurance, 
    //or add id's for more specific selection
    for (let i = 0; i < this.todoArray.length; i++) {
      if (todo == this.todoArray[i]) {
        this.todoArray.splice(i, 1);
        console.log("delete item");
      }
    }

    //updating local storage
    this.setData(this.dataName, this.todoArray);

    //returning updated todo array
    return this.todoArray;
  }

}
