document.addEventListener('DOMContentLoaded', () => {
    const featureSection = document.getElementById('feature-section');
    const conditionGrid = document.getElementById('condition-grid');

    // Populate the 4 main feature cards
    features.forEach(f => {
        featureSection.innerHTML += `
            <div class="feature-card" style="background: ${f.color}">
                <div>
                    <strong style="display:block">${f.title}</strong>
                    <span>${f.subtitle}</span>
                    <p style="font-size: 10px; color: #8e44ad; margin-top:10px; font-weight:bold">${f.action} ></p>
                </div>
                <span style="font-size: 30px">${f.icon}</span>
            </div>
        `;
    });

    // Populate the 10 health condition cards
    healthConditions.forEach(c => {
        conditionGrid.innerHTML += `
            <div class="condition-item">
                <span style="font-size: 24px">${c.icon}</span>
                <span style="font-weight: 500">${c.name}</span>
            </div>
        `;
    });
});