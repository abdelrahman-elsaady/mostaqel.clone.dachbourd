import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BalanceService } from '../../../Services/balance.service';

@Component({
  selector: 'app-balance',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './balance.component.html',
  styleUrl: './balance.component.scss'
})
export class BalanceComponent implements OnInit {
  earnings: any;
  isProcessing = false;
  
  constructor(private balanceService: BalanceService) {}

  ngOnInit() {
    this.loadEarnings();
  }

  loadEarnings() {
    this.balanceService.getPlatformEarnings().subscribe({
      next: (data) => {
        this.earnings = data;
      },
      error: (error) => {
        console.error('Error fetching earnings:', error);
      }
    });
  }

  transferToPayPal() {
    if (!this.earnings.totalEarnings) return;
    
    this.isProcessing = true;
    this.balanceService.initiatePaypalTransfer(this.earnings.totalEarnings).subscribe({
      next: (response) => {
        window.location.href = response.approvalUrl;
      },
      error: (error) => {
        console.error('PayPal transfer error:', error);
        this.isProcessing = false;
      }
    });
  }
}
