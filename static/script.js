// File upload handling
const uploadArea = document.getElementById('upload-area');
const fileInput = document.getElementById('resume-file');
const fileName = document.getElementById('file-name');
const uploadForm = document.getElementById('upload-form');
const loading = document.getElementById('loading');
const results = document.getElementById('results');
const analyzeBtn = document.getElementById('analyze-btn');

// Drag and drop functionality
uploadArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadArea.classList.add('dragover');
});

uploadArea.addEventListener('dragleave', () => {
    uploadArea.classList.remove('dragover');
});

uploadArea.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadArea.classList.remove('dragover');
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
        fileInput.files = files;
        updateFileName();
    }
});

// File input change
fileInput.addEventListener('change', updateFileName);

function updateFileName() {
    if (fileInput.files.length > 0) {
        fileName.textContent = fileInput.files[0].name;
        fileName.style.display = 'block';
    }
}

// Form submission
uploadForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(uploadForm);
    
    // Show loading
    uploadForm.style.display = 'none';
    loading.style.display = 'block';
    results.style.display = 'none';
    
    try {
        const response = await fetch('/analyze', {
            method: 'POST',
            body: formData
        });
        
        const data = await response.json();
        
        if (response.ok) {
            displayResults(data);
            
            // Scroll to results
            setTimeout(() => {
                results.scrollIntoView({ behavior: 'smooth' });
            }, 300);
        } else {
            alert('Error: ' + (data.error || 'Failed to analyze resume'));
            uploadForm.style.display = 'block';
        }
    } catch (error) {
        alert('Error: Failed to connect to server');
        uploadForm.style.display = 'block';
    } finally {
        loading.style.display = 'none';
    }
});

// Display results
function displayResults(data) {
    // Overall score
    const overallScore = data.overall_score;
    const scoreCircle = document.getElementById('score-circle');
    const scoreValue = document.getElementById('overall-score');
    const scoreStatus = document.getElementById('score-status');
    
    scoreValue.textContent = overallScore;
    
    let statusText, statusClass;
    if (overallScore >= 80) {
        statusText = '✓ Excellent! ATS Optimized';
        statusClass = 'high';
    } else if (overallScore >= 60) {
        statusText = '⚠ Good, but needs improvement';
        statusClass = 'medium';
    } else {
        statusText = '✗ Needs significant optimization';
        statusClass = 'low';
    }
    
    scoreCircle.className = 'score-circle ' + statusClass;
    scoreStatus.className = 'score-status ' + statusClass;
    scoreStatus.textContent = statusText;
    
    // Detailed scores
    updateScore('keyword', data.keyword_score);
    updateScore('skill', data.skill_score);
    updateScore('experience', data.experience_score);
    updateScore('format', data.format_score);
    
    // Keywords
    displayKeywords('found-keywords', data.found_keywords, 'found');
    displayKeywords('missing-keywords', data.missing_keywords, 'missing');
    document.getElementById('found-kw-count').textContent = `(${data.found_keywords.length})`;
    document.getElementById('missing-kw-count').textContent = `(${data.missing_keywords.length})`;
    
    // Skills
    displayKeywords('found-skills', data.found_skills, 'found');
    displayKeywords('missing-skills', data.missing_skills, 'missing');
    
    // Sections
    displayChecklist('sections-checklist', data.sections);
    
    // Contact info
    const contactInfo = {
        'Email': data.contact_info.email,
        'Phone': data.contact_info.phone,
        'LinkedIn': data.contact_info.linkedin,
        'GitHub': data.contact_info.github
    };
    displayChecklist('contact-checklist', contactInfo);
    
    // Recommendations
    displayRecommendations(data.recommendations);
    
    // Show results
    results.style.display = 'block';
    uploadForm.style.display = 'block';
}

function updateScore(type, score) {
    const scoreElement = document.getElementById(`${type}-score`);
    const progressElement = document.getElementById(`${type}-progress`);
    
    scoreElement.textContent = score + '%';
    
    let className;
    if (score >= 80) {
        className = 'high';
    } else if (score >= 60) {
        className = 'medium';
    } else {
        className = 'low';
    }
    
    scoreElement.className = 'score-value-large ' + className;
    progressElement.className = 'progress-fill ' + className;
    
    // Animate progress bar
    setTimeout(() => {
        progressElement.style.width = score + '%';
    }, 100);
}

function displayKeywords(containerId, keywords, type) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';
    
    if (keywords.length === 0) {
        container.innerHTML = '<p style="color: #999;">None</p>';
        return;
    }
    
    keywords.forEach(keyword => {
        const tag = document.createElement('span');
        tag.className = 'tag ' + type;
        tag.textContent = keyword;
        container.appendChild(tag);
    });
}

function displayChecklist(containerId, items) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';
    
    for (const [key, value] of Object.entries(items)) {
        const item = document.createElement('div');
        item.className = 'checklist-item ' + (value ? 'present' : 'absent');
        
        const icon = value ? '✓' : '✗';
        const label = key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, ' ');
        
        item.innerHTML = `<span style="font-size: 1.2rem;">${icon}</span> <span>${label}</span>`;
        container.appendChild(item);
    }
}

function displayRecommendations(recommendations) {
    const list = document.getElementById('recommendations');
    list.innerHTML = '';
    
    recommendations.forEach((rec, index) => {
        const li = document.createElement('li');
        li.setAttribute('data-num', index + 1);
        li.textContent = rec;
        list.appendChild(li);
    });
}

// Reset button functionality (optional)
function resetForm() {
    uploadForm.reset();
    fileName.textContent = '';
    fileName.style.display = 'none';
    results.style.display = 'none';
}