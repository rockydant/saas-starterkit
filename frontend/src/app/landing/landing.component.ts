import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  template: `
    <div class="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800">
      <!-- Hero Section -->
      <section class="flex items-center justify-between px-8 py-24 max-w-7xl mx-auto text-white">
        <div class="flex-1 max-w-2xl">
          <h1 class="text-5xl font-bold mb-6 leading-tight">
            Transform Your Business with
            <span class="text-yellow-300">SaaS Platform</span>
          </h1>
          <p class="text-xl mb-8 opacity-90 leading-relaxed">
            The complete multi-tenant SaaS solution for modern businesses. 
            Scale effortlessly, manage efficiently, and grow sustainably.
          </p>
          <div class="flex gap-4 flex-wrap">
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
        <div class="flex-1 text-center">
          <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-8 shadow-2xl">
            <div class="w-96 h-64 bg-gradient-to-br from-blue-400 to-purple-500 rounded-xl flex items-center justify-center">
              <i class="pi pi-chart-line text-6xl text-white"></i>
            </div>
            <p class="text-white/80 mt-4 text-sm">Dashboard Preview</p>
          </div>
        </div>
      </section>

      <!-- Features Section -->
      <section class="py-24 bg-white">
        <div class="max-w-7xl mx-auto px-8">
          <h2 class="text-4xl font-bold text-center text-gray-900 mb-16">Why Choose Our Platform?</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div class="text-center p-8 bg-gray-50 rounded-2xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div class="text-5xl text-blue-600 mb-4">
                <i class="pi pi-shield"></i>
              </div>
              <h3 class="text-xl font-semibold mb-4 text-gray-900">Multi-Tenant Architecture</h3>
              <p class="text-gray-600 leading-relaxed">Built for scale with complete tenant isolation and secure data separation.</p>
            </div>
            <div class="text-center p-8 bg-gray-50 rounded-2xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div class="text-5xl text-blue-600 mb-4">
                <i class="pi pi-chart-line"></i>
              </div>
              <h3 class="text-xl font-semibold mb-4 text-gray-900">Advanced Analytics</h3>
              <p class="text-gray-600 leading-relaxed">Real-time insights and comprehensive reporting to drive business decisions.</p>
            </div>
            <div class="text-center p-8 bg-gray-50 rounded-2xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div class="text-5xl text-blue-600 mb-4">
                <i class="pi pi-users"></i>
              </div>
              <h3 class="text-xl font-semibold mb-4 text-gray-900">User Management</h3>
              <p class="text-gray-600 leading-relaxed">Complete user lifecycle management with role-based access control.</p>
            </div>
            <div class="text-center p-8 bg-gray-50 rounded-2xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div class="text-5xl text-blue-600 mb-4">
                <i class="pi pi-credit-card"></i>
              </div>
              <h3 class="text-xl font-semibold mb-4 text-gray-900">Billing & Payments</h3>
              <p class="text-gray-600 leading-relaxed">Seamless Stripe integration for subscription management and payments.</p>
            </div>
            <div class="text-center p-8 bg-gray-50 rounded-2xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div class="text-5xl text-blue-600 mb-4">
                <i class="pi pi-envelope"></i>
              </div>
              <h3 class="text-xl font-semibold mb-4 text-gray-900">Email System</h3>
              <p class="text-gray-600 leading-relaxed">Transactional emails with beautiful templates and automation.</p>
            </div>
            <div class="text-center p-8 bg-gray-50 rounded-2xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div class="text-5xl text-blue-600 mb-4">
                <i class="pi pi-cloud-upload"></i>
              </div>
              <h3 class="text-xl font-semibold mb-4 text-gray-900">File Management</h3>
              <p class="text-gray-600 leading-relaxed">Secure file upload and storage with AWS S3 integration.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Pricing Section -->
      <section class="py-24 bg-gray-50">
        <div class="max-w-7xl mx-auto px-8">
          <h2 class="text-4xl font-bold text-center text-gray-900 mb-16">Simple, Transparent Pricing</h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div class="bg-white rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div class="mb-8">
                <h3 class="text-2xl font-bold text-gray-900 mb-4">Starter</h3>
                <div class="text-4xl font-bold text-blue-600 mb-2">$0</div>
                <div class="text-gray-600">/month</div>
              </div>
              <ul class="text-left mb-8 space-y-3">
                <li class="flex items-center">
                  <i class="pi pi-check text-green-500 mr-3"></i>
                  <span class="text-gray-700">Up to 5 users</span>
                </li>
                <li class="flex items-center">
                  <i class="pi pi-check text-green-500 mr-3"></i>
                  <span class="text-gray-700">Basic features</span>
                </li>
                <li class="flex items-center">
                  <i class="pi pi-check text-green-500 mr-3"></i>
                  <span class="text-gray-700">Community support</span>
                </li>
                <li class="flex items-center">
                  <i class="pi pi-check text-green-500 mr-3"></i>
                  <span class="text-gray-700">1GB storage</span>
                </li>
              </ul>
              <p-button 
                label="Start Free" 
                class="p-button-outlined w-full"
                (click)="selectPlan(pricingPlans[0])">
              </p-button>
            </div>
            <div class="bg-white rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 border-blue-500 relative">
              <div class="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span class="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-semibold">Most Popular</span>
              </div>
              <div class="mb-8">
                <h3 class="text-2xl font-bold text-gray-900 mb-4">Professional</h3>
                <div class="text-4xl font-bold text-blue-600 mb-2">$29</div>
                <div class="text-gray-600">/month</div>
              </div>
              <ul class="text-left mb-8 space-y-3">
                <li class="flex items-center">
                  <i class="pi pi-check text-green-500 mr-3"></i>
                  <span class="text-gray-700">Up to 50 users</span>
                </li>
                <li class="flex items-center">
                  <i class="pi pi-check text-green-500 mr-3"></i>
                  <span class="text-gray-700">Advanced features</span>
                </li>
                <li class="flex items-center">
                  <i class="pi pi-check text-green-500 mr-3"></i>
                  <span class="text-gray-700">Priority support</span>
                </li>
                <li class="flex items-center">
                  <i class="pi pi-check text-green-500 mr-3"></i>
                  <span class="text-gray-700">10GB storage</span>
                </li>
                <li class="flex items-center">
                  <i class="pi pi-check text-green-500 mr-3"></i>
                  <span class="text-gray-700">Custom branding</span>
                </li>
              </ul>
              <p-button 
                label="Start Trial" 
                class="p-button-primary w-full"
                (click)="selectPlan(pricingPlans[1])">
              </p-button>
            </div>
            <div class="bg-white rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div class="mb-8">
                <h3 class="text-2xl font-bold text-gray-900 mb-4">Enterprise</h3>
                <div class="text-4xl font-bold text-blue-600 mb-2">$99</div>
                <div class="text-gray-600">/month</div>
              </div>
              <ul class="text-left mb-8 space-y-3">
                <li class="flex items-center">
                  <i class="pi pi-check text-green-500 mr-3"></i>
                  <span class="text-gray-700">Unlimited users</span>
                </li>
                <li class="flex items-center">
                  <i class="pi pi-check text-green-500 mr-3"></i>
                  <span class="text-gray-700">All features</span>
                </li>
                <li class="flex items-center">
                  <i class="pi pi-check text-green-500 mr-3"></i>
                  <span class="text-gray-700">24/7 support</span>
                </li>
                <li class="flex items-center">
                  <i class="pi pi-check text-green-500 mr-3"></i>
                  <span class="text-gray-700">Unlimited storage</span>
                </li>
                <li class="flex items-center">
                  <i class="pi pi-check text-green-500 mr-3"></i>
                  <span class="text-gray-700">Custom integrations</span>
                </li>
                <li class="flex items-center">
                  <i class="pi pi-check text-green-500 mr-3"></i>
                  <span class="text-gray-700">Dedicated account manager</span>
                </li>
              </ul>
              <p-button 
                label="Contact Sales" 
                class="p-button-success w-full"
                (click)="selectPlan(pricingPlans[2])">
              </p-button>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA Section -->
      <section class="py-24 bg-gradient-to-r from-blue-600 to-blue-800 text-white text-center">
        <div class="max-w-4xl mx-auto px-8">
          <h2 class="text-4xl font-bold mb-6">Ready to Transform Your Business?</h2>
          <p class="text-xl mb-8 opacity-90">Join thousands of businesses already using our platform</p>
          <p-button 
            label="Start Your Free Trial" 
            icon="pi pi-arrow-right" 
            class="p-button-primary p-button-lg"
            (click)="navigateToSignup()">
          </p-button>
        </div>
      </section>

      <!-- Footer -->
      <footer class="bg-gray-900 text-white py-16">
        <div class="max-w-7xl mx-auto px-8">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h4 class="text-lg font-semibold mb-4">Product</h4>
              <ul class="space-y-2">
                <li><a href="#features" class="text-gray-300 hover:text-white transition-colors">Features</a></li>
                <li><a href="#pricing" class="text-gray-300 hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#demo" class="text-gray-300 hover:text-white transition-colors">Demo</a></li>
              </ul>
            </div>
            <div>
              <h4 class="text-lg font-semibold mb-4">Company</h4>
              <ul class="space-y-2">
                <li><a href="#about" class="text-gray-300 hover:text-white transition-colors">About</a></li>
                <li><a href="#contact" class="text-gray-300 hover:text-white transition-colors">Contact</a></li>
                <li><a href="#careers" class="text-gray-300 hover:text-white transition-colors">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 class="text-lg font-semibold mb-4">Support</h4>
              <ul class="space-y-2">
                <li><a href="#help" class="text-gray-300 hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#docs" class="text-gray-300 hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#status" class="text-gray-300 hover:text-white transition-colors">Status</a></li>
              </ul>
            </div>
          </div>
          <div class="text-center pt-8 border-t border-gray-800">
            <p class="text-gray-400">&copy; 2024 SaaS Platform. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  `,
  styles: []
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