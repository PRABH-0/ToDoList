import { NgFor, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, Type } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { routes } from '../app.routes';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  imports:[FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  loginId:string = "";
  url:string="https://localhost:7198/api/ToDoList";
  categoryUrl:string = "https://localhost:7198/api/CategoryStatus";
  statusUrl:string = "https://localhost:7198/api/ToDoList/Status";
  mailUrl:string = "https://localhost:7198/api/ToDoList/mail";
  checkDateTimeUrl:string = "https://localhost:7198/api/ToDoList/reminder";
  emailUrl:string="https://localhost:7198/api/Email";
  userEmail:string|null = null;
  mailObj:string= "";
  catObj:any;
  http = inject(HttpClient);
  data:any;
  showUpdateTaskForm:boolean = false;
  putId:number = 0;
  Completed:boolean= false;

  postobj={
    userId: "",
    title: "",
    description: "",
    reminderAt: null,
    repeat: 0,
    category: null,
    isCompleted:false
    
  };

  constructor(private route:ActivatedRoute){}
  
  
  ngOnInit(): void {

    this.loginId = this.route.snapshot.paramMap.get('userId')!;
    console.log(this.loginId);
    this.postobj={
      userId: this.loginId,
      title: "",
      description: "",
      reminderAt: null,
      repeat: 0,
      category: null,
      isCompleted:false
      
    };

    // This function i copy from the internet to fetch the wright time
    function getLocalFormattedDate() {
    const now = new Date();

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const day = String(now.getDate()).padStart(2, '0');

    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    let CurruntDate = `${year}-${month}-${day}T${hours}:${minutes}`

    return  CurruntDate;
    }

     this.http.get(`${this.url}/${this.loginId}`).subscribe((res:any)=> {
      console.log(res)
      this.data = res;
    });
    this.http.get(this.categoryUrl).subscribe((res:any)=> {
      console.log(res)
      this.catObj = res;
    });
    // Get user email
    this.http.get(`${this.emailUrl}/${this.loginId}`, { responseType: 'text' }).subscribe((res:any)=> {
      console.log(res)
      this.userEmail = res;
    });
    setInterval(() => {
      let formattedDate = getLocalFormattedDate();
      console.log(formattedDate);
      
    this.http.get(`${this.checkDateTimeUrl}/${formattedDate}/${this.userEmail}`).subscribe((res:any)=> {
      console.log("Hit checkReminder() method")
    });
  }, 60000);
  }

  onSubmit(){
    console.log(this.postobj);
    this.http.post(`${this.url}`,this.postobj).subscribe((res:any)=> {
      console.log(res)
      this.data = res;
    });
    // // Get user email
    // this.http.get(`${this.emailUrl}/${this.loginId}`, { responseType: 'text' }).subscribe((res:any)=> {
    //   console.log(res)
    //   this.userEmail = res;
    // });
    // Call Email Api method
    this.mailObj= `<h2> Your task ${this.postobj.title} is Added in Task list .</h2> <br> We Are Notifide You On " ${this.postobj.reminderAt} " That Reminder Date.` ;
    this.http.get(`${this.mailUrl}/${this.userEmail}?body=${encodeURIComponent(this.mailObj)}`).subscribe((res:any)=> {
      console.log(res)
    });

    this.postobj={
    userId: this.loginId,
      title: '',
      description:  '',
      reminderAt:  null,
      repeat: 0,
      isCompleted: false,
      category:  null,
    };
  }

  EditTask(id:number){
    this.showUpdateTaskForm=true;
    this.putId = id;
    console.log(this.putId);
    this.http.get(`${this.url}/single/${id}`).subscribe((res:any)=> {
      console.log(res)
      this.postobj={
        userId: this.loginId,
        title: res.title,
        description:  res.description,
        reminderAt:  res.reminderAt,
        repeat:  res.repeat,
        isCompleted: res.isCompleted,
        category:  res.category,
      };
      console.log(this.postobj);
    });
  }
  putTask(){
    console.log(this.postobj);
    this.http.put(`${this.url}/${this.putId}`,this.postobj).subscribe((res:any)=> {
      console.log(res)
      this.data = res;
    });
    this.postobj={
      userId: this.loginId,
      title: '',
      description:  '',
      reminderAt:  null,
      repeat: 0,
      isCompleted: false,
      category:  null,
    };
  }

  DeleteTask(id:number){
    this.http.delete(`${this.url}/${id}`).subscribe((res:any)=> {
      console.log(res)
      this.data = res;
    });
  }
  isCompleted(id:number){
    console.log("this is",id);
    this.http.put(`${this.statusUrl}/${id}`,id).subscribe((res:any)=> {
      console.log(res)
      this.data = res;
    });

  }

}
