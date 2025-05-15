"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  BarChart3,
  LineChart,
  PieChart,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  Target,
  Briefcase,
  ArrowUpRight,
  ArrowDownRight,
  Percent,
  Download,
} from "lucide-react"

// Mock data for the dashboard
const financialMetrics = {
  revenue: {
    current: 24.8,
    previous: 21.5,
    change: 15.3,
    target: 25.0,
    unit: "M",
    trend: "up",
  },
  profit: {
    current: 5.2,
    previous: 4.3,
    change: 20.9,
    target: 5.5,
    unit: "M",
    trend: "up",
  },
  expenses: {
    current: 18.1,
    previous: 16.2,
    change: 11.7,
    target: 17.5,
    unit: "M",
    trend: "up",
  },
  cashFlow: {
    current: 3.8,
    previous: 3.2,
    change: 18.8,
    target: 4.0,
    unit: "M",
    trend: "up",
  },
}

const operationalMetrics = {
  customerAcquisition: {
    current: 1250,
    previous: 980,
    change: 27.6,
    target: 1300,
    trend: "up",
  },
  retention: {
    current: 87,
    previous: 82,
    change: 6.1,
    target: 90,
    unit: "%",
    trend: "up",
  },
  employeeCount: {
    current: 142,
    previous: 128,
    change: 10.9,
    target: 150,
    trend: "up",
  },
  productivity: {
    current: 94,
    previous: 89,
    change: 5.6,
    target: 95,
    unit: "%",
    trend: "up",
  },
}

const quarterlyRevenue = [
  { quarter: "Q1 2024", value: 5.2 },
  { quarter: "Q2 2024", value: 6.1 },
  { quarter: "Q3 2024", value: 6.5 },
  { quarter: "Q4 2024", value: 7.0 },
]

const marketShare = [
  { name: "Your Company", value: 28 },
  { name: "Competitor A", value: 22 },
  { name: "Competitor B", value: 18 },
  { name: "Competitor C", value: 15 },
  { name: "Others", value: 17 },
]

const departmentPerformance = [
  { name: "Sales", target: 100, current: 112 },
  { name: "Marketing", target: 100, current: 94 },
  { name: "Product", target: 100, current: 105 },
  { name: "Engineering", target: 100, current: 98 },
  { name: "Customer Support", target: 100, current: 108 },
]

