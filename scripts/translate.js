const comparisonTable = {
    assetAnalyse: '資產總額分析',
    totalLiabilities: '負債總額分析',
    currentAssets: '流動資產',
    currentLiabilities: '流動負債',
    liquidity: '償債能力分析',
    workingCapital: '營運資金週期',
    ROE: '淨利報酬率',
    cashFlowCompensation: '現金流量報酬率',
    operatingMargin: '營業利益率',
    cashFlowUse: '現金流量用途分析',
    cash_flow_change: '現金流量變化分析',
    operating_revenue_and_expense_change: '營收與損益變化分析',
    expected_rate_of_return: '預期投報',
    stock_symbol: '股票代號',
    company_name: '公司名稱',
    level: '等級',
    closing_price: '收盤價',
    year: '年',
    quarter: '季',
    industry_category: '產業類別',
    expected_reasonable_value: '預估每股合理價值',
    consider_fund_reinvestment: '預估每股合理價值-考慮資金再投資',
    go_public: '上市上櫃',
    discount_ratio: '折價比',
    sum_of_EBIDTA: '近四季每股EBIDTA',
    cash_and_cash_equivalents: '現金及約當現金',
    short_term_investment_financial_assets_current: '短期投資金融資產－流動',
    accounts_and_bills_receivable: '應收帳款及票據',
    other_receivables: '其他應收款',
    loan_to_other_S_T: '短期借支',
    inventories: '存貨',
    prepaid_expenses_and_repayments: '預付費用及預付款',
    other_current_assets: '其他流動資產',
    current_assets: '流動資產',
    long_term_investments: '長期投資',
    property_plant_and_equipment: '不動產廠房及設備',
    total_goodwill_and_intangible_assets: '商譽及無形資產合計',
    total_intangible_assets: '遞延資產合計',
    other_non_current_assets: '其他非流動資產',
    non_current_assets: '非流動資產',
    total_assets: '資產總額',
    short_term_debt: '短期借款',
    commercial_paper_payable_acceptance_bill: '應付商業本票∕承兌匯票',
    short_term_financial_liability_current: '短期金融負債－流動',
    accounts_and_bills_payable: '應付帳款及票據',
    other_payables: '其他應付款',
    current_tax_liabilities: '當期所得稅負債',
    other_financial_liabilities_current: '其他金融負債－流動',
    long_term_liabilities_due_within_one_year: '一年內到期長期負債',
    other_current_liabilities: '其他流動負債',
    current_liabilities: '流動負債',
    financial_liabilities_non_current: '金融負債－非流動',
    corporate_bond: '公司債',
    bank_loan_non_current: '銀行借款－非流動',
    other_long_term_debt_payable_non_current: '其他長期借款－非流動',
    total_other_L_T_liab: '其他負債及準備',
    non_current_liabilities: '非流動負債',
    total_liabilities: '負債總額',
    share_capital: '股本',
    total_capital_reserve: '資本公積合計',
    retained_earnings: '保留盈餘',
    other_equity: '其他權益',
    treasury_stock: '庫藏股票帳面值',
    total_equity: '股東權益總額',
    total_liabilities_and_stockholders_equity: '負債及股東權益總額',
    total_capital_investment_IC: '投資資本總額－IC',
    net_operating_revenue: '營業收入淨額',
    cost_of_goods_sold: '營業成本',
    realized_gross_profit: '已實現銷貨毛利',
    operating_expenses: '營業費用',
    other_gains_and_losses: '其他收益及費損淨額',
    operating_income: '營業利益',
    total_non_operating_revenue_and_expense: '營業外收入及支出',
    income_before_tax: '稅前淨利',
    income_tax_expense: '所得稅費用',
    gains_and_losses_from_continuing_operations: '繼續營業單位損益',
    consolidated_net_income: '合併總損益',
    other_comprehensive_income_OCI: '其他綜合損益－OCI',
    total_comprehensive_income: '本期綜合損益總額',
    earnings_before_interest_and_tax: '稅前息前淨利',
    EBIDTA: '稅前息前折舊前淨利－EBIDTA',
    EPS: '每股盈餘－完全稀釋－EPS',
    profit_before_tax_CFO: '稅前淨利－CFO',
    depreciation_CFO: '折舊－CFO',
    amortization_CFO: '攤提－CFO',
    decrease_increase_in_accounts_receivable_CFO: '應收帳款(增加)減少-CFO',
    decrease_increase_in_inventories_CFO: '存貨(增加)減少-CFO',
    increase_decrease_in_account_payable_CTO: '應付帳款增加(減少)-CTO',
    cash_flows_from_operations: '來自營運之現金流量',
    purchases_of_property_plant_equipment_include_prepaid_CFI:
        '購置不動產廠房設備(含預付)-CFI',
    disposals_of_property_plant_equipment_include_prepaid_CFI:
        '處分不動產廠房設備(含預付)-CFI',
    cash_flow_from_investment_activities: '投資活動之現金流量',
    cash_dividends_paids_CFF: '支付現金股利-CFF',
    cash_flow_from_fundraising: '籌資活動之現金流量',
    cash_flow_during_this_period: '本期產生現金流量',
    days_of_cash_receivable: '應收帳款收現天數',
    days_of_sales: '銷貨天數',
    days_of_accounts_payable_turnover: '應付帳款週轉天數',
    days_of_operation_turnover: '營運週轉天數',
    days_of_cash_turnover: '現金週轉天數',
    gross_profit_ratio: '毛利率',
    operating_expense_ratio: '營業費用率',
    net_profit_margin_ratio: '淨利率',
    ROA: '資產報酬率',
    ROE: '權益報酬率',
    ROIC: '資本回報率',
    EBOA: '業主自定義',
    EBOE: '業主自定義',
    EBOIC: '業主自定義',
    EBIDTA_per_share: '每股EBIDTA',
    cash_reinvestment_ratio: '現金再投資比例',
    dividend_redistribution_ratio: '現金股利分配比例'
};

export default function translate(keyString) {
    return comparisonTable[keyString];
}