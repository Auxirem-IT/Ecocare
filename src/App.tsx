import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PrivateRoute } from "@/components/PrivateRoute";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import IndividualDashboard from "./pages/dashboard/IndividualDashboard";
import CorporateDashboard from "./pages/dashboard/CorporateDashboard";
import SchoolDashboard from "./pages/dashboard/SchoolDashboard";
import CityDashboard from "./pages/dashboard/CityDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard/individual" element={<PrivateRoute allowedRoles={['individual']}><IndividualDashboard /></PrivateRoute>} />
          <Route path="/dashboard/corporate" element={<PrivateRoute allowedRoles={['corporate']}><CorporateDashboard /></PrivateRoute>} />
          <Route path="/dashboard/school" element={<PrivateRoute allowedRoles={['school']}><SchoolDashboard /></PrivateRoute>} />
          <Route path="/dashboard/city" element={<PrivateRoute allowedRoles={['city']}><CityDashboard /></PrivateRoute>} />
          {/* Catch sub-routes for each dashboard */}
          <Route path="/dashboard/individual/*" element={<PrivateRoute allowedRoles={['individual']}><IndividualDashboard /></PrivateRoute>} />
          <Route path="/dashboard/corporate/*" element={<PrivateRoute allowedRoles={['corporate']}><CorporateDashboard /></PrivateRoute>} />
          <Route path="/dashboard/school/*" element={<PrivateRoute allowedRoles={['school']}><SchoolDashboard /></PrivateRoute>} />
          <Route path="/dashboard/city/*" element={<PrivateRoute allowedRoles={['city']}><CityDashboard /></PrivateRoute>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
