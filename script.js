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
                        <input type="number" id="currentValue" placeholder="Enter current value">
                    </div>
                    <div class="input-group">
                        <label for="repairCosts">Estimated Repair Costs ($)</label>
                        <input type="number" id="repairCosts" placeholder="Enter repair costs">
                    </div>
                    <div class="input-group">
                        <label for="appreciationRate">Expected Appreciation Rate (%)</label>
                        <input type="number" id="appreciationRate" placeholder="Enter appreciation rate">
                    </div>
                    <button class="calculate-result" onclick="calculateARV()">Calculate ARV</button>
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
                        <input type="number" id="arvValue" placeholder="Enter ARV">
                    </div>
                    <div class="input-group">
                        <label for="repairCosts">Repair Costs ($)</label>
                        <input type="number" id="repairCosts" placeholder="Enter repair costs">
                    </div>
                    <button class="calculate-result" onclick="calculateMAO()">Calculate MAO</button>
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

    // Calculator Functions
    window.calculateARV = async function() {
        const currentValue = parseFloat(document.getElementById('currentValue').value) || 0;
        const repairCosts = parseFloat(document.getElementById('repairCosts').value) || 0;
        const appreciationRate = parseFloat(document.getElementById('appreciationRate').value) || 0;

        try {
            const response = await fetch('http://localhost:5000/calculate/arv', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    currentValue,
                    repairCosts,
                    appreciationRate
                })
            });

            const data = await response.json();
            document.getElementById('arvResult').textContent = 
                `After Repair Value: $${data.arv.toLocaleString('en-US', {maximumFractionDigits: 2})}`;
            document.getElementById('potentialProfit').textContent = 
                `Potential Profit: $${data.potentialProfit.toLocaleString('en-US', {maximumFractionDigits: 2})}`;
        } catch (error) {
            console.error('Error calculating ARV:', error);
            alert('Error calculating ARV. Please try again.');
        }
    };

    window.calculateMAO = async function() {
        const arv = parseFloat(document.getElementById('arvValue').value) || 0;
        const repairCosts = parseFloat(document.getElementById('repairCosts').value) || 0;

        try {
            const response = await fetch('http://localhost:5000/calculate/mao', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ arv, repairCosts })
            });

            const data = await response.json();
            document.getElementById('maoResult').textContent = 
                `Maximum Allowable Offer: $${data.mao.toLocaleString('en-US', {maximumFractionDigits: 2})}`;
        } catch (error) {
            console.error('Error calculating MAO:', error);
            alert('Error calculating MAO. Please try again.');
        }
    };

    // Previous navigation functionality
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
            default:
                templatesSection.style.display = 'block';
                break;
        }
    }

    // Navigation event listeners
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
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

            if (!this.textContent.includes('Conversations')) {
                toggleSections('default');
                const mainTitle = document.querySelector('.header-content h1');
                const mainDesc = document.querySelector('.header-content p');
                mainTitle.textContent = 'My Projects';
                mainDesc.textContent = "Let's get started and take the first step towards becoming a more productive and organized you!";
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

    // Handle Private Projects button
    const privateProjectsBtn = document.querySelector('.private-projects');
    if (privateProjectsBtn) {
        privateProjectsBtn.addEventListener('click', function() {
            alert('Private projects section will open here');
        });
    }

    // Handle notification bell
    const notificationBell = document.querySelector('.notification');
    if (notificationBell) {
        notificationBell.addEventListener('click', function() {
            alert('Notifications panel will open here');
        });
    }

    // Handle user avatar
    const userAvatar = document.querySelector('.user-avatar');
    if (userAvatar) {
        userAvatar.addEventListener('click', function() {
            alert('User profile menu will open here');
        });
    }
});
