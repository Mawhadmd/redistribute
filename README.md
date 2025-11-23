# Redistribute - Content Automation Service

---
<img width="1896" height="902" alt="image" src="https://github.com/user-attachments/assets/4130840b-5e16-4a2f-bf8f-a39a4d0558d7" />


**Project Title:** Redistribute - Content Distribution Service (Inspired by Repurpose)

**Project Type:** Web Application (Phase 1 - Frontend Demonstration)

**Development Status:** Alpha/Testing Phase

**Author:** Mohammed Awad

**Date:** November 2025

**Institution:** Lebansese Internation University

---

## Abstract

Redistribute is an innovative content automation service designed to solve a common problem faced by content creators: the time-consuming process of uploading videos to multiple platforms. This project presents a solution where creators can upload their content to a single platform, and the service automatically redistributes it across multiple social media platforms including YouTube, Instagram, and potentially TikTok.

The current implementation represents Phase 1 of the project, focusing on the frontend architecture and user interface design. Built with modern web technologies including React, React Router, and Tailwind CSS, the application demonstrates the potential user experience and workflow management capabilities of the platform.

This phase serves as a proof-of-concept showcasing React's frontend capabilities with demo data and interface components. The application includes a landing page, dashboard with workflow management, analytics views, account integration, contact forms, and a dynamic pricing page. While functionality is currently limited due to backend dependencies, the frontend architecture establishes a solid foundation for future development phases.

**Key Features:**
- Multi-platform content distribution interface
- Workflow management dashboard
- Analytics visualization
- Account integration system
- Dynamic pricing calculator
- Responsive design with custom theming

---

## System Design

### 1. Architecture Overview

The Redistribute application follows a modern single-page application (SPA) architecture with the following components:

```
┌─────────────────────────────────────────┐
│         User Interface Layer            │
│   (React Components + Tailwind CSS)     │
└─────────────────────────────────────────┘
                    │
┌─────────────────────────────────────────┐
│         Routing Layer                   │
│         (React Router)                  │
└─────────────────────────────────────────┘
                    │
┌─────────────────────────────────────────┐
│         State Management                │
│         (React Hooks)                   │
└─────────────────────────────────────────┘
                    │
┌─────────────────────────────────────────┐
│         Future: Backend API Layer       │
│    (Planned for Phase 2)                │
└─────────────────────────────────────────┘
```

### 2. Application Structure

The application consists of the following main modules:

#### **2.1 Landing Page**
- Introduction to the service
- Value proposition presentation
- Call-to-action elements
- Feature highlights

#### **2.2 Dashboard**
- **Workflows:** Manage content distribution workflows
- **Analytics:** View distribution performance metrics
- **Accounts:** Integrate and manage social media accounts
- **Settings:** Configure automation preferences

#### **2.3 Contact Forms**
- User inquiry submission
- Support request handling
- Feedback collection

#### **2.4 Pricing Page**
- Plan comparison
- Monthly/Yearly pricing toggle
- Feature breakdown by tier
- Dynamic price calculation


#### **2.4 Shopping Page**
- User can add items to the cart
- User can filter items
- User can search
- See "item added" notifications

### 3. Design Patterns

**Component-Based Architecture:** The application utilizes React's component-based structure for reusability and maintainability.

**Client-Side Routing:** React Router handles navigation without page reloads, providing a seamless user experience.

**Responsive Design:** Tailwind CSS utility classes enable mobile-first responsive design.

**State Management:** React Hooks (useState, useEffect) manage component state and side effects.

### 4. Color Scheme

Custom color palette defined in Tailwind configuration:
- **Primary:** White (main backgrounds)
- **Secondary:** Black (text and contrast elements)
- **Accent:** Light Blue (interactive elements and highlights)

---

## Technologies Used

**React** - JavaScript library for building user interfaces
**React Router** - Declarative routing for React applications
**Tailwind CSS** - Utility-first CSS framework
**Vercel** - Cloud platform for static sites and serverless functions
**npm** - Node package manager
**Git/GitHub** - Version control and collaboration

---

## Code Snippets (Key Parts Only)

### 1. Dynamic Pricing Calculation

This component demonstrates the core pricing logic that switches between monthly and yearly pricing tiers:

```typescript
useEffect(() => {
  if (ismonthly) {
    setPlans(
      plans.map((plan, idx) => ({
        ...plan,
        pricePerDay: basePrices[idx],
      }))
    );
  } else {
    setPlans(
      plans.map((plan, idx) => ({
        ...plan,
        pricePerDay: Number(((basePrices[idx] * 335) / 365).toFixed(2)),
      }))
    );
  }
  return () => {};
}, [ismonthly]);
```

**Explanation:**
- Monitors the `ismonthly` state variable
- Recalculates pricing when billing period changes
- Monthly pricing uses base prices directly
- Yearly pricing applies 335-day discount (30-day savings)
- Converts daily rate and rounds to 2 decimal places

### 2. Installation and Startup

```bash
# Clone the repository
git clone https://github.com/Mawhadmd/redistribute

# Navigate to project directory
cd redistribute

# Install dependencies
npm i

# Start development server
npm run start
```

### 3. Tailwind Configuration (Custom Colors)

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
       primary: '#FFF',
        secondary: '#2A2E37',
        accent: '#28D7FF',
      }
    }
  }
}
```

---

## Project Structure

```
[src]
    ├── App.css
    ├── App.test.js
    ├── App.tsx
    ├── [assets]
        ├── facebook.webp
        ├── instagram.webp
        ├── tiktok-icon-3-1.webp
        └── youtube-shorts-icon-1-1.webp
    ├── [components]
        ├── [buttons]
            ├── borderedbutton.tsx
            └── filledbutton.tsx
        ├── ContactCards.tsx
        ├── EmailContact.tsx
        ├── Footer.tsx
        ├── Navbar.tsx
        ├── PhoneNavBar.tsx
        ├── PricingCards.tsx
        └── TrustedPartners.tsx
    ├── custom.d.ts
    ├── index.css
    ├── index.js
    ├── logo.svg
    ├── [pages]
        ├── [auth]
            ├── Login.tsx
            └── Register.tsx
        ├── [Dashboard]
            ├── Accounts.tsx
            ├── Analytics.tsx
            ├── Billing.tsx
            ├── Content.tsx
            ├── DashboardLayout.tsx
            ├── Overview.tsx
            ├── Schedule.tsx
            ├── Settings.tsx
            └── Workflows.tsx
        ├── ErrorPage.tsx
        ├── Home.tsx
        ├── [Landing]
            ├── About.tsx
            ├── Contact.tsx
            ├── ContentCreators.tsx
            ├── Home.tsx
            ├── Pricing.tsx
            └── SmallBusiness.tsx
        ├── [Policies]
            ├── PrivacyPolicy.tsx
            └── TermsAndConditions.tsx
        └── Shopping.tsx
    ├── reportWebVitals.js
    └── setupTests.js
```
Generated Using VScode extension
---

## Current Status and Future Development

### Phase 1 (Current - Completed)
- ✅ Frontend UI/UX design
- ✅ Component architecture
- ✅ Routing implementation
- ✅ Responsive design
- ✅ Demo data integration

### Phase 2 (Planned)
- ⏳ Backend API development
- ⏳ Platform integration (YouTube, Instagram, TikTok)
- ⏳ User authentication
- ⏳ Video upload and processing
- ⏳ Automated distribution workflow

### Phase 3 (Future)
- ⏳ Analytics implementation
- ⏳ Advanced workflow customization
- ⏳ Additional platform support
- ⏳ Performance optimization
- ⏳ Scale testing

