import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersService } from '../../Services/users.service';
import { ProjectsService } from '../../Services/projects.service';
import { SkillsService } from '../../Services/skills.service';
import { CategoriesService } from '../../Services/categories.service';
import { Chart, ChartConfiguration, ChartData } from 'chart.js/auto';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, AfterViewInit {
  @ViewChild('userChart') userChartRef!: ElementRef;
  @ViewChild('projectProposalChart') projectProposalChartRef!: ElementRef;
  userChart!: Chart;
  projectProposalChart!: Chart;

  // ... existing properties ...
  projectProposalChartData: ChartData = {
    labels: ['Projects', 'Proposals'],
    datasets: [{
      data: [],
      backgroundColor: ['#FFCE56', '#4BC0C0'] // Add custom colors here
    }]
  };

  projectProposalChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Projects and Proposals' }
    }
  };
  userChartData: ChartData = {
    labels: ['Freelancers', 'Clients'],
    datasets: [{
      data: [],
      backgroundColor: ['#FF6384', '#36A2EB'] // Add custom colors here
    }]
  };

  userChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'User Distribution' }
    }
  };

  statistics = {
    totalUsers: 0,
    freelancers: 0,
    clients: 0,
    projects: 0,
    proposals: 0,
    skills: 0,
    categories: 0
  };

  // userChartData: ChartData<'doughnut'> = {
  //   labels: ['Freelancers', 'Clients'],
  //   datasets: [{ data: [] }]
  // };

  // userChartOptions: ChartConfiguration['options'] = {
  //   responsive: true,
  //   plugins: {
  //     legend: { position: 'top' },
  //     title: { display: true, text: 'User Distribution' }
  //   }
  // };

  constructor(
    private usersService: UsersService,
    private projectsService: ProjectsService,
    private skillsService: SkillsService,
    private categoriesService: CategoriesService
  ) {}

  ngOnInit() {
    this.fetchStatistics();
  }
  ngAfterViewInit() {
    this.initializeUserChart();
    this.initializeProjectProposalChart();
  }

  initializeProjectProposalChart() {
    this.projectProposalChart = new Chart(this.projectProposalChartRef.nativeElement, {
      type: 'doughnut',
      data: this.projectProposalChartData,
      options: this.projectProposalChartOptions
    });
  }

  initializeUserChart() {
    this.userChart = new Chart(this.userChartRef.nativeElement, {
      type: 'doughnut',
      data: this.userChartData,
      options: this.userChartOptions
    });
  }
  fetchStatistics() {
    this.usersService.getAllUsers().subscribe(
      (response) => {
        this.statistics.totalUsers = response.users.length;
        this.fetchFreelancers();
        this.fetchClients();
        this.fetchProjects();
        this.fetchProposals();
        this.fetchSkills();
        this.fetchCategories();
      },
      (error) => console.error('Error fetching users:', error)
    );
  }

  fetchFreelancers() {
    this.usersService.getAllFreelancers().subscribe(
      (response) => {
        this.statistics.freelancers = response.freelancers.length;
        this.updateUserChart();
      },
      (error) => console.error('Error fetching freelancers:', error)
    );
  }

  fetchClients() {
    this.usersService.getAllClients().subscribe(
      (response) => {
        this.statistics.clients = response.clients.length;
        this.updateUserChart();
      },
      (error) => console.error('Error fetching clients:', error)
    );
  }

  fetchProjects() {
    this.projectsService.getAllProjects().subscribe(
      (response: any) => {
        this.statistics.projects = response.length;
        this.updateProjectProposalChart();
      },
      (error) => console.error('Error fetching projects:', error)
    );
  }

  fetchProposals() {
    this.usersService.getAllProposals().subscribe(
      (response: any) => {
        this.statistics.proposals = response.users.length;
        this.updateProjectProposalChart();
      },
      (error) => console.error('Error fetching proposals:', error)
    );
  }
  updateProjectProposalChart() {
    const projects = this.statistics.projects;
    const proposals = this.statistics.proposals;

    if (this.projectProposalChart) {
      this.projectProposalChart.data.labels = [`Projects (${projects})`, `Proposals (${proposals})`];
      this.projectProposalChart.data.datasets[0].data = [projects, proposals];
      this.projectProposalChart.update();
    }
  }
  fetchSkills() {
    this.skillsService.getSkills().subscribe(
      (response) => {
        this.statistics.skills = response.length;
      },
      (error) => console.error('Error fetching skills:', error)
    );
  }

  fetchCategories() {
    this.categoriesService.getCategories().subscribe(
      (response) => {
        this.statistics.categories = response.categories.length;
      },
      (error) => console.error('Error fetching categories:', error)
    );
  }

  updateUserChart() {
    const freelancers = this.statistics.freelancers;
    const clients = this.statistics.clients;
    
    if (this.userChart) {
      this.userChart.data.labels = [`Freelancers (${freelancers})`, `Clients (${clients})`];
      this.userChart.data.datasets[0].data = [freelancers, clients];
      this.userChart.update();
    }
  }
}