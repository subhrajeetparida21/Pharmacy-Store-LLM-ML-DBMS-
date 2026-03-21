import React, { useState, useEffect } from 'react';
import './AIInsights.css';

export default function AIInsights() {
  const [insights, setInsights] = useState([]);
  const [predictions, setPredictions] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate AI data loading
    setTimeout(() => {
      loadInsights();
      setLoading(false);
    }, 1000);
  }, []);

  const loadInsights = () => {
    setInsights([
      {
        id: 1,
        title: 'Sales Trend Analysis',
        description: 'Sales have increased by 23% in the last 30 days. Peak hours are between 6 PM - 9 PM.',
        impact: 'high',
        category: 'sales'
      },
      {
        id: 2,
        title: 'Customer Behavior',
        description: 'Customers are increasingly buying Vitamin C supplements. Consider bundling with immunity boosters.',
        impact: 'medium',
        category: 'customers'
      },
      {
        id: 3,
        title: 'Inventory Optimization',
        description: 'Paracetamol stock is depleting faster than average. Increase reorder quantity by 30%.',
        impact: 'high',
        category: 'inventory'
      }
    ]);

    setPredictions([
      {
        id: 1,
        title: 'Next Month Sales Forecast',
        value: '₹1,45,000',
        confidence: '92%',
        trend: 'up'
      },
      {
        id: 2,
        title: 'Expected Order Volume',
        value: '1,250 orders',
        confidence: '88%',
        trend: 'up'
      },
      {
        id: 3,
        title: 'Customer Growth',
        value: '18% increase',
        confidence: '85%',
        trend: 'up'
      }
    ]);

    setRecommendations([
      {
        id: 1,
        title: 'Increase Paracetamol Stock',
        action: 'Order 500 additional units',
        priority: 'high',
        roi: '+15% sales'
      },
      {
        id: 2,
        title: 'Launch Vitamin C Bundle',
        action: 'Create bundle with 20% discount',
        priority: 'medium',
        roi: '+8% revenue'
      },
      {
        id: 3,
        title: 'Extend Delivery Hours',
        action: 'Add 8 PM - 10 PM delivery slot',
        priority: 'high',
        roi: '+12% orders'
      }
    ]);
  };

  const getImpactColor = (impact) => {
    switch(impact) {
      case 'high': return '#ef4444';
      case 'medium': return '#f59e0b';
      case 'low': return '#10b981';
      default: return '#3b82f6';
    }
  };

  if (loading) {
    return (
      <div className="ai-loading">
        <div className="loader"></div>
        <p>Analyzing data with AI...</p>
      </div>
    );
  }

  return (
    <div className="ai-insights-container">
      <div className="ai-header">
        <h1>🤖 AI-Powered Insights</h1>
        <p>Smart recommendations and predictive analytics for your pharmacy</p>
      </div>

      {/* Predictions Cards */}
      <div className="predictions-section">
        <h2>📈 Sales Predictions</h2>
        <div className="predictions-grid">
          {predictions.map(pred => (
            <div key={pred.id} className="prediction-card">
              <h3>{pred.title}</h3>
              <div className="prediction-value">{pred.value}</div>
              <div className="prediction-meta">
                <span className="confidence">Confidence: {pred.confidence}</span>
                <span className={`trend ${pred.trend}`}>
                  {pred.trend === 'up' ? '↑' : '↓'} Trending Up
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Key Insights */}
      <div className="insights-section">
        <h2>💡 Key Insights</h2>
        <div className="insights-grid">
          {insights.map(insight => (
            <div key={insight.id} className="insight-card">
              <div className="insight-category">{insight.category}</div>
              <h3>{insight.title}</h3>
              <p>{insight.description}</p>
              <div className="insight-impact" style={{ color: getImpactColor(insight.impact) }}>
                Impact: {insight.impact}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommendations */}
      <div className="recommendations-section">
        <h2>🎯 AI Recommendations</h2>
        <div className="recommendations-list">
          {recommendations.map(rec => (
            <div key={rec.id} className="recommendation-card">
              <div className="recommendation-header">
                <h3>{rec.title}</h3>
                <span className={`priority-${rec.priority}`}>{rec.priority}</span>
              </div>
              <p className="recommendation-action">{rec.action}</p>
              <div className="recommendation-roi">
                📊 Expected ROI: {rec.roi}
              </div>
              <button className="apply-recommendation">
                Apply Recommendation
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Chat with AI */}
      <div className="ai-chat-section">
        <h2>💬 Chat with AI Assistant</h2>
        <div className="chat-container">
          <div className="chat-messages">
            <div className="message ai-message">
              <strong>AI Assistant:</strong> Hello! I can help you with insights about your pharmacy. Ask me anything about sales, inventory, or customer trends!
            </div>
          </div>
          <div className="chat-input">
            <input type="text" placeholder="Ask me something..." />
            <button>Send</button>
          </div>
        </div>
      </div>
    </div>
  );
}