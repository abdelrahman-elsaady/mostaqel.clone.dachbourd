import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BalanceService } from '../../../Services/balance.service';
import Swal from 'sweetalert2'; // Import SweetAlert for better notifications
import { loadScript } from "@paypal/paypal-js";
import { environment } from '../../../../environments/environment';

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
  public showPaypalButtons = false;
  private paypalScriptLoaded = false;
  
  constructor(private balanceService: BalanceService) {}

  ngOnInit() {
    this.loadEarnings();
    this.initializePayPal();
  }

  private async initializePayPal() {
    try {
      await loadScript({ 
        clientId: environment.paypalClientId,
        currency: "USD"
      });
      this.paypalScriptLoaded = true;
    } catch (error) {
      console.error("Failed to load PayPal script:", error);
    }
  }

  private renderPayPalButton() {
    if (!this.paypalScriptLoaded) return;

    // Clear existing buttons if any
    const container = document.getElementById('paypal-button-container');
    if (container) {
      container.innerHTML = '';
    }

    // @ts-ignore - PayPal types
    window.paypal.Buttons({
      createOrder: (data: any, actions: any) => {
        return actions.order.create({
          purchase_units: [{
            amount: {
              value: this.earnings?.totalEarnings?.toString() || "0"
            }
          }]
        });
      },
      onApprove: (data: any, actions: any) => {
        return actions.order.capture().then((details: any) => {
          this.processPaypalTransfer();
        });
      },
      onCancel: () => {
        this.showPaypalButtons = false;
      },
      onError: (err: any) => {
        console.error('PayPal Error:', err);
        Swal.fire('Error', 'PayPal transaction failed', 'error');
        this.showPaypalButtons = false;
      }
    }).render('#paypal-button-container');
  }

  loadEarnings() {
    this.balanceService.getPlatformEarnings().subscribe({
      next: (data) => {
        console.log('Earnings data:', data); // Debug log
        this.earnings = data;
      },
      error: (error) => {
        console.error('Error fetching earnings:', error);
        Swal.fire('Error', 'Failed to load earnings', 'error');
      }
    });
  }

  transferToPayPal() {
    if (!this.earnings?.totalEarnings) {
      Swal.fire('Error', 'No earnings available for withdrawal', 'error');
      return;
    }
    
    // Instead of immediately processing, show PayPal buttons
    this.showPaypalButtons = true;
    
    // Render PayPal buttons if not already rendered
    setTimeout(() => {
      this.renderPayPalButton();
    }, 0);
  }

  // New method to handle the actual transfer after PayPal approval
  private processPaypalTransfer() {
    this.isProcessing = true;
    console.log('Starting PayPal transfer for amount:', this.earnings.totalEarnings);

    this.balanceService.initiatePaypalTransfer(this.earnings.totalEarnings).subscribe({
      next: (response) => {
        console.log('PayPal transfer response:', response);
        if (response.success) {
          Swal.fire('Success', 'Transfer initiated successfully', 'success');
          this.loadEarnings();
        } else {
          throw new Error('Transfer failed');
        }
      },
      error: (error) => {
        console.error('PayPal transfer error:', error);
        Swal.fire('Error', 'Failed to initiate transfer', 'error');
      },
      complete: () => {
        this.isProcessing = false;
        this.showPaypalButtons = false;
      }
    });
  }
}
