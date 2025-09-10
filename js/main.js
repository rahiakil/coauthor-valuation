class InvestorPresentation {
    constructor() {
        this.currentTab = 'executive-summary';
        this.infrastructureCosts = {
            aws: { compute: 8500, ai: 12000, storage: 1200, bandwidth: 800 },
            gcp: { compute: 7800, ai: 11000, storage: 1100, bandwidth: 700 },
            azure: { compute: 8200, ai: 11500, storage: 1150, bandwidth: 750 },
            'on-premise': { compute: 15000, ai: 5000, storage: 2000, bandwidth: 500 },
            'home-server': { compute: 3000, ai: 8000, storage: 500, bandwidth: 200 }
        };
        
        this.valuationMethods = {};
        this.init();
    }
    
    init() {
        this.initTabNavigation();
        this.initInfrastructureCalculator();
        this.initRevenueModel();
        this.initValuationMethods();
        this.initFundingCalculator();
        this.updateAllMetrics();
    }
    
    initTabNavigation() {
        const tabButtons = document.querySelectorAll('.tab-btn');
        const tabContents = document.querySelectorAll('.tab-content');
        
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const tabId = button.dataset.tab;
                
                // Remove active class from all tabs and contents
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));
                
                // Add active class to clicked tab and corresponding content
                button.classList.add('active');
                document.getElementById(tabId).classList.add('active');
                
                this.currentTab = tabId;
                this.updateChartsForTab(tabId);
            });
        });
    }
    
    initInfrastructureCalculator() {
        const controls = [
            'cloud-provider', 'ai-model', 'monthly-users', 'requests-per-user'
        ];
        
        controls.forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.addEventListener('change', () => this.updateInfrastructureCosts());
                if (element.type === 'range') {
                    element.addEventListener('input', () => this.updateInfrastructureCosts());
                }
            }
        });
        
        this.updateInfrastructureCosts();
    }
    
    updateInfrastructureCosts() {
        const provider = document.getElementById('cloud-provider')?.value || 'aws';
        const aiModel = document.getElementById('ai-model')?.value || 'foundation';
        const monthlyUsers = parseInt(document.getElementById('monthly-users')?.value || 10000);
        const requestsPerUser = parseInt(document.getElementById('requests-per-user')?.value || 100);
        
        // Update slider displays
        this.updateElement('monthly-users-value', monthlyUsers.toLocaleString());
        this.updateElement('requests-per-user-value', requestsPerUser.toString());
        
        // Calculate costs based on usage
        const baseCosts = this.infrastructureCosts[provider];
        const scaleFactor = Math.sqrt(monthlyUsers / 10000); // Square root scaling
        const requestFactor = requestsPerUser / 100;
        
        let computeCost = baseCosts.compute * scaleFactor;
        let aiCost = baseCosts.ai * scaleFactor * requestFactor;
        let storageCost = baseCosts.storage * scaleFactor;
        let bandwidthCost = baseCosts.bandwidth * scaleFactor * requestFactor;
        
        // AI model adjustments
        if (aiModel === 'self-hosted') {
            aiCost *= 0.3; // Lower API costs but higher compute
            computeCost *= 1.8;
        } else if (aiModel === 'hybrid') {
            aiCost *= 0.7;
            computeCost *= 1.3;
        }
        
        const totalCost = computeCost + aiCost + storageCost + bandwidthCost;
        
        // Update display
        this.updateElement('compute-cost', `$${Math.round(computeCost).toLocaleString()}`);
        this.updateElement('ai-cost', `$${Math.round(aiCost).toLocaleString()}`);
        this.updateElement('storage-cost', `$${Math.round(storageCost).toLocaleString()}`);
        this.updateElement('bandwidth-cost', `$${Math.round(bandwidthCost).toLocaleString()}`);
        this.updateElement('total-infrastructure-cost', `$${Math.round(totalCost).toLocaleString()}`);
    }
    
    initRevenueModel() {
        const controls = [
            'freelancer-price', 'healthcare-price', 'enterprise-price', 'government-price',
            'marketing-spend', 'conversion-rate'
        ];
        
        controls.forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.addEventListener('input', () => this.updateRevenueProjections());
            }
        });
        
        this.updateRevenueProjections();
    }
    
    updateRevenueProjections() {
        // Get pricing
        const freelancerPrice = parseFloat(document.getElementById('freelancer-price')?.value || 29);
        const healthcarePrice = parseFloat(document.getElementById('healthcare-price')?.value || 79);
        const enterprisePrice = parseFloat(document.getElementById('enterprise-price')?.value || 249);
        const governmentPrice = parseFloat(document.getElementById('government-price')?.value || 1249);
        
        // Get marketing parameters
        const marketingSpend = parseFloat(document.getElementById('marketing-spend')?.value || 100000);
        const conversionRate = parseFloat(document.getElementById('conversion-rate')?.value || 5) / 100;
        
        this.updateElement('marketing-spend-value', `$${marketingSpend.toLocaleString()}`);
        this.updateElement('conversion-rate-value', `${(conversionRate * 100).toFixed(1)}%`);
        
        // Calculate user projections (simplified model)
        const year1Users = {
            freelancer: 1000,
            healthcare: 300,
            enterprise: 50,
            government: 10
        };
        
        const growthRates = { freelancer: 3.5, healthcare: 4.2, enterprise: 5.1, government: 6.8 };
        
        let year1Revenue = 0;
        let year3Revenue = 0;
        let year5Revenue = 0;
        
        // Calculate revenues for each segment
        Object.keys(year1Users).forEach(segment => {
            const price = segment === 'freelancer' ? freelancerPrice :
                         segment === 'healthcare' ? healthcarePrice :
                         segment === 'enterprise' ? enterprisePrice : governmentPrice;
            
            const y1Users = year1Users[segment];
            const y3Users = y1Users * Math.pow(growthRates[segment], 2);
            const y5Users = y1Users * Math.pow(growthRates[segment], 4);
            
            year1Revenue += y1Users * price * 12;
            year3Revenue += y3Users * price * 12;
            year5Revenue += y5Users * price * 12;
        });
        
        // Calculate CAGR
        const cagr = Math.pow(year5Revenue / year1Revenue, 1/4) - 1;
        
        this.updateElement('year1-revenue', `$${(year1Revenue / 1000000).toFixed(1)}M`);
        this.updateElement('year3-revenue', `$${(year3Revenue / 1000000).toFixed(1)}M`);
        this.updateElement('year5-revenue', `$${(year5Revenue / 1000000).toFixed(1)}M`);
        this.updateElement('cagr', `${(cagr * 100).toFixed(0)}%`);
    }
    
    initValuationMethods() {
        // Berkus Method
        const berkusFactors = ['idea', 'prototype', 'management', 'relationships', 'sales'];
        berkusFactors.forEach(factor => {
            const element = document.getElementById(`berkus-${factor}`);
            if (element) {
                element.addEventListener('input', () => this.updateBerkusValuation());
            }
        });
        
        // Scorecard Method
        const scorecardFactors = ['management', 'market', 'product', 'competition', 'marketing', 'financials'];
        scorecardFactors.forEach(factor => {
            const element = document.getElementById(`scorecard-${factor}`);
            if (element) {
                element.addEventListener('input', () => this.updateScorecardValuation());
            }
        });
        
        // Risk Factor Method
        const riskElements = document.querySelectorAll('[id^=\"risk-\"]');
        riskElements.forEach(element => {
            element.addEventListener('change', () => this.updateRiskFactorValuation());
        });
        
        // Cost to Duplicate
        const costElements = ['dev-cost', 'market-premium'];
        costElements.forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.addEventListener('input', () => this.updateCostToDuplicate());
            }
        });
        
        this.updateAllValuationMethods();
    }
    
    updateBerkusValuation() {
        const factors = ['idea', 'prototype', 'management', 'relationships', 'sales'];
        let total = 0;
        
        factors.forEach(factor => {
            const value = parseFloat(document.getElementById(`berkus-${factor}`)?.value || 0);
            total += value;
            this.updateElement(`berkus-${factor}-value`, `$${(value / 1000).toFixed(0)}K`);
        });
        
        this.updateElement('berkus-total', `$${(total / 1000000).toFixed(1)}M`);
        this.updateElement('summary-berkus', `$${(total / 1000000).toFixed(1)}M`);
        this.valuationMethods.berkus = total;
        this.updateAverageValuation();
    }
    
    updateScorecardValuation() {
        const baseValuation = 35000000; // Base $35M for similar companies
        const factors = [
            { name: 'management', weight: 0.30 },
            { name: 'market', weight: 0.25 },
            { name: 'product', weight: 0.15 },
            { name: 'competition', weight: 0.10 },
            { name: 'marketing', weight: 0.10 },
            { name: 'financials', weight: 0.10 }
        ];
        
        let weightedMultiplier = 0;
        
        factors.forEach(factor => {
            const multiplier = parseFloat(document.getElementById(`scorecard-${factor.name}`)?.value || 1);
            weightedMultiplier += multiplier * factor.weight;
            this.updateElement(`scorecard-${factor.name}-value`, `${multiplier.toFixed(1)}x`);
        });
        
        const total = baseValuation * weightedMultiplier;
        this.updateElement('scorecard-total', `$${(total / 1000000).toFixed(1)}M`);
        this.updateElement('summary-scorecard', `$${(total / 1000000).toFixed(1)}M`);
        this.valuationMethods.scorecard = total;
        this.updateAverageValuation();
    }
    
    updateRiskFactorValuation() {
        const baseValuation = 40000000; // Base $40M
        const managementRisk = parseFloat(document.getElementById('risk-management')?.value || 0);
        const stageRisk = parseFloat(document.getElementById('risk-stage')?.value || 0);
        
        const total = baseValuation + managementRisk + stageRisk;
        this.updateElement('risk-total', `$${(total / 1000000).toFixed(1)}M`);
        this.updateElement('summary-risk', `$${(total / 1000000).toFixed(1)}M`);
        this.valuationMethods.risk = total;
        this.updateAverageValuation();
    }
    
    updateCostToDuplicate() {
        const devCost = parseFloat(document.getElementById('dev-cost')?.value || 2000000);
        const premium = parseFloat(document.getElementById('market-premium')?.value || 2.5);
        
        this.updateElement('market-premium-value', `${premium.toFixed(1)}x`);
        
        const total = devCost * premium;
        this.updateElement('duplicate-total', `$${(total / 1000000).toFixed(0)}M`);
        this.updateElement('summary-duplicate', `$${(total / 1000000).toFixed(0)}M`);
        this.valuationMethods.duplicate = total;
        this.updateAverageValuation();
    }
    
    updateAverageValuation() {
        const values = Object.values(this.valuationMethods);
        if (values.length > 0) {
            const average = values.reduce((a, b) => a + b, 0) / values.length;
            this.updateElement('average-valuation', `$${(average / 1000000).toFixed(1)}M`);
        }
    }
    
    updateAllValuationMethods() {
        this.updateBerkusValuation();
        this.updateScorecardValuation();
        this.updateRiskFactorValuation();
        this.updateCostToDuplicate();
    }
    
    initFundingCalculator() {
        const fundingElement = document.getElementById('funding-request');
        if (fundingElement) {
            fundingElement.addEventListener('input', () => this.updateFundingMetrics());
        }
        
        // Use of funds sliders
        const allocationSliders = ['product-allocation', 'marketing-allocation', 'operations-allocation', 'working-capital-allocation'];
        allocationSliders.forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.addEventListener('input', () => this.updateFundingAllocation());
            }
        });
        
        this.updateFundingMetrics();
        this.updateFundingAllocation();
    }
    
    updateFundingMetrics() {
        const fundingAmount = parseFloat(document.getElementById('funding-request')?.value || 10000000);
        const preMoneyValuation = 40000000; // Based on valuation methods
        const postMoneyValuation = preMoneyValuation + fundingAmount;
        const equityPercentage = (fundingAmount / postMoneyValuation) * 100;
        
        this.updateElement('final-pre-money', `$${(preMoneyValuation / 1000000).toFixed(0)}M`);
        this.updateElement('post-money', `$${(postMoneyValuation / 1000000).toFixed(0)}M`);
        this.updateElement('equity-percentage', `${equityPercentage.toFixed(1)}%`);
    }
    
    updateFundingAllocation() {
        const fundingAmount = parseFloat(document.getElementById('funding-request')?.value || 10000000);
        
        const allocations = {
            product: parseFloat(document.getElementById('product-allocation')?.value || 40),
            marketing: parseFloat(document.getElementById('marketing-allocation')?.value || 25),
            operations: parseFloat(document.getElementById('operations-allocation')?.value || 20),
            workingCapital: parseFloat(document.getElementById('working-capital-allocation')?.value || 15)
        };
        
        // Normalize to 100%
        const total = Object.values(allocations).reduce((a, b) => a + b, 0);
        Object.keys(allocations).forEach(key => {
            allocations[key] = (allocations[key] / total) * 100;
        });
        
        // Update displays
        Object.keys(allocations).forEach(key => {
            const amount = (fundingAmount * allocations[key]) / 100;
            const elementId = key === 'workingCapital' ? 'working-capital-amount' : `${key}-amount`;
            this.updateElement(elementId, `$${(amount / 1000000).toFixed(1)}M (${allocations[key].toFixed(0)}%)`);
        });
    }
    
    updateChartsForTab(tabId) {
        // This will be called by the charts module when implemented
        if (window.charts && window.charts.updateChartsForTab) {
            window.charts.updateChartsForTab(tabId);
        }
    }
    
    updateAllMetrics() {
        this.updateInfrastructureCosts();
        this.updateRevenueProjections();
        this.updateAllValuationMethods();
        this.updateFundingMetrics();
        this.updateFundingAllocation();
    }
    
    updateElement(id, value) {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = value;
        }
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.investorPresentation = new InvestorPresentation();
});