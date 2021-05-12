import { Component, OnInit } from '@angular/core';
import {Todo} from './../models/todo';
import {TODOServicesService} from './../services/todoservices.service'

@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.css']
})
export class ToDoComponent implements OnInit {

  data:Array<any>
  newData:Todo[]
  inputTodo:string =""

  constructor(private TODOService:TODOServicesService) {
    this.data = new Array<any>()
   }

  ngOnInit(): void {
    this.newData = []
    this.getDataFromAPi()
  }

  getDataFromAPi(){
    this.TODOService.getData().subscribe((data) =>{
      for (let todo of data){
        this.newData.push({
          content:todo.title,
          completed:todo.completed
        })
      }

      console.log(this.newData)
    })
  }

  isDone(id:number){
    this.newData.map((v, i) =>{
      if (i == id){
        v.completed = !v.completed;
      } 

      return v
    })
  }

  deleteTodo(id:number){
    this.newData = this.newData.filter((v, i) => i != id)
  }

  addTodo(){
    this.newData.push({
      content: this.inputTodo,
      completed: false
    })

    this.inputTodo = ""
  }

}
