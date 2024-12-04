document.addEventListener('DOMContentLoaded', function() {
    // Get all navigation items
    const navItems = document.querySelectorAll('.nav-item');
    const subItems = document.querySelectorAll('.sub-item');
    
    // Get content sections
    const templatesSection = document.getElementById('templates');
    const homeSellerSection = document.getElementById('homeSeller');
    const investorsSection = document.getElementById('investors');
    const homeBuyerSection = document.getElementById('homeBuyer');
    
    // Calculator Modal Elements
    const modal = document.getElementById('calculatorModal');
    const calculatorCards = document.querySelectorAll('.calculator-card');
    const closeModal = document.querySelector('.close-modal');

    // Add click event listeners to calculator cards
    calculatorCards.forEach(card => {
        card.addEventListener('click', () => {
            const calculatorType = card.dataset.calculator;
            showCalculatorModal(calculatorType);
        });
    });

    // Show calculator modal
    function showCalculatorModal(type) {
        modal.style.display = 'block';
        const modalContent = modal.querySelector('.modal-content');
        
        // Clear previous content
        modalContent.innerHTML = '<span class="close-modal">&times;</span>';
        
        // Add calculator form based on type
        const calculatorForm = createCalculatorForm(type);
        modalContent.appendChild(calculatorForm);

        // Add event listener to new close button
        const newCloseBtn = modalContent.querySelector('.close-modal');
        newCloseBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });

        // Add event listener to calculate button
        const calculateBtn = modalContent.querySelector('.calculate-result');
        if (calculateBtn) {
            calculateBtn.addEventListener('click', () => {
                calculateResult(type);
            });
        }
    }

    // Calculate results directly in browser
    function calculateResult(type) {
        switch(type) {
            case 'arv':
                const currentValue = parseFloat(document.getElementById('currentValue').value) || 0;
                const repairCosts = parseFloat(document.getElementById('repairCosts').value) || 0;
                const appreciationRate = parseFloat(document.getElementById('appreciationRate').value) || 0;
                
                const appreciationMultiplier = 1 + (appreciationRate / 100);
                const arv = (currentValue + repairCosts) * appreciationMultiplier;
                const potentialProfit = arv - (currentValue + repairCosts);

                document.getElementById('arvResult').textContent = 
                    `After Repair Value: $${arv.toLocaleString('en-US', {maximumFractionDigits: 2})}`;
                document.getElementById('potentialProfit').textContent = 
                    `Potential Profit: $${potentialProfit.toLocaleString('en-US', {maximumFractionDigits: 2})}`;
                break;

            case 'mao':
                const arvValue = parseFloat(document.getElementById('arvValue').value) || 0;
                const maoRepairCosts = parseFloat(document.getElementById('maoRepairCosts').value) || 0;
                const mao = (arvValue * 0.70) - maoRepairCosts;

                document.getElementById('maoResult').textContent = 
                    `Maximum Allowable Offer: $${mao.toLocaleString('en-US', {maximumFractionDigits: 2})}`;
                break;

            // Add other calculator cases similarly
        }
    }

    // Create calculator form
    function createCalculatorForm(type) {
        const form = document.createElement('div');
        form.className = 'calculator-form';

        switch(type) {
            case 'arv':
                form.innerHTML = `
                    <h2>After Repair Value (ARV) Calculator</h2>
                    <div class="input-group">
                        <label for="currentValue">Current Property Value ($)</label>
                        <input type="number" id="currentValue" placeholder="Enter current value" min="0" required>
                    </div>
                    <div class="input-group">
                        <label for="repairCosts">Estimated Repair Costs ($)</label>
                        <input type="number" id="repairCosts" placeholder="Enter repair costs" min="0" required>
                    </div>
                    <div class="input-group">
                        <label for="appreciationRate">Expected Appreciation Rate (%)</label>
                        <input type="number" id="appreciationRate" placeholder="Enter appreciation rate" min="0" max="100" required>
                    </div>
                    <button class="calculate-result">Calculate ARV</button>
                    <div class="result">
                        <h3>Results:</h3>
                        <p id="arvResult">After Repair Value: $0</p>
                        <p id="potentialProfit">Potential Profit: $0</p>
                    </div>
                `;
                break;

            case 'mao':
                form.innerHTML = `
                    <h2>Maximum Allowable Offer (MAO) Calculator</h2>
                    <div class="input-group">
                        <label for="arvValue">After Repair Value ($)</label>
                        <input type="number" id="arvValue" placeholder="Enter ARV" min="0" required>
                    </div>
                    <div class="input-group">
                        <label for="maoRepairCosts">Repair Costs ($)</label>
                        <input type="number" id="maoRepairCosts" placeholder="Enter repair costs" min="0" required>
                    </div>
                    <button class="calculate-result">Calculate MAO</button>
                    <div class="result">
                        <h3>Results:</h3>
                        <p id="maoResult">Maximum Allowable Offer: $0</p>
                    </div>
                `;
                break;

            // Add other calculator forms similarly
        }

        return form;
    }

    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Navigation functionality
    function removeActiveClass(items) {
        items.forEach(item => {
            item.classList.remove('active');
            item.classList.remove('selected');
        });
    }

    function toggleSections(section = 'default') {
        templatesSection.style.display = 'none';
        homeSellerSection.style.display = 'none';
        investorsSection.style.display = 'none';
        homeBuyerSection.style.display = 'none';

        switch(section) {
            case 'seller':
                homeSellerSection.style.display = 'block';
                break;
            case 'investors':
                investorsSection.style.display = 'block';
                break;
            case 'buyer':
                homeBuyerSection.style.display = 'block';
                break;
            case 'dashboard':
                templatesSection.style.display = 'block';
                break;
            default:
                templatesSection.style.display = 'block';
                break;
        }
    }

    // Navigation event listeners
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (this.textContent.includes('Dashboard')) {
                removeActiveClass(navItems);
                removeActiveClass(subItems);
                this.classList.add('active');
                toggleSections('dashboard');
                const mainTitle = document.querySelector('.header-content h1');
                const mainDesc = document.querySelector('.header-content p');
                mainTitle.textContent = 'Real Estate Calculators';
                mainDesc.textContent = 'Essential tools for real estate analysis and decision making';
                return;
            }
            
            if (!this.textContent.includes('Dashboard')) {
                const nonDashboardItems = Array.from(navItems).filter(item => !item.textContent.includes('Dashboard'));
                removeActiveClass(nonDashboardItems);
                this.classList.add('selected');
            }
            
            if (this.textContent.includes('Conversations')) {
                const subMenu = this.nextElementSibling;
                if (subMenu && subMenu.classList.contains('sub-menu')) {
                    subMenu.style.display = subMenu.style.display === 'none' ? 'block' : 'none';
                }
            }

            // Handle specific button clicks
            const buttonText = this.textContent.trim();
            switch(buttonText) {
                case 'Settings':
                    alert('Settings panel will open here');
                    break;
                case 'Support':
                    alert('Support chat will open here');
                    break;
                case 'Log out':
                    if (confirm('Are you sure you want to log out?')) {
                        alert('Logging out...');
                    }
                    break;
                case 'Statistics':
                    alert('Statistics dashboard will open here');
                    break;
                case 'Contacts':
                    alert('Contacts list will open here');
                    break;
                case 'Calendar':
                    alert('Calendar view will open here');
                    break;
            }
        });
    });

    // Sub-items event listeners
    subItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            removeActiveClass(subItems);
            this.classList.add('active');
            
            const mainTitle = document.querySelector('.header-content h1');
            const mainDesc = document.querySelector('.header-content p');
            
            switch(this.textContent) {
                case 'Home Seller':
                    mainTitle.textContent = 'Home Seller Conversations';
                    mainDesc.textContent = 'Manage and track your conversations with potential home sellers';
                    toggleSections('seller');
                    break;
                case 'Investors':
                    mainTitle.textContent = 'Investor Conversations';
                    mainDesc.textContent = 'Track and organize your conversations with real estate investors';
                    toggleSections('investors');
                    break;
                case 'Home Buyer':
                    mainTitle.textContent = 'Home Buyer Conversations';
                    mainDesc.textContent = 'Manage your conversations with potential home buyers';
                    toggleSections('buyer');
                    break;
            }
        });
    });

    // UI element handlers
    const privateProjectsBtn = document.querySelector('.private-projects');
    if (privateProjectsBtn) {
        privateProjectsBtn.addEventListener('click', function() {
            alert('Private projects section will open here');
        });
    }

    const notificationBell = document.querySelector('.notification');
    if (notificationBell) {
        notificationBell.addEventListener('click', function() {
            alert('Notifications panel will open here');
        });
    }

    const userAvatar = document.querySelector('.user-avatar');
    if (userAvatar) {
        userAvatar.addEventListener('click', function() {
            alert('User profile menu will open here');
        });
    }

    // Show calculators by default
    toggleSections('dashboard');
});
