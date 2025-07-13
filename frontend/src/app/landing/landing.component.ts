import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  template: `
    <div class="landing-page">
      <!-- Hero Section -->
      <section class="hero-section">
        <div class="hero-content">
          <h1 class="hero-title">
            Transform Your Business with
            <span class="text-primary">SaaS Platform</span>
          </h1>
          <p class="hero-subtitle">
            The complete multi-tenant SaaS solution for modern businesses. 
            Scale effortlessly, manage efficiently, and grow sustainably.
          </p>
          <div class="hero-buttons">
            <p-button 
              label="Get Started Free" 
              icon="pi pi-rocket" 
              class="p-button-primary p-button-lg"
              (click)="navigateToSignup()">
            </p-button>
            <p-button 
              label="Watch Demo" 
              icon="pi pi-play" 
              class="p-button-outlined p-button-lg"
              (click)="watchDemo()">
            </p-button>
          </div>
        </div>
        <div class="hero-image">
          <img src="assets/images/hero-dashboard.png" alt="SaaS Dashboard" />
        </div>
      </section>

      <!-- Features Section -->
      <section class="features-section">
        <div class="container">
          <h2 class="section-title">Why Choose Our Platform?</h2>
          <div class="features-grid">
            <div class="feature-card" *ngFor="let feature of features">
              <div class="feature-icon">
                <i [class]="feature.icon"></i>
              </div>
              <h3>{{ feature.title }}</h3>
              <p>{{ feature.description }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Pricing Section -->
      <section class="pricing-section">
        <div class="container">
          <h2 class="section-title">Simple, Transparent Pricing</h2>
          <div class="pricing-grid">
            <div class="pricing-card" *ngFor="let plan of pricingPlans">
              <div class="plan-header">
                <h3>{{ plan.name }}</h3>
                <div class="plan-price">
                  <span class="currency">$</span>
                  <span class="amount">{{ plan.price }}</span>
                  <span class="period">/month</span>
                </div>
              </div>
              <ul class="plan-features">
                <li *ngFor="let feature of plan.features">
                  <i class="pi pi-check"></i>
                  {{ feature }}
                </li>
              </ul>
              <p-button 
                [label]="plan.buttonText" 
                [class]="plan.buttonClass"
                (click)="selectPlan(plan)">
              </p-button>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA Section -->
      <section class="cta-section">
        <div class="container">
          <h2>Ready to Transform Your Business?</h2>
          <p>Join thousands of businesses already using our platform</p>
          <p-button 
            label="Start Your Free Trial" 
            icon="pi pi-arrow-right" 
            class="p-button-primary p-button-lg"
            (click)="navigateToSignup()">
          </p-button>
        </div>
      </section>

      <!-- Footer -->
      <footer class="landing-footer">
        <div class="container">
          <div class="footer-content">
            <div class="footer-section">
              <h4>Product</h4>
              <ul>
                <li><a href="#features">Features</a></li>
                <li><a href="#pricing">Pricing</a></li>
                <li><a href="#demo">Demo</a></li>
              </ul>
            </div>
            <div class="footer-section">
              <h4>Company</h4>
              <ul>
                <li><a href="#about">About</a></li>
                <li><a href="#contact">Contact</a></li>
                <li><a href="#careers">Careers</a></li>
              </ul>
            </div>
            <div class="footer-section">
              <h4>Support</h4>
              <ul>
                <li><a href="#help">Help Center</a></li>
                <li><a href="#docs">Documentation</a></li>
                <li><a href="#status">Status</a></li>
              </ul>
            </div>
          </div>
          <div class="footer-bottom">
            <p>&copy; 2024 SaaS Platform. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  `,
  styles: [`
    .landing-page {
      min-height: 100vh;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    }

    .hero-section {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 6rem 2rem;
      max-width: 1200px;
      margin: 0 auto;
      color: white;
    }

    .hero-content {
      flex: 1;
      max-width: 600px;
    }

    .hero-title {
      font-size: 3.5rem;
      font-weight: 700;
      margin-bottom: 1.5rem;
      line-height: 1.2;
    }

    .hero-subtitle {
      font-size: 1.25rem;
      margin-bottom: 2rem;
      opacity: 0.9;
      line-height: 1.6;
    }

    .hero-buttons {
      display: flex;
      gap: 1rem;
      flex-wrap: wrap;
    }

    .hero-image {
      flex: 1;
      text-align: center;
    }

    .hero-image img {
      max-width: 100%;
      height: auto;
      border-radius: 12px;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
    }

    .features-section {
      padding: 6rem 2rem;
      background: white;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
    }

    .section-title {
      text-align: center;
      font-size: 2.5rem;
      font-weight: 700;
      margin-bottom: 3rem;
      color: #1f2937;
    }

    .features-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
    }

    .feature-card {
      padding: 2rem;
      text-align: center;
      background: #f8fafc;
      border-radius: 12px;
      transition: transform 0.3s ease;
    }

    .feature-card:hover {
      transform: translateY(-5px);
    }

    .feature-icon {
      font-size: 3rem;
      color: #3b82f6;
      margin-bottom: 1rem;
    }

    .feature-card h3 {
      font-size: 1.5rem;
      font-weight: 600;
      margin-bottom: 1rem;
      color: #1f2937;
    }

    .feature-card p {
      color: #6b7280;
      line-height: 1.6;
    }

    .pricing-section {
      padding: 6rem 2rem;
      background: #f8fafc;
    }

    .pricing-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
      margin-top: 3rem;
    }

    .pricing-card {
      background: white;
      border-radius: 12px;
      padding: 2rem;
      text-align: center;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
      transition: transform 0.3s ease;
    }

    .pricing-card:hover {
      transform: translateY(-5px);
    }

    .plan-header h3 {
      font-size: 1.5rem;
      font-weight: 600;
      margin-bottom: 1rem;
      color: #1f2937;
    }

    .plan-price {
      margin-bottom: 2rem;
    }

    .currency {
      font-size: 1.5rem;
      color: #6b7280;
    }

    .amount {
      font-size: 3rem;
      font-weight: 700;
      color: #3b82f6;
    }

    .period {
      font-size: 1rem;
      color: #6b7280;
    }

    .plan-features {
      list-style: none;
      padding: 0;
      margin-bottom: 2rem;
    }

    .plan-features li {
      padding: 0.5rem 0;
      color: #6b7280;
    }

    .plan-features i {
      color: #10b981;
      margin-right: 0.5rem;
    }

    .cta-section {
      padding: 6rem 2rem;
      background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
      text-align: center;
      color: white;
    }

    .cta-section h2 {
      font-size: 2.5rem;
      font-weight: 700;
      margin-bottom: 1rem;
    }

    .cta-section p {
      font-size: 1.25rem;
      margin-bottom: 2rem;
      opacity: 0.9;
    }

    .landing-footer {
      background: #1f2937;
      color: white;
      padding: 3rem 2rem 1rem;
    }

    .footer-content {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 2rem;
      margin-bottom: 2rem;
    }

    .footer-section h4 {
      font-size: 1.125rem;
      font-weight: 600;
      margin-bottom: 1rem;
    }

    .footer-section ul {
      list-style: none;
      padding: 0;
    }

    .footer-section li {
      margin-bottom: 0.5rem;
    }

    .footer-section a {
      color: #d1d5db;
      text-decoration: none;
      transition: color 0.3s ease;
    }

    .footer-section a:hover {
      color: white;
    }

    .footer-bottom {
      text-align: center;
      padding-top: 2rem;
      border-top: 1px solid #374151;
      color: #9ca3af;
    }

    @media (max-width: 768px) {
      .hero-section {
        flex-direction: column;
        text-align: center;
        padding: 4rem 1rem;
      }

      .hero-title {
        font-size: 2.5rem;
      }

      .hero-buttons {
        justify-content: center;
      }

      .section-title {
        font-size: 2rem;
      }

      .features-grid,
      .pricing-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class LandingComponent {
  features = [
    {
      icon: 'pi pi-shield',
      title: 'Multi-Tenant Architecture',
      description: 'Built for scale with complete tenant isolation and secure data separation.'
    },
    {
      icon: 'pi pi-chart-line',
      title: 'Advanced Analytics',
      description: 'Real-time insights and comprehensive reporting to drive business decisions.'
    },
    {
      icon: 'pi pi-users',
      title: 'User Management',
      description: 'Complete user lifecycle management with role-based access control.'
    },
    {
      icon: 'pi pi-credit-card',
      title: 'Billing & Payments',
      description: 'Seamless Stripe integration for subscription management and payments.'
    },
    {
      icon: 'pi pi-envelope',
      title: 'Email System',
      description: 'Transactional emails with beautiful templates and automation.'
    },
    {
      icon: 'pi pi-cloud-upload',
      title: 'File Management',
      description: 'Secure file upload and storage with AWS S3 integration.'
    }
  ];

  pricingPlans = [
    {
      name: 'Starter',
      price: '0',
      features: [
        'Up to 5 users',
        'Basic features',
        'Community support',
        '1GB storage'
      ],
      buttonText: 'Start Free',
      buttonClass: 'p-button-outlined'
    },
    {
      name: 'Professional',
      price: '29',
      features: [
        'Up to 50 users',
        'Advanced features',
        'Priority support',
        '10GB storage',
        'Custom branding'
      ],
      buttonText: 'Start Trial',
      buttonClass: 'p-button-primary'
    },
    {
      name: 'Enterprise',
      price: '99',
      features: [
        'Unlimited users',
        'All features',
        '24/7 support',
        'Unlimited storage',
        'Custom integrations',
        'Dedicated account manager'
      ],
      buttonText: 'Contact Sales',
      buttonClass: 'p-button-success'
    }
  ];

  constructor(private router: Router) {}

  navigateToSignup() {
    this.router.navigate(['/auth/register']);
  }

  watchDemo() {
    // Implement demo video functionality
    console.log('Watch demo clicked');
  }

  selectPlan(plan: any) {
    if (plan.name === 'Starter') {
      this.navigateToSignup();
    } else if (plan.name === 'Professional') {
      this.navigateToSignup();
    } else {
      // Contact sales for enterprise
      console.log('Contact sales for enterprise plan');
    }
  }
} 