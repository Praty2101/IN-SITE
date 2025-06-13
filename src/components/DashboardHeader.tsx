
import React from 'react';
import { Calendar, Database } from 'lucide-react';

export const DashboardHeader = () => {
  const currentDate = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <header className="bg-card border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Service Provider Dashboard</h1>
            <p className="text-muted-foreground flex items-center gap-2 mt-1">
              <Calendar className="h-4 w-4" />
              {currentDate}
            </p>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Database className="h-5 w-5" />
            <span className="text-sm font-medium">System Online</span>
          </div>
        </div>
      </div>
    </header>
  );
};
