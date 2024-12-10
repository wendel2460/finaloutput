import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

// Processed expense data
const expenseData = [
  { date: 'Nov 15', Ceres: 90, Lunch: 80, Tricycle: 30, Total: 200 },
  { date: 'Nov 18', Ceres: 105, Lunch: 60, Tricycle: 30, Contribution: 50, Total: 245 },
  { date: 'Nov 19', Ceres: 105, Lunch: 15, Tricycle: 30, Total: 150 },
  { date: 'Nov 20', Ceres: 90, Lunch: 60, Tricycle: 30, Total: 180 },
  { date: 'Nov 21', Ceres: 90, Lunch: 60, Tricycle: 30, Total: 180 },
  { date: 'Nov 22', Ceres: 90, Lunch: 60, Tricycle: 30, Total: 180 },
  { date: 'Nov 25', Ceres: 105, Lunch: 60, Tricycle: 30, Total: 195 },
  { date: 'Nov 26', Ceres: 105, Lunch: 60, Tricycle: 30, Jeep: 25, Total: 220 },
  { date: 'Nov 27', Ceres: 105, Lunch: 135, Tricycle: 30, Jeep: 30, Total: 300 },
  { date: 'Nov 28', Ceres: 105, Lunch: 60, Tricycle: 30, Total: 195 },
  { date: 'Nov 29', Ceres: 90, Lunch: 60, Tricycle: 30, Total: 180 },
  { date: 'Dec 2', Ceres: 90, Lunch: 60, Tricycle: 30, Coffee: 60, Donation: 10, Total: 250 },
  { date: 'Dec 3', Ceres: 120, Lunch: 60, Tricycle: 30, Total: 210 },
  { date: 'Dec 4', Ceres: 120, Lunch: 60, Tricycle: 30, Total: 210 },
  { date: 'Dec 5', Ceres: 120, Lunch: 50, Tricycle: 55, Total: 225 },
  { date: 'Dec 6', Ceres: 120, Lunch: 50, Tricycle: 55, Total: 225 },
];

// Weekly aggregation
const weeklyData = [
  { week: 'Nov 15-21', Total: 945 },
  { week: 'Nov 22-28', Total: 1090 },
  { week: 'Dec 2-6', Total: 910 },
];

const ExpenseTracker = () => {
  const [view, setView] = useState('daily');

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span>Expense Tracker</span>
            <div className="space-x-2">
              <button 
                onClick={() => setView('daily')} 
                className={`px-4 py-2 rounded ${view === 'daily' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              >
                Daily
              </button>
              <button 
                onClick={() => setView('weekly')} 
                className={`px-4 py-2 rounded ${view === 'weekly' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              >
                Weekly
              </button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {view === 'daily' ? (
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={expenseData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="Total" stroke="#8884d8" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="Ceres" stroke="#82ca9d" />
                <Line type="monotone" dataKey="Lunch" stroke="#ffc658" />
                <Line type="monotone" dataKey="Tricycle" stroke="#ff7300" />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis domain={[0, 1200]} />
                <Tooltip />
                <Line type="monotone" dataKey="Total" stroke="#8884d8" activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          )}
          <div className="mt-4 text-center">
            <p className="font-bold">Daily Allowance: ₱300</p>
            <p className="text-sm text-gray-600">
              {view === 'daily' 
                ? expenseData.map(entry => 
                    `${entry.date}: ${entry.Total > 300 ? '❌ Exceeded' : '✅ Within'} (₱${entry.Total})`
                  ).join(' | ')
                : weeklyData.map(entry => 
                    `${entry.week}: ${entry.Total > 1500 ? '❌ Exceeded' : '✅ Within'} (₱${entry.Total})`
                  ).join(' | ')
              }
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExpenseTracker;
