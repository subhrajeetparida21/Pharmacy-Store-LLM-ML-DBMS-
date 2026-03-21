import React, { useState } from 'react';
import './GenerateReport.css';

export default function GenerateReport() {
  const [reportType, setReportType] = useState('sales');
  const [dateRange, setDateRange] = useState('weekly');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [format, setFormat] = useState('pdf');
  const [generating, setGenerating] = useState(false);
  const [reportGenerated, setReportGenerated] = useState(false);

  const handleGenerateReport = () => {
    setGenerating(true);
    
    // Simulate report generation
    setTimeout(() => {
      setGenerating(false);
      setReportGenerated(true);
      
      setTimeout(() => {
        setReportGenerated(false);
      }, 3000);
    }, 2000);
  };

  const getReportTitle = () => {
    switch(reportType) {
      case 'sales': return 'Sales Report';
      case 'inventory': return 'Inventory Report';
      case 'orders': return 'Orders Report';
      case 'customers': return 'Customer Report';
      case 'expiry': return 'Expiry Report';
      default: return 'Report';
    }
  };

  return (
    <div className="generate-report-container">
      <div className="report-header">
        <h1>📄 Generate Report</h1>
        <p>Create and download detailed reports for analysis</p>
      </div>

      {reportGenerated && (
        <div className="success-message">
          ✅ Report generated successfully! Download will start shortly.
        </div>
      )}

      <div className="report-content">
        <div className="report-form">
          <h2>Report Settings</h2>
          
          <div className="form-group">
            <label>Report Type:</label>
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="report-select"
            >
              <option value="sales">Sales Report</option>
              <option value="inventory">Inventory Report</option>
              <option value="orders">Orders Report</option>
              <option value="customers">Customer Report</option>
              <option value="expiry">Expiry Report</option>
            </select>
          </div>

          <div className="form-group">
            <label>Date Range:</label>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="report-select"
            >
              <option value="today">Today</option>
              <option value="yesterday">Yesterday</option>
              <option value="weekly">Last 7 Days</option>
              <option value="monthly">Last 30 Days</option>
              <option value="quarterly">Last 3 Months</option>
              <option value="yearly">Last 12 Months</option>
              <option value="custom">Custom Range</option>
            </select>
          </div>

          {dateRange === 'custom' && (
            <div className="date-range">
              <div className="form-group">
                <label>Start Date:</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="date-input"
                />
              </div>
              <div className="form-group">
                <label>End Date:</label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="date-input"
                />
              </div>
            </div>
          )}

          <div className="form-group">
            <label>Export Format:</label>
            <div className="format-buttons">
              <button
                className={`format-btn ${format === 'pdf' ? 'active' : ''}`}
                onClick={() => setFormat('pdf')}
              >
                PDF
              </button>
              <button
                className={`format-btn ${format === 'excel' ? 'active' : ''}`}
                onClick={() => setFormat('excel')}
              >
                Excel
              </button>
              <button
                className={`format-btn ${format === 'csv' ? 'active' : ''}`}
                onClick={() => setFormat('csv')}
              >
                CSV
              </button>
            </div>
          </div>

          <button
            onClick={handleGenerateReport}
            className="generate-btn"
            disabled={generating}
          >
            {generating ? 'Generating...' : `Generate ${getReportTitle()}`}
          </button>
        </div>

        <div className="report-preview">
          <h2>Report Preview</h2>
          <div className="preview-content">
            <h3>{getReportTitle()}</h3>
            <p className="preview-date">
              {dateRange === 'today' && 'Generated for today'}
              {dateRange === 'weekly' && 'Generated for last 7 days'}
              {dateRange === 'monthly' && 'Generated for last 30 days'}
              {dateRange === 'custom' && `Generated from ${startDate || '...'} to ${endDate || '...'}`}
            </p>
            
            {reportType === 'sales' && (
              <div className="preview-table">
                <table>
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Orders</th>
                      <th>Revenue</th>
                      <th>Avg Order</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>2024-03-21</td>
                      <td>45</td>
                      <td>₹12,450</td>
                      <td>₹276</td>
                    </tr>
                    <tr>
                      <td>2024-03-20</td>
                      <td>38</td>
                      <td>₹10,200</td>
                      <td>₹268</td>
                    </tr>
                    <tr>
                      <td>2024-03-19</td>
                      <td>52</td>
                      <td>₹14,800</td>
                      <td>₹285</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            {reportType === 'inventory' && (
              <div className="preview-table">
                <table>
                  <thead>
                    <tr>
                      <th>Medicine</th>
                      <th>Stock</th>
                      <th>Low Stock</th>
                      <th>Expiring Soon</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Paracetamol</td>
                      <td>25</td>
                      <td>Yes</td>
                      <td>No</td>
                    </tr>
                    <tr>
                      <td>Amoxicillin</td>
                      <td>150</td>
                      <td>No</td>
                      <td>Yes (30 days)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            <div className="preview-stats">
              <div className="stat">
                <span>Total Records:</span>
                <strong>156</strong>
              </div>
              <div className="stat">
                <span>Generated On:</span>
                <strong>{new Date().toLocaleString()}</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}