import { Injectable } from '@angular/core';
import { clientsType, freelancerType, usersStatisticsType } from '../components/users/types';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  message:string = ''
  constructor(private http:HttpClient) { }


  getAllUsersStatistics() :Observable<usersStatisticsType>{
    return this.http.get<usersStatisticsType>(`${environment.baseAPIURL}/admin/statistics`)
  }

  getAllFreelancers():Observable<freelancerType>{
    return this.http.get<freelancerType>(`${environment.baseAPIURL}/admin/freelancers`)
  }

  deactivatedFreelancer(data:{freelancerId:string}){
    return this.http.patch<{message:string}>(`${environment.baseAPIURL}/admin/deactive-freelancer`,JSON.stringify(data),{
      headers:{
        "Content-type":"application/json"
      }
    }).subscribe(data=>{
     this.message = data.message
    })
  }


  verifyFreelancer(data:{freelancerId:string}){
    return this.http.patch<{message:string}>(`${environment.baseAPIURL}/admin/verify-freelancer`,JSON.stringify(data),{
      headers:{
        "Content-type":"application/json"
      }
    }).subscribe(data=>{
     this.message = data.message
    })
  }


  ///Clients


  getAllClients():Observable<clientsType>{
    return this.http.get<clientsType>(`${environment.baseAPIURL}/users`)
  }

  deactivatedClient(data:{clientId:string}){
    return this.http.patch<{message:string}>(`${environment.baseAPIURL}/admin/deactive-client`,JSON.stringify(data),{
      headers:{
        "Content-type":"application/json"
      }
    }).subscribe(data=>{
     this.message = data.message
    })
  }

  verifyClient(data:{clientId:string}){
    return this.http.patch<{message:string}>(`${environment.baseAPIURL}/admin/verify-client`,JSON.stringify(data),{
      headers:{
        "Content-type":"application/json"
      }
    }).subscribe(data=>{
     this.message = data.message
    })
  }

}
