class Charts {
    constructor() {
        this.charts = {};
        this.chartConfigs = {
            market: {
                type: 'doughnut',
                data: {
                    labels: ['Freelance Writers', 'Healthcare', 'Enterprise', 'Government'],
                    datasets: [{
                        data: [2300000, 850000, 125000, 15000],
                        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0']
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        title: {
                            display: true,
                            text: 'Total Addressable Market (TAM)'
                        },
                        legend: {
                            position: 'bottom'
                        }
                    }
                }
            },
            financial: {
                type: 'line',
                data: {
                    labels: ['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5'],
                    datasets: [
                        {
                            label: 'Revenue',
                            data: [2.1, 15.8, 85.4, 285.6, 723.4],
                            borderColor: '#36A2EB',
                            backgroundColor: 'rgba(54, 162, 235, 0.1)',
                            fill: true
                        },
                        {
                            label: 'Free Cash Flow',
                            data: [-8.5, -2.1, 34.2, 142.8, 361.7],
                            borderColor: '#4BC0C0',
                            backgroundColor: 'rgba(75, 192, 192, 0.1)',
                            fill: true
                        }
                    ]
                },
                options: {
                    responsive: true,
                    plugins: {
                        title: {
                            display: true,
                            text: 'Financial Projections ($M)'
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            },
            infrastructure: {
                type: 'bar',
                data: {
                    labels: ['AWS', 'GCP', 'Azure', 'On-Premise', 'Home Server'],
                    datasets: [
                        {
                            label: 'Compute',
                            data: [8.5, 7.8, 8.2, 15.0, 3.0],
                            backgroundColor: '#FF6384'
                        },
                        {
                            label: 'AI/ML',
                            data: [12.0, 11.0, 11.5, 5.0, 8.0],
                            backgroundColor: '#36A2EB'
                        },
                        {
                            label: 'Storage',
                            data: [1.2, 1.1, 1.15, 2.0, 0.5],
                            backgroundColor: '#FFCE56'
                        },
                        {
                            label: 'Bandwidth',
                            data: [0.8, 0.7, 0.75, 0.5, 0.2],
                            backgroundColor: '#4BC0C0'
                        }
                    ]
                },
                options: {
                    responsive: true,
                    plugins: {
                        title: {
                            display: true,
                            text: 'Monthly Infrastructure Costs ($K)'
                        }
                    },
                    scales: {
                        x: {
                            stacked: true
                        },
                        y: {
                            stacked: true,
                            beginAtZero: true
                        }
                    }
                }
            },
            revenue: {
                type: 'bar',
                data: {
                    labels: ['2025', '2026', '2027', '2028', '2029', '2030'],
                    datasets: [
                        {
                            label: 'Freelancers',
                            data: [0.35, 2.1, 8.4, 23.5, 58.7, 134.6],
                            backgroundColor: '#FF6384'
                        },
                        {
                            label: 'Healthcare',
                            data: [0.28, 1.8, 7.5, 22.8, 61.2, 152.4],
                            backgroundColor: '#36A2EB'
                        },
                        {
                            label: 'Enterprise',
                            data: [0.15, 1.2, 6.2, 21.4, 68.5, 189.2],
                            backgroundColor: '#FFCE56'
                        },
                        {
                            label: 'Government',
                            data: [0.02, 0.18, 1.1, 5.8, 22.1, 67.2],
                            backgroundColor: '#4BC0C0'
                        }
                    ]
                },
                options: {
                    responsive: true,
                    plugins: {
                        title: {
                            display: true,
                            text: 'Revenue by Segment ($M)'
                        }
                    },
                    scales: {
                        x: {
                            stacked: true
                        },
                        y: {
                            stacked: true,
                            beginAtZero: true
                        }
                    }
                }
            },
            dcf: {
                type: 'line',
                data: {
                    labels: ['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5'],
                    datasets: [
                        {
                            label: 'Free Cash Flow',
                            data: [-6.8, 6.3, 27.4, 114.2, 289.4],
                            borderColor: '#36A2EB',
                            backgroundColor: 'rgba(54, 162, 235, 0.1)',
                            fill: true
                        },
                        {
                            label: 'Present Value',
                            data: [-6.1, 5.0, 19.5, 72.4, 164.2],
                            borderColor: '#4BC0C0',
                            backgroundColor: 'rgba(75, 192, 192, 0.1)',
                            fill: true
                        }
                    ]
                },
                options: {
                    responsive: true,
                    plugins: {
                        title: {
                            display: true,
                            text: 'DCF Analysis ($M)'
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: false
                        }
                    }
                }
            },
            funding: {
                type: 'pie',
                data: {
                    labels: ['Product Development', 'Marketing & Sales', 'Operations', 'Working Capital'],
                    datasets: [{
                        data: [40, 25, 20, 15],
                        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0']
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        title: {
                            display: true,
                            text: 'Use of Funds ($10M)'
                        },
                        legend: {
                            position: 'bottom'
                        }
                    }
                }
            }
        };
        
        this.init();
    }
    
    init() {
        // Wait for DOM to be fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.createCharts());
        } else {
            this.createCharts();
        }
    }
    
    createCharts() {
        // Create each chart
        Object.keys(this.chartConfigs).forEach(chartName => {
            const canvas = document.getElementById(`${chartName}Chart`);
            if (canvas) {
                const ctx = canvas.getContext('2d');
                this.charts[chartName] = new Chart(ctx, this.chartConfigs[chartName]);
            }
        });
    }
    
    updateChartsForTab(tabId) {
        // Update charts based on current tab and user inputs
        switch (tabId) {
            case 'market-analysis':
                this.updateMarketChart();
                break;
            case 'financial-models':
                this.updateFinancialChart();
                break;
            case 'infrastructure':
                this.updateInfrastructureChart();
                break;
            case 'revenue-model':
                this.updateRevenueChart();
                break;
            case 'dcf-analysis':
                this.updateDCFChart();
                break;
            case 'funding-request':
                this.updateFundingChart();
                break;
        }
    }
    
    updateMarketChart() {
        // Market chart is relatively static, but could be updated based on scenarios
        const chart = this.charts.market;
        if (chart) {
            chart.update();
        }
    }
    
    updateFinancialChart() {
        const chart = this.charts.financial;
        if (chart && window.financialModels) {
            // Get current scenario data
            const scenario = window.financialModels.currentScenario;
            const multiplier = window.financialModels.scenarios[scenario].revenueMultiplier;
            
            // Update revenue data
            const baseRevenue = [2.1, 15.8, 85.4, 285.6, 723.4];
            const baseFCF = [-8.5, -2.1, 34.2, 142.8, 361.7];
            
            chart.data.datasets[0].data = baseRevenue.map(r => r * multiplier);
            chart.data.datasets[1].data = baseFCF.map(f => f * multiplier);
            
            chart.update();
        }
    }
    
    updateInfrastructureChart() {
        const chart = this.charts.infrastructure;
        if (chart) {
            // Get current infrastructure settings
            const provider = document.getElementById('cloud-provider')?.value || 'aws';
            const monthlyUsers = parseInt(document.getElementById('monthly-users')?.value || 10000);
            const scaleFactor = Math.sqrt(monthlyUsers / 10000);
            
            // Update the specific provider's costs
            const providerIndex = ['aws', 'gcp', 'azure', 'on-premise', 'home-server'].indexOf(provider);
            if (providerIndex >= 0) {
                // Apply scaling to current provider
                const baseCosts = [
                    [8.5, 7.8, 8.2, 15.0, 3.0],  // Compute
                    [12.0, 11.0, 11.5, 5.0, 8.0], // AI/ML
                    [1.2, 1.1, 1.15, 2.0, 0.5],   // Storage
                    [0.8, 0.7, 0.75, 0.5, 0.2]    // Bandwidth
                ];
                
                chart.data.datasets.forEach((dataset, i) => {
                    dataset.data = baseCosts[i].map((cost, j) => {
                        return j === providerIndex ? cost * scaleFactor : cost;
                    });
                });
            }
            
            chart.update();
        }
    }
    
    updateRevenueChart() {
        const chart = this.charts.revenue;
        if (chart) {
            // Get current pricing
            const prices = {
                freelancer: parseFloat(document.getElementById('freelancer-price')?.value || 29),
                healthcare: parseFloat(document.getElementById('healthcare-price')?.value || 79),
                enterprise: parseFloat(document.getElementById('enterprise-price')?.value || 249),
                government: parseFloat(document.getElementById('government-price')?.value || 1249)
            };
            
            // Base user projections
            const baseUsers = {
                freelancer: [350, 2100, 8400, 23500, 58700, 134600],
                healthcare: [300, 1900, 8000, 24300, 65400, 163000],
                enterprise: [50, 400, 2100, 7200, 23000, 63800],
                government: [10, 120, 750, 3900, 14900, 45200]
            };
            
            // Update revenue calculations
            Object.keys(prices).forEach((segment, i) => {
                const price = prices[segment];
                const users = baseUsers[segment];
                chart.data.datasets[i].data = users.map(u => (u * price * 12) / 1000000);
            });
            
            chart.update();
        }
    }
    
    updateDCFChart() {
        const chart = this.charts.dcf;
        if (chart && window.financialModels) {
            const dcfResults = window.financialModels.calculateDCF();
            
            // Update with actual DCF calculations
            chart.data.datasets[0].data = dcfResults.cashFlows.map(cf => cf.freeCashFlow / 1000000);
            chart.data.datasets[1].data = dcfResults.cashFlows.map(cf => cf.presentValue / 1000000);
            
            chart.update();
        }
    }
    
    updateFundingChart() {
        const chart = this.charts.funding;
        if (chart) {
            // Get current allocation percentages
            const allocations = [
                parseFloat(document.getElementById('product-allocation')?.value || 40),
                parseFloat(document.getElementById('marketing-allocation')?.value || 25),
                parseFloat(document.getElementById('operations-allocation')?.value || 20),
                parseFloat(document.getElementById('working-capital-allocation')?.value || 15)
            ];
            
            // Normalize to 100%
            const total = allocations.reduce((a, b) => a + b, 0);
            chart.data.datasets[0].data = allocations.map(a => (a / total) * 100);
            
            chart.update();
        }
    }
    
    destroyChart(chartName) {
        if (this.charts[chartName]) {
            this.charts[chartName].destroy();
            delete this.charts[chartName];
        }
    }
    
    destroyAllCharts() {
        Object.keys(this.charts).forEach(chartName => {
            this.destroyChart(chartName);
        });
    }
}

// Initialize charts when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.charts = new Charts();
});