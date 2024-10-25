import { ClientsComponent } from './components/users/clients/clients.component';


import { Routes } from '@angular/router';
import { LoginComponent } from './components/admin/login/login.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { authMiddlewareGuard } from './Guards/auth-middleware.guard';
import { UsersComponent } from './components/users/users.component';
import { FreelancersComponent } from './components/users/freelancers/freelancers.component';
import { GetProjectsComponent } from './components/projects/get-projects/get-projects.component';
import { SingleProjectComponent } from './components/projects/single-project/single-project.component';
import { SkillsComponent } from './components/skills/skills.component';
import { EditSkillComponent } from './components/skills/edit-skill/edit-skill.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [

  {path:'', component:  HomeComponent,canActivate: [authMiddlewareGuard]},
  {path:'login', component: LoginComponent},
  {path:'users', component: UsersComponent ,canActivate: [authMiddlewareGuard]},
  {path:'users/clients', component: ClientsComponent ,canActivate: [authMiddlewareGuard]},
  {path:'users/freelancers', component: FreelancersComponent ,canActivate: [authMiddlewareGuard]},
  {path:'projects/allprojects', component: GetProjectsComponent ,canActivate: [authMiddlewareGuard]},
  {path:'projects', component: ProjectsComponent ,canActivate: [authMiddlewareGuard]},
  {path:'projects/:id', component: SingleProjectComponent ,canActivate: [authMiddlewareGuard]},
  {path:'categories', component: CategoriesComponent ,canActivate: [authMiddlewareGuard]},
  {path:'skills', component: SkillsComponent ,canActivate: [authMiddlewareGuard]},
  {path:'skills/update', component: EditSkillComponent },

  // {path:'home', component: HeaderComponent },
  // {path:'Products', component: ProductParentsComponent,canActivate: [userGuard]},
  // {path:'ProductParents', component: ProductParentsComponent,canActivate: [userGuard]},
  // {path:'product/:prodId', component: ProdDetailsComponent},
  // {path:'product', component: ProdDetailsComponent},
  // {path:'observe', component: ObservableComponent},
  // {path:'newProduct', component: NewProdComponent},
  // {path:'UserForm', component: UserReactiveFormComponent},
  // {path:'User', component: AuthComponent},
  // {path:'newProduct/:prodId', component: NewProdComponent},
  // {path:'**', component: NotFoundComponent}


];