export function CEODashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [timeframe, setTimeframe] = useState("quarterly")

  return (
    <Card className="w-full shadow-lg border-2">
      <CardHeader className="bg-gradient-to-r from-primary/20 to-primary/5 rounded-t-lg">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-primary" />
              Executive Performance Dashboard
            </CardTitle>
            <CardDescription>Key metrics and performance indicators for executive review</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Select value={timeframe} onValueChange={setTimeframe}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Select timeframe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="quarterly">Quarterly</SelectItem>
                <SelectItem value="yearly">Yearly</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <Download className="h-4 w-4" />
              <span>Export</span>
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-4 w-full rounded-none">
            <TabsTrigger value="overview" className="data-[state=active]:bg-primary/10">
              Overview
            </TabsTrigger>
            <TabsTrigger value="financial" className="data-[state=active]:bg-primary/10">
              Financial
            </TabsTrigger>
            <TabsTrigger value="operational" className="data-[state=active]:bg-primary/10">
              Operational
            </TabsTrigger>
            <TabsTrigger value="strategic" className="data-[state=active]:bg-primary/10">
              Strategic
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="p-4 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Revenue Card */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Revenue</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold">
                        ${financialMetrics.revenue.current}
                        {financialMetrics.revenue.unit}
                      </div>
                      <div className="flex items-center mt-1">
                        {financialMetrics.revenue.trend === "up" ? (
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-800/20 dark:text-green-400 flex items-center gap-1">
                            <ArrowUpRight className="h-3 w-3" />
                            {financialMetrics.revenue.change}%
                          </Badge>
                        ) : (
                          <Badge className="bg-red-100 text-red-800 hover:bg-red-100 dark:bg-red-800/20 dark:text-red-400 flex items-center gap-1">
                            <ArrowDownRight className="h-3 w-3" />
                            {financialMetrics.revenue.change}%
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <DollarSign className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <div className="mt-3">
                    <div className="flex justify-between text-xs text-muted-foreground mb-1">
                      <span>Progress to target</span>
                      <span>
                        {Math.round((financialMetrics.revenue.current / financialMetrics.revenue.target) * 100)}%
                      </span>
                    </div>
                    <Progress
                      value={(financialMetrics.revenue.current / financialMetrics.revenue.target) * 100}
                      className="h-1.5"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Profit Card */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Profit</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold">
                        ${financialMetrics.profit.current}
                        {financialMetrics.profit.unit}
                      </div>
                      <div className="flex items-center mt-1">
                        {financialMetrics.profit.trend === "up" ? (
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-800/20 dark:text-green-400 flex items-center gap-1">
                            <ArrowUpRight className="h-3 w-3" />
                            {financialMetrics.profit.change}%
                          </Badge>
                        ) : (
                          <Badge className="bg-red-100 text-red-800 hover:bg-red-100 dark:bg-red-800/20 dark:text-red-400 flex items-center gap-1">
                            <ArrowDownRight className="h-3 w-3" />
                            {financialMetrics.profit.change}%
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <TrendingUp className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <div className="mt-3">
                    <div className="flex justify-between text-xs text-muted-foreground mb-1">
                      <span>Progress to target</span>
                      <span>
                        {Math.round((financialMetrics.profit.current / financialMetrics.profit.target) * 100)}%
                      </span>
                    </div>
                    <Progress
                      value={(financialMetrics.profit.current / financialMetrics.profit.target) * 100}
                      className="h-1.5"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Customer Acquisition Card */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">New Customers</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold">{operationalMetrics.customerAcquisition.current}</div>
                      <div className="flex items-center mt-1">
                        {operationalMetrics.customerAcquisition.trend === "up" ? (
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-800/20 dark:text-green-400 flex items-center gap-1">
                            <ArrowUpRight className="h-3 w-3" />
                            {operationalMetrics.customerAcquisition.change}%
                          </Badge>
                        ) : (
                          <Badge className="bg-red-100 text-red-800 hover:bg-red-100 dark:bg-red-800/20 dark:text-red-400 flex items-center gap-1">
                            <ArrowDownRight className="h-3 w-3" />
                            {operationalMetrics.customerAcquisition.change}%
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Users className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <div className="mt-3">
                    <div className="flex justify-between text-xs text-muted-foreground mb-1">
                      <span>Progress to target</span>
                      <span>
                        {Math.round(
                          (operationalMetrics.customerAcquisition.current /
                            operationalMetrics.customerAcquisition.target) *
                            100,
                        )}
                        %
                      </span>
                    </div>
                    <Progress
                      value={
                        (operationalMetrics.customerAcquisition.current /
                          operationalMetrics.customerAcquisition.target) *
                        100
                      }
                      className="h-1.5"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Retention Card */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Customer Retention</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold">{operationalMetrics.retention.current}%</div>
                      <div className="flex items-center mt-1">
                        {operationalMetrics.retention.trend === "up" ? (
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-800/20 dark:text-green-400 flex items-center gap-1">
                            <ArrowUpRight className="h-3 w-3" />
                            {operationalMetrics.retention.change}%
                          </Badge>
                        ) : (
                          <Badge className="bg-red-100 text-red-800 hover:bg-red-100 dark:bg-red-800/20 dark:text-red-400 flex items-center gap-1">
                            <ArrowDownRight className="h-3 w-3" />
                            {operationalMetrics.retention.change}%
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Percent className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <div className="mt-3">
                    <div className="flex justify-between text-xs text-muted-foreground mb-1">
                      <span>Progress to target</span>
                      <span>
                        {Math.round((operationalMetrics.retention.current / operationalMetrics.retention.target) * 100)}
                        %
                      </span>
                    </div>
                    <Progress
                      value={(operationalMetrics.retention.current / operationalMetrics.retention.target) * 100}
                      className="h-1.5"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Revenue Trend Chart */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Revenue Trend</CardTitle>
                  <CardDescription>Quarterly revenue performance</CardDescription>
                </CardHeader>
                <CardContent className="px-2">
                  <div className="h-[240px] flex items-end justify-between px-2">
                    {quarterlyRevenue.map((item, index) => (
                      <div key={index} className="flex flex-col items-center">
                        <div
                          className="w-12 bg-primary/80 hover:bg-primary transition-colors rounded-t-sm"
                          style={{ height: `${(item.value / 7) * 200}px` }}
                        ></div>
                        <div className="mt-2 text-xs text-muted-foreground">{item.quarter}</div>
                        <div className="mt-1 text-sm font-medium">${item.value}M</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Market Share Chart */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Market Share</CardTitle>
                  <CardDescription>Comparison with competitors</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-center">
                    <div className="relative h-[240px] w-[240px]">
                      <PieChart className="h-full w-full text-muted-foreground opacity-10" />
                      <div className="absolute inset-0 flex items-center justify-center flex-col">
                        <div className="text-4xl font-bold text-primary">{marketShare[0].value}%</div>
                        <div className="text-sm text-muted-foreground">Market Share</div>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {marketShare.map((item, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div
                          className={`h-3 w-3 rounded-full ${index === 0 ? "bg-primary" : `bg-primary/60`}`}
                          style={{ opacity: index === 0 ? 1 : 1 - index * 0.15 }}
                        ></div>
                        <div className="text-sm">
                          {item.name}: <span className="font-medium">{item.value}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Department Performance */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Department Performance</CardTitle>
                <CardDescription>Performance against targets</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {departmentPerformance.map((dept, index) => (
                    <div key={index}>
                      <div className="flex justify-between mb-1">
                        <div className="text-sm font-medium">{dept.name}</div>
                        <div className="text-sm font-medium">
                          {dept.current > dept.target ? (
                            <span className="text-green-600">+{dept.current - dept.target}%</span>
                          ) : dept.current < dept.target ? (
                            <span className="text-red-600">-{dept.target - dept.current}%</span>
                          ) : (
                            <span>On Target</span>
                          )}
                        </div>
                      </div>
                      <div className="relative pt-1">
                        <div className="overflow-hidden h-2 text-xs flex rounded bg-primary/10">
                          <div
                            className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${
                              dept.current >= dept.target ? "bg-green-500" : "bg-primary"
                            }`}
                            style={{ width: `${dept.current}%` }}
                          ></div>
                        </div>
                        <div className="absolute top-0 left-0 w-full h-2 flex items-center">
                          <div className="h-4 w-0.5 bg-gray-400" style={{ marginLeft: `${dept.target}%` }}></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="financial" className="p-4 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Revenue Card */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Revenue</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold">
                        ${financialMetrics.revenue.current}
                        {financialMetrics.revenue.unit}
                      </div>
                      <div className="flex items-center mt-1">
                        {financialMetrics.revenue.trend === "up" ? (
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-800/20 dark:text-green-400 flex items-center gap-1">
                            <ArrowUpRight className="h-3 w-3" />
                            {financialMetrics.revenue.change}%
                          </Badge>
                        ) : (
                          <Badge className="bg-red-100 text-red-800 hover:bg-red-100 dark:bg-red-800/20 dark:text-red-400 flex items-center gap-1">
                            <ArrowDownRight className="h-3 w-3" />
                            {financialMetrics.revenue.change}%
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <DollarSign className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Profit Card */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Profit</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold">
                        ${financialMetrics.profit.current}
                        {financialMetrics.profit.unit}
                      </div>
                      <div className="flex items-center mt-1">
                        {financialMetrics.profit.trend === "up" ? (
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-800/20 dark:text-green-400 flex items-center gap-1">
                            <ArrowUpRight className="h-3 w-3" />
                            {financialMetrics.profit.change}%
                          </Badge>
                        ) : (
                          <Badge className="bg-red-100 text-red-800 hover:bg-red-100 dark:bg-red-800/20 dark:text-red-400 flex items-center gap-1">
                            <ArrowDownRight className="h-3 w-3" />
                            {financialMetrics.profit.change}%
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <TrendingUp className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Expenses Card */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Expenses</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold">
                        ${financialMetrics.expenses.current}
                        {financialMetrics.expenses.unit}
                      </div>
                      <div className="flex items-center mt-1">
                        {financialMetrics.expenses.trend === "down" ? (
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-800/20 dark:text-green-400 flex items-center gap-1">
                            <ArrowDownRight className="h-3 w-3" />
                            {financialMetrics.expenses.change}%
                          </Badge>
                        ) : (
                          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100 dark:bg-yellow-800/20 dark:text-yellow-400 flex items-center gap-1">
                            <ArrowUpRight className="h-3 w-3" />
                            {financialMetrics.expenses.change}%
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <TrendingDown className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Cash Flow Card */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Cash Flow</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold">
                        ${financialMetrics.cashFlow.current}
                        {financialMetrics.cashFlow.unit}
                      </div>
                      <div className="flex items-center mt-1">
                        {financialMetrics.cashFlow.trend === "up" ? (
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-800/20 dark:text-green-400 flex items-center gap-1">
                            <ArrowUpRight className="h-3 w-3" />
                            {financialMetrics.cashFlow.change}%
                          </Badge>
                        ) : (
                          <Badge className="bg-red-100 text-red-800 hover:bg-red-100 dark:bg-red-800/20 dark:text-red-400 flex items-center gap-1">
                            <ArrowDownRight className="h-3 w-3" />
                            {financialMetrics.cashFlow.change}%
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <DollarSign className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Financial Metrics Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Financial Performance</CardTitle>
                <CardDescription>Year-to-date financial metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center">
                  <LineChart className="h-full w-full text-muted-foreground opacity-10" />
                  <div className="absolute text-center">
                    <p className="text-sm text-muted-foreground">Interactive chart would display here</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Showing revenue, profit, and expenses over time
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Financial Ratios */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Key Financial Ratios</CardTitle>
                <CardDescription>Current financial health indicators</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <div className="text-sm font-medium text-muted-foreground">Profit Margin</div>
                    <div className="text-2xl font-bold">21.0%</div>
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-800/20 dark:text-green-400">
                      +2.5% vs Last Year
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm font-medium text-muted-foreground">Return on Assets</div>
                    <div className="text-2xl font-bold">18.5%</div>
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-800/20 dark:text-green-400">
                      +1.2% vs Last Year
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm font-medium text-muted-foreground">Debt to Equity</div>
                    <div className="text-2xl font-bold">0.42</div>
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-800/20 dark:text-green-400">
                      -0.08 vs Last Year
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="operational" className="p-4 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Customer Acquisition Card */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">New Customers</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold">{operationalMetrics.customerAcquisition.current}</div>
                      <div className="flex items-center mt-1">
                        {operationalMetrics.customerAcquisition.trend === "up" ? (
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-800/20 dark:text-green-400 flex items-center gap-1">
                            <ArrowUpRight className="h-3 w-3" />
                            {operationalMetrics.customerAcquisition.change}%
                          </Badge>
                        ) : (
                          <Badge className="bg-red-100 text-red-800 hover:bg-red-100 dark:bg-red-800/20 dark:text-red-400 flex items-center gap-1">
                            <ArrowDownRight className="h-3 w-3" />
                            {operationalMetrics.customerAcquisition.change}%
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Users className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Retention Card */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Customer Retention</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold">{operationalMetrics.retention.current}%</div>
                      <div className="flex items-center mt-1">
                        {operationalMetrics.retention.trend === "up" ? (
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-800/20 dark:text-green-400 flex items-center gap-1">
                            <ArrowUpRight className="h-3 w-3" />
                            {operationalMetrics.retention.change}%
                          </Badge>
                        ) : (
                          <Badge className="bg-red-100 text-red-800 hover:bg-red-100 dark:bg-red-800/20 dark:text-red-400 flex items-center gap-1">
                            <ArrowDownRight className="h-3 w-3" />
                            {operationalMetrics.retention.change}%
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Percent className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Employee Count Card */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Employees</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold">{operationalMetrics.employeeCount.current}</div>
                      <div className="flex items-center mt-1">
                        {operationalMetrics.employeeCount.trend === "up" ? (
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-800/20 dark:text-green-400 flex items-center gap-1">
                            <ArrowUpRight className="h-3 w-3" />
                            {operationalMetrics.employeeCount.change}%
                          </Badge>
                        ) : (
                          <Badge className="bg-red-100 text-red-800 hover:bg-red-100 dark:bg-red-800/20 dark:text-red-400 flex items-center gap-1">
                            <ArrowDownRight className="h-3 w-3" />
                            {operationalMetrics.employeeCount.change}%
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Users className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Productivity Card */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Productivity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold">{operationalMetrics.productivity.current}%</div>
                      <div className="flex items-center mt-1">
                        {operationalMetrics.productivity.trend === "up" ? (
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-800/20 dark:text-green-400 flex items-center gap-1">
                            <ArrowUpRight className="h-3 w-3" />
                            {operationalMetrics.productivity.change}%
                          </Badge>
                        ) : (
                          <Badge className="bg-red-100 text-red-800 hover:bg-red-100 dark:bg-red-800/20 dark:text-red-400 flex items-center gap-1">
                            <ArrowDownRight className="h-3 w-3" />
                            {operationalMetrics.productivity.change}%
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Target className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Customer Metrics */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Customer Metrics</CardTitle>
                <CardDescription>Key customer performance indicators</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <div className="text-sm font-medium text-muted-foreground">Customer Satisfaction</div>
                    <div className="flex items-center gap-2">
                      <div className="text-2xl font-bold">4.8/5.0</div>
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-800/20 dark:text-green-400">
                        +0.3
                      </Badge>
                    </div>
                    <div className="h-2 bg-primary/10 rounded-full overflow-hidden">
                      <div className="h-full bg-primary" style={{ width: "96%" }}></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm font-medium text-muted-foreground">Net Promoter Score</div>
                    <div className="flex items-center gap-2">
                      <div className="text-2xl font-bold">72</div>
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-800/20 dark:text-green-400">
                        +5
                      </Badge>
                    </div>
                    <div className="h-2 bg-primary/10 rounded-full overflow-hidden">
                      <div className="h-full bg-primary" style={{ width: "72%" }}></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm font-medium text-muted-foreground">Customer Lifetime Value</div>
                    <div className="flex items-center gap-2">
                      <div className="text-2xl font-bold">$4,250</div>
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-800/20 dark:text-green-400">
                        +12%
                      </Badge>
                    </div>
                    <div className="h-2 bg-primary/10 rounded-full overflow-hidden">
                      <div className="h-full bg-primary" style={{ width: "85%" }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Operational Efficiency */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Operational Efficiency</CardTitle>
                <CardDescription>Process and efficiency metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <div className="text-sm font-medium mb-2">Production Efficiency</div>
                      <div className="flex items-center justify-between mb-1">
                        <div className="text-sm text-muted-foreground">Current</div>
                        <div className="text-sm font-medium">92%</div>
                      </div>
                      <div className="h-2 bg-primary/10 rounded-full overflow-hidden mb-4">
                        <div className="h-full bg-primary" style={{ width: "92%" }}></div>
                      </div>
                      <div className="flex items-center justify-between mb-1">
                        <div className="text-sm text-muted-foreground">Target</div>
                        <div className="text-sm font-medium">95%</div>
                      </div>
                      <div className="h-2 bg-primary/10 rounded-full overflow-hidden">
                        <div className="h-full bg-primary/30" style={{ width: "95%" }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-medium mb-2">Order Fulfillment Time</div>
                      <div className="flex items-center justify-between mb-1">
                        <div className="text-sm text-muted-foreground">Current</div>
                        <div className="text-sm font-medium">2.3 days</div>
                      </div>
                      <div className="h-2 bg-primary/10 rounded-full overflow-hidden mb-4">
                        <div className="h-full bg-primary" style={{ width: "77%" }}></div>
                      </div>
                      <div className="flex items-center justify-between mb-1">
                        <div className="text-sm text-muted-foreground">Target</div>
                        <div className="text-sm font-medium">2.0 days</div>
                      </div>
                      <div className="h-2 bg-primary/10 rounded-full overflow-hidden">
                        <div className="h-full bg-primary/30" style={{ width: "85%" }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="strategic" className="p-4 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Strategic Initiatives */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Strategic Initiatives</CardTitle>
                  <CardDescription>Progress on key strategic projects</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <div className="text-sm font-medium">Market Expansion</div>
                        <div className="text-sm font-medium">75%</div>
                      </div>
                      <div className="h-2 bg-primary/10 rounded-full overflow-hidden">
                        <div className="h-full bg-primary" style={{ width: "75%" }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <div className="text-sm font-medium">Digital Transformation</div>
                        <div className="text-sm font-medium">60%</div>
                      </div>
                      <div className="h-2 bg-primary/10 rounded-full overflow-hidden">
                        <div className="h-full bg-primary" style={{ width: "60%" }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <div className="text-sm font-medium">Product Innovation</div>
                        <div className="text-sm font-medium">85%</div>
                      </div>
                      <div className="h-2 bg-primary/10 rounded-full overflow-hidden">
                        <div className="h-full bg-primary" style={{ width: "85%" }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <div className="text-sm font-medium">Operational Excellence</div>
                        <div className="text-sm font-medium">70%</div>
                      </div>
                      <div className="h-2 bg-primary/10 rounded-full overflow-hidden">
                        <div className="h-full bg-primary" style={{ width: "70%" }}></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Risk Assessment */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Risk Assessment</CardTitle>
                  <CardDescription>Current risk levels by category</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium">Market Risk</div>
                      <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100 dark:bg-yellow-800/20 dark:text-yellow-400">
                        Medium
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium">Operational Risk</div>
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-800/20 dark:text-green-400">
                        Low
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium">Financial Risk</div>
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-800/20 dark:text-green-400">
                        Low
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium">Competitive Risk</div>
                      <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100 dark:bg-yellow-800/20 dark:text-yellow-400">
                        Medium
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium">Regulatory Risk</div>
                      <Badge className="bg-red-100 text-red-800 hover:bg-red-100 dark:bg-red-800/20 dark:text-red-400">
                        High
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Strategic Goals */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Strategic Goals</CardTitle>
                <CardDescription>Progress towards long-term objectives</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <div className="text-sm font-medium">Revenue Growth</div>
                      <div className="relative pt-1">
                        <div className="flex mb-2 items-center justify-between">
                          <div>
                            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full bg-primary text-primary-foreground">
                              65%
                            </span>
                          </div>
                          <div className="text-right">
                            <span className="text-xs font-semibold inline-block text-primary">$24.8M / $38M</span>
                          </div>
                        </div>
                        <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-primary/10">
                          <div
                            style={{ width: "65%" }}
                            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary"
                          ></div>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="text-sm font-medium">Market Expansion</div>
                      <div className="relative pt-1">
                        <div className="flex mb-2 items-center justify-between">
                          <div>
                            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full bg-primary text-primary-foreground">
                              40%
                            </span>
                          </div>
                          <div className="text-right">
                            <span className="text-xs font-semibold inline-block text-primary">2 / 5 Markets</span>
                          </div>
                        </div>
                        <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-primary/10">
                          <div
                            style={{ width: "40%" }}
                            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary"
                          ></div>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="text-sm font-medium">Sustainability Goals</div>
                      <div className="relative pt-1">
                        <div className="flex mb-2 items-center justify-between">
                          <div>
                            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full bg-primary text-primary-foreground">
                              80%
                            </span>
                          </div>
                          <div className="text-right">
                            <span className="text-xs font-semibold inline-block text-primary">4 / 5 Initiatives</span>
                          </div>
                        </div>
                        <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-primary/10">
                          <div
                            style={{ width: "80%" }}
                            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary"
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Competitive Analysis */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Competitive Analysis</CardTitle>
                <CardDescription>Performance relative to key competitors</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center">
                  <BarChart3 className="h-full w-full text-muted-foreground opacity-10" />
                  <div className="absolute text-center">
                    <p className="text-sm text-muted-foreground">Interactive chart would display here</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Showing comparative performance across key metrics
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
