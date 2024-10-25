import { Injectable } from '@angular/core';
import { clientsType, freelancerType, usersStatisticsType } from '../components/users/types';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';



export interface UsersResponse {
  users: any[]; 
}

interface Client {
  _id: string;
  firstName: string;
  email: string;
  proposals: any[];
  createdAt: string;
  role: string;
}

interface ClientsResponse {
  clients: Client[];
}

interface Freelancer {
  _id: string;
  firstName: string;
  email: string;
  proposals: any[];
  createdAt: string;
  role: string;
}

interface FreelancersResponse {
  freelancers: Freelancer[];
}


@Injectable({
  providedIn: 'root'
})
export class UsersService {
  message:string = ''
  constructor(private http:HttpClient) { }

  getAllUsers(): Observable<UsersResponse> {
    return this.http.get<UsersResponse>(`${environment.baseAPIURL}/users`);
  }

  getAllUsersStatistics() :Observable<usersStatisticsType>{
    return this.http.get<usersStatisticsType>(`${environment.baseAPIURL}/admin/statistics`)
  }

  getAllClients(): Observable<ClientsResponse> {
    return this.http.get<ClientsResponse>(`${environment.baseAPIURL}/users/role?role=client`);
  }

  getProjectsByClient(clientId: string): Observable<any[]> {
    return this.http.get<any[]>(`${environment.baseAPIURL}/projects/client/${clientId}`);
  }

  getAllFreelancers(): Observable<FreelancersResponse> {
    return this.http.get<FreelancersResponse>(`${environment.baseAPIURL}/users/role?role=freelancer`);
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

  getAllProposals(): Observable<any> {
    return this.http.get(`${environment.baseAPIURL}/proposals`);
  }
  ///Clients


  // getAllClients():Observable<clientsType>{
  //   return this.http.get<clientsType>(`${environment.baseAPIURL}/users`)
  // }

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
