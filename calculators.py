from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# ARV Calculator
@app.route('/calculate/arv', methods=['POST'])
def calculate_arv():
    data = request.json
    current_value = float(data.get('currentValue', 0))
    repair_costs = float(data.get('repairCosts', 0))
    appreciation_rate = float(data.get('appreciationRate', 0))
    
    appreciation_multiplier = 1 + (appreciation_rate / 100)
    arv = (current_value + repair_costs) * appreciation_multiplier
    potential_profit = arv - (current_value + repair_costs)
    
    return jsonify({
        'arv': round(arv, 2),
        'potentialProfit': round(potential_profit, 2)
    })

# MAO Calculator
@app.route('/calculate/mao', methods=['POST'])
def calculate_mao():
    data = request.json
    arv = float(data.get('arv', 0))
    repair_costs = float(data.get('repairCosts', 0))
    
    mao = (arv * 0.70) - repair_costs
    
    return jsonify({
        'mao': round(mao, 2)
    })

# CoC Return Calculator
@app.route('/calculate/coc', methods=['POST'])
def calculate_coc():
    data = request.json
    annual_cash_flow = float(data.get('annualCashFlow', 0))
    cash_invested = float(data.get('cashInvested', 0))
    
    if cash_invested == 0:
        return jsonify({'error': 'Cash invested cannot be zero'})
    
    coc_return = (annual_cash_flow / cash_invested) * 100
    
    return jsonify({
        'cocReturn': round(coc_return, 2)
    })

# Cap Rate Calculator
@app.route('/calculate/cap-rate', methods=['POST'])
def calculate_cap_rate():
    data = request.json
    net_operating_income = float(data.get('noi', 0))
    property_value = float(data.get('propertyValue', 0))
    
    if property_value == 0:
        return jsonify({'error': 'Property value cannot be zero'})
    
    cap_rate = (net_operating_income / property_value) * 100
    
    return jsonify({
        'capRate': round(cap_rate, 2)
    })

# GRM Calculator
@app.route('/calculate/grm', methods=['POST'])
def calculate_grm():
    data = request.json
    property_price = float(data.get('propertyPrice', 0))
    annual_rental_income = float(data.get('annualRentalIncome', 0))
    
    if annual_rental_income == 0:
        return jsonify({'error': 'Annual rental income cannot be zero'})
    
    grm = property_price / annual_rental_income
    
    return jsonify({
        'grm': round(grm, 2)
    })

# DSCR Calculator
@app.route('/calculate/dscr', methods=['POST'])
def calculate_dscr():
    data = request.json
    net_operating_income = float(data.get('noi', 0))
    annual_debt_payments = float(data.get('annualDebtPayments', 0))
    
    if annual_debt_payments == 0:
        return jsonify({'error': 'Annual debt payments cannot be zero'})
    
    dscr = net_operating_income / annual_debt_payments
    
    return jsonify({
        'dscr': round(dscr, 2)
    })

# LTV Calculator
@app.route('/calculate/ltv', methods=['POST'])
def calculate_ltv():
    data = request.json
    loan_amount = float(data.get('loanAmount', 0))
    property_value = float(data.get('propertyValue', 0))
    
    if property_value == 0:
        return jsonify({'error': 'Property value cannot be zero'})
    
    ltv = (loan_amount / property_value) * 100
    
    return jsonify({
        'ltv': round(ltv, 2)
    })

# BER Calculator
@app.route('/calculate/ber', methods=['POST'])
def calculate_ber():
    data = request.json
    operating_expenses = float(data.get('operatingExpenses', 0))
    debt_payments = float(data.get('debtPayments', 0))
    gross_income = float(data.get('grossIncome', 0))
    
    if gross_income == 0:
        return jsonify({'error': 'Gross income cannot be zero'})
    
    ber = ((operating_expenses + debt_payments) / gross_income) * 100
    
    return jsonify({
        'ber': round(ber, 2)
    })

# ROI Calculator
@app.route('/calculate/roi', methods=['POST'])
def calculate_roi():
    data = request.json
    net_profit = float(data.get('netProfit', 0))
    total_investment = float(data.get('totalInvestment', 0))
    
    if total_investment == 0:
        return jsonify({'error': 'Total investment cannot be zero'})
    
    roi = (net_profit / total_investment) * 100
    
    return jsonify({
        'roi': round(roi, 2)
    })

# Vacancy Rate Calculator
@app.route('/calculate/vacancy-rate', methods=['POST'])
def calculate_vacancy_rate():
    data = request.json
    vacant_units = float(data.get('vacantUnits', 0))
    total_units = float(data.get('totalUnits', 0))
    
    if total_units == 0:
        return jsonify({'error': 'Total units cannot be zero'})
    
    vacancy_rate = (vacant_units / total_units) * 100
    
    return jsonify({
        'vacancyRate': round(vacancy_rate, 2)
    })

if __name__ == '__main__':
    app.run(port=5000)
