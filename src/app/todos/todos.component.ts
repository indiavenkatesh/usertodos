/*
 * Copyright (c) 2016 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component, OnInit } from '@angular/core';
import { RestService } from "services/rest.service";
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder } from "@angular/forms";

@Component({
    styleUrls: ['./todos.component.scss'],
    templateUrl: './todos.component.html'
})
export class TodosComponent implements OnInit {
    todos = [];
    user;
    newTodo;
    constructor(
      private rest: RestService,
      private route: ActivatedRoute,
      private router: Router,
      private _fb : FormBuilder
    ) {
    }

    ngOnInit() {
        const userId = this.route.snapshot.params['userId'];
        this.rest.getItems('todos?userId=' + userId).subscribe((users) => {
            this.todos = users;
        });
    }   

    addTodo() {
        const userId = this.route.snapshot.params['userId'];
        this.rest.saveItem("todos", {
            "userId": 1,
            "title": this.newTodo,
            "completed": false
        }).subscribe(todo => {
            this.todos.push(todo);
        });

        this.newTodo = '';
    }

    deleteTodoStatus(todo) {
        if(!confirm("Are you sure want to delete?")) {
            return;
        }
        this.rest.deleteItem("todos/" + todo.id).subscribe(res => {
            this.todos = this.todos.filter(x => x.id !== todo.id);
        }, err => {
            this.todos = this.todos.filter(x => x.id !== todo.id);
        });
    }

    changeTodoStatus(todo) {
        const userId = this.route.snapshot.params['userId'];
        this.rest.saveItem("todos/" + todo.id, {
            "userId": 1,
            "title": todo.title,
            "completed": todo.completed
        }, true).subscribe(todo => {
            
        });
    } 
}
