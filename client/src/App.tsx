import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navbar from "@/components/navbar";
import CustomCursor from "@/components/cursor";
import Footer from "@/components/footer";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Work from "@/components/projects";
import About from "@/components/about";
import Contact from "@/components/contact";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/work" component={Work} />
      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <div className="cursor-none md:cursor-none">
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <CustomCursor />
          <Navbar />
          <Toaster />
          <Router />
          <Footer />
        </TooltipProvider>
      </QueryClientProvider>
    </div>
  );
}

export default App;
