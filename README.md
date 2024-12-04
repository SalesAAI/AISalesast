# Real Estate Calculator Dashboard

A comprehensive real estate calculator dashboard with Python backend calculations and a modern web interface.

## Setup Instructions

1. Install Python dependencies:
```bash
pip install -r requirements.txt
```

2. Start the Python backend server:
```bash
python calculators.py
```

3. Open index.html in your web browser to use the calculators.

## Available Calculators

- ARV (After Repair Value)
- MAO (Maximum Allowable Offer)
- CoC (Cash-on-Cash Return)
- Cap Rate (Capitalization Rate)
- GRM (Gross Rent Multiplier)
- DSCR (Debt Service Coverage Ratio)
- LTV (Loan-to-Value Ratio)
- BER (Break-Even Ratio)
- ROI (Return on Investment)
- Vacancy Rate

## How to Use

1. Click on any calculator card to open its calculator interface
2. Enter the required values
3. Click "Calculate" to get the results
4. Results will be displayed immediately below the calculator form

## Features

- Real-time calculations using Python backend
- Clean and modern user interface
- Responsive design
- Error handling and input validation
- Detailed explanations for each calculation

## Calculator Descriptions

### ARV (After Repair Value)
Estimates the future value of a property after renovations are completed.

### MAO (Maximum Allowable Offer)
Calculates the highest price an investor should pay for a property to ensure profit.

### CoC (Cash-on-Cash Return)
Measures the cash income earned on the cash invested in a property.

### Cap Rate
Evaluates a real estate investment's profitability and potential return.

### GRM (Gross Rent Multiplier)
Measures the property's value relative to its gross rental income.

### DSCR (Debt Service Coverage Ratio)
Measures property's ability to cover debt payments with its net operating income.

### LTV (Loan-to-Value Ratio)
Assesses lending risk and determines the maximum loan amount.

### BER (Break-Even Ratio)
Calculates when rental income equals all expenses.

### ROI (Return on Investment)
Measures the overall return on the total investment.

### Vacancy Rate
Calculates the percentage of unoccupied rental units.

## Note

Make sure the Python backend server is running on port 5000 before using the calculators. The frontend will automatically connect to the backend when performing calculations.

## Troubleshooting

If calculations are not working:
1. Verify the Python server is running
2. Check browser console for any errors
3. Ensure all input values are valid numbers
4. Check network connectivity to localhost:5000

## Development

The application uses:
- Frontend: HTML, CSS, JavaScript
- Backend: Python with Flask
- API: RESTful endpoints for calculations
- CORS enabled for local development
