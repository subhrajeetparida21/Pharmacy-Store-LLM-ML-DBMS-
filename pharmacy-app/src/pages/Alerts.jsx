import React, { useState, useEffect } from 'react';
import './Alerts.css';

export default function Alerts() {
  const [alerts, setAlerts] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    loadAlerts();
  }, []);

  const loadAlerts = () => {
    const sampleAlerts = [
      {
        id: 1,
        type: 'low-stock',
        title: 'Low Stock Alert',
        message: 'Paracetamol is running low. Only 25 units left.',
        severity: 'high',
        date: '2024-03-21T10:30:00',
        read: false,
        medicine: 'Paracetamol',
        currentStock: 25,
        minStock: 50
      },
      {
        id: 2,
        type: 'expiry',
        title: 'Expiry Alert',
        message: 'Ibuprofen (Batch #IB2023) will expire in 30 days.',
        severity: 'medium',
        date: '2024-03-21T09:15:00',
        read: false,
        medicine: 'Ibuprofen',
        expiryDate: '2024-04-20'
      },
      {
        id: 3,
        type: 'order',
        title: 'New Order',
        message: 'New order #ORD-001 received from customer Ravi Kumar.',
        severity: 'info',
        date: '2024-03-21T08:45:00',
        read: true,
        orderId: 'ORD-001'
      },
      {
        id: 4,
        type: 'delivery',
        title: 'Delivery Delay',
        message: 'Delivery partner Ravi is delayed by 30 minutes.',
        severity: 'medium',
        date: '2024-03-20T18:20:00',
        read: false,
        deliveryPartner: 'Ravi Kumar'
      },
      {
        id: 5,
        type: 'payment',
        title: 'Payment Failed',
        message: 'Payment for order #ORD-002 has failed. Customer needs to retry.',
        severity: 'high',
        date: '2024-03-20T14:10:00',
        read: false,
        orderId: 'ORD-002'
      }
    ];
    setAlerts(sampleAlerts);
  };

  const markAsRead = (id) => {
    setAlerts(alerts.map(alert => 
      alert.id === id ? { ...alert, read: true } : alert
    ));
  };

  const deleteAlert = (id) => {
    setAlerts(alerts.filter(alert => alert.id !== id));
  };

  const markAllAsRead = () => {
    setAlerts(alerts.map(alert => ({ ...alert, read: true })));
  };

  const getSeverityColor = (severity) => {
    switch(severity) {
      case 'high': return '#ef4444';
      case 'medium': return '#f59e0b';
      case 'low': return '#10b981';
      default: return '#3b82f6';
    }
  };

  const getTypeIcon = (type) => {
    switch(type) {
      case 'low-stock': return '⚠️';
      case 'expiry': return '⌛';
      case 'order': return '📦';
      case 'delivery': return '🚚';
      case 'payment': return '💳';
      default: return '🔔';
    }
  };

  const filteredAlerts = filter === 'all' ? alerts : alerts.filter(alert => 
    filter === 'unread' ? !alert.read : alert.type === filter
  );

  const unreadCount = alerts.filter(alert => !alert.read).length;

  return (
    <div className="alerts-container">
      <div className="alerts-header">
        <div>
          <h1>🔔 Alerts & Notifications</h1>
          <p className="unread-badge">{unreadCount} unread alerts</p>
        </div>
        <div className="alerts-actions">
          <button onClick={markAllAsRead} className="mark-all-btn">
            Mark All as Read
          </button>
        </div>
      </div>

      <div className="alerts-filters">
        <button 
          className={filter === 'all' ? 'active' : ''} 
          onClick={() => setFilter('all')}
        >
          All
        </button>
        <button 
          className={filter === 'unread' ? 'active' : ''} 
          onClick={() => setFilter('unread')}
        >
          Unread
        </button>
        <button 
          className={filter === 'low-stock' ? 'active' : ''} 
          onClick={() => setFilter('low-stock')}
        >
          Low Stock
        </button>
        <button 
          className={filter === 'expiry' ? 'active' : ''} 
          onClick={() => setFilter('expiry')}
        >
          Expiry
        </button>
        <button 
          className={filter === 'order' ? 'active' : ''} 
          onClick={() => setFilter('order')}
        >
          Orders
        </button>
      </div>

      <div className="alerts-list">
        {filteredAlerts.length === 0 ? (
          <div className="no-alerts">
            <span>🎉</span>
            <p>No alerts to display</p>
          </div>
        ) : (
          filteredAlerts.map(alert => (
            <div 
              key={alert.id} 
              className={`alert-card ${!alert.read ? 'unread' : ''}`}
              onClick={() => markAsRead(alert.id)}
            >
              <div className="alert-icon" style={{ background: getSeverityColor(alert.severity) }}>
                {getTypeIcon(alert.type)}
              </div>
              <div className="alert-content">
                <div className="alert-header">
                  <h3>{alert.title}</h3>
                  <span className="alert-time">
                    {new Date(alert.date).toLocaleString()}
                  </span>
                </div>
                <p className="alert-message">{alert.message}</p>
                {alert.medicine && (
                  <div className="alert-details">
                    <span>💊 {alert.medicine}</span>
                    {alert.currentStock && (
                      <span>📊 Stock: {alert.currentStock} units</span>
                    )}
                    {alert.expiryDate && (
                      <span>📅 Expires: {new Date(alert.expiryDate).toLocaleDateString()}</span>
                    )}
                  </div>
                )}
              </div>
              <button 
                className="delete-alert" 
                onClick={(e) => {
                  e.stopPropagation();
                  deleteAlert(alert.id);
                }}
              >
                ×
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}