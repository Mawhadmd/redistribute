// @ts-ignore: side-effect import of CSS without type declarations
import "./App.css";
import Navbar from "./components/Navbar.tsx";
import { Routes, Route } from "react-router";
import Home from "./pages/Landing/Home.tsx";
import Pricing from "./pages/Landing/Pricing.tsx";
import SmallBusiness from "./pages/Landing/SmallBusiness.tsx";
import Footer from "./components/Footer.tsx";
import About from "./pages/Landing/About.tsx";
import ContentCreators from "./pages/Landing/ContentCreators.tsx";
import Contact from "./pages/Landing/Contact.tsx";
import ErrorPage from "./pages/ErrorPage.tsx";
import EmailContact from "./components/EmailContact.tsx";
import TermsAndConditions from "./pages/Policies/TermsAndConditions.tsx";
import PrivacyPolicy from "./pages/Policies/PrivacyPolicy.tsx";
import Register from "./pages/auth/Register.tsx";
import Login from "./pages/auth/Login.tsx";
import DashboardLayout from "./pages/Dashboard/DashboardLayout.tsx";
import Overview from "./pages/Dashboard/Overview.tsx";
import Workflows from "./pages/Dashboard/Workflows.tsx";
import Content from "./pages/Dashboard/Content.tsx";
import Accounts from "./pages/Dashboard/Accounts.tsx";
import Schedule from "./pages/Dashboard/Schedule.tsx";
import Analytics from "./pages/Dashboard/Analytics.tsx";
import Billing from "./pages/Dashboard/Billing.tsx";
import Settings from "./pages/Dashboard/Settings.tsx";
import Shopping from "./pages/Shopping.tsx";

// Landing page layout wrapper with Navbar and Footer
function LandingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-secondary flex flex-col min-h-screen bg-primary">
      <header className="App-header">
        <Navbar />
      </header>
      <main className="flex-1 flex flex-col">{children}</main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Routes>
      {/* Landing pages with Navbar and Footer */}
      <Route
        path="/"
        element={
          <LandingLayout>
            <Home />
          </LandingLayout>
        }
      />
      <Route
        path="/pricing"
        element={
          <LandingLayout>
            <Pricing />
          </LandingLayout>
        }
      />
      <Route
        path="/small-business"
        element={
          <LandingLayout>
            <SmallBusiness />
               <Shopping/>
          </LandingLayout>
        }
      />
      <Route
        path="/shopping"
        element={
          <LandingLayout>
      
               <Shopping/>
          </LandingLayout>
        }
      />
      <Route
        path="/contact"
        element={
          <LandingLayout>
            <Contact />
          </LandingLayout>
        }
      />
      <Route
        path="/about"
        element={
          <LandingLayout>
            <About />
          </LandingLayout>
        }
      />
      <Route
        path="/content-creators"
        element={
          <LandingLayout>
            <ContentCreators />
            <Shopping/>
          </LandingLayout>
        }
      />
      <Route
        path="/contact/email"
        element={
          <LandingLayout>
            <EmailContact />
          </LandingLayout>
        }
      />
      <Route
        path="/terms-and-conditions"
        element={
          <LandingLayout>
            <TermsAndConditions />
          </LandingLayout>
        }
      />
      <Route
        path="/privacy-policy"
        element={
          <LandingLayout>
            <PrivacyPolicy />
          </LandingLayout>
        }
      />

      {/* Auth pages without Navbar and Footer */}
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />

      {/* Dashboard with its own layout */}
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<Overview />} />
        <Route path="workflows" element={<Workflows />} />
        <Route path="content" element={<Content />} />
        <Route path="accounts" element={<Accounts />} />
        <Route path="schedule" element={<Schedule />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="billing" element={<Billing />} />
        <Route path="settings" element={<Settings />} />
      </Route>

      {/* Error page without layout */}
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}

export default App;
