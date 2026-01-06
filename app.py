import PyPDF2
import re
from flask import Flask, request, jsonify
import os

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = 'uploads'
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024

if not os.path.exists('uploads'):
    os.makedirs('uploads')

JOB_ROLES = {
    'data-scientist': {
        'name': 'Data Scientist',
        'keywords': [
            'python', 'r', 'sql', 'machine learning', 'statistics', 'data analysis',
            'pandas', 'numpy', 'scikit-learn', 'tensorflow', 'pytorch', 
            'data visualization', 'tableau', 'power bi', 'jupyter', 'hypothesis testing',
            'a/b testing', 'regression', 'classification', 'clustering', 
            'feature engineering', 'model evaluation', 'cross-validation'
        ],
        'skills': [
            'Statistical Analysis', 'Machine Learning', 'Data Visualization',
            'Python/R Programming', 'SQL', 'Big Data Technologies', 
            'Communication Skills', 'Problem Solving'
        ],
        'experience': [
            'built predictive models', 'analyzed large datasets', 'created dashboards',
            'presented insights', 'data-driven decisions', 'improved accuracy'
        ]
    },
    'ml-engineer': {
        'name': 'Machine Learning Engineer',
        'keywords': [
            'python', 'tensorflow', 'pytorch', 'keras', 'scikit-learn', 'mlops',
            'docker', 'kubernetes', 'aws', 'azure', 'gcp', 'ci/cd', 'model deployment',
            'rest api', 'flask', 'fastapi', 'spark', 'airflow', 'model monitoring',
            'feature store', 'mlflow', 'kubeflow', 'model optimization'
        ],
        'skills': [
            'ML Model Development', 'MLOps', 'Cloud Platforms', 'Model Deployment',
            'API Development', 'Distributed Computing', 'Version Control'
        ],
        'experience': [
            'deployed ml models', 'built scalable pipelines', 'optimized performance',
            'automated training', 'production environment', 'reduced latency'
        ]
    },
    'deep-learning': {
        'name': 'Deep Learning Engineer',
        'keywords': [
            'deep learning', 'neural networks', 'cnn', 'rnn', 'lstm', 'transformer',
            'attention mechanism', 'pytorch', 'tensorflow', 'keras', 'computer vision',
            'nlp', 'gpu', 'cuda', 'model architecture', 'backpropagation',
            'gradient descent', 'batch normalization', 'dropout', 'transfer learning'
        ],
        'skills': [
            'Deep Neural Networks', 'Computer Vision', 'NLP', 'PyTorch/TensorFlow',
            'GPU Computing', 'Model Architecture Design', 'Research Skills'
        ],
        'experience': [
            'designed neural networks', 'trained deep learning models',
            'implemented research papers', 'improved accuracy', 'reduced training time'
        ]
    },
    'generative-ai': {
        'name': 'Generative AI Engineer',
        'keywords': [
            'generative ai', 'llm', 'gpt', 'bert', 'transformer', 'diffusion models',
            'gan', 'vae', 'stable diffusion', 'openai', 'anthropic', 'langchain',
            'llamaindex', 'prompt engineering', 'fine-tuning', 'rag',
            'retrieval augmented generation', 'embedding', 'vector database'
        ],
        'skills': [
            'Large Language Models', 'Prompt Engineering', 'RAG Systems',
            'Vector Databases', 'API Integration', 'Fine-tuning'
        ],
        'experience': [
            'built llm applications', 'implemented rag systems', 'fine-tuned models',
            'optimized prompts', 'integrated apis', 'improved response quality'
        ]
    },
    'agentic-ai': {
        'name': 'Agentic AI Engineer',
        'keywords': [
            'agentic ai', 'autonomous agents', 'multi-agent systems', 'langchain',
            'autogen', 'agent frameworks', 'tool use', 'function calling', 'planning',
            'reasoning', 'memory systems', 'agent orchestration', 'llm agents'
        ],
        'skills': [
            'Agent Architecture', 'LLM Integration', 'Tool Development',
            'Planning Algorithms', 'Multi-agent Coordination', 'System Design'
        ],
        'experience': [
            'developed autonomous agents', 'built multi-agent systems',
            'implemented tool-use', 'designed agent architectures'
        ]
    },
    'ai-researcher': {
        'name': 'AI Researcher',
        'keywords': [
            'research', 'publications', 'arxiv', 'conference', 'nips', 'icml', 'iclr',
            'cvpr', 'acl', 'emnlp', 'novel algorithms', 'theoretical', 'mathematical',
            'pytorch', 'tensorflow', 'experiments', 'ablation studies'
        ],
        'skills': [
            'Research Methodology', 'Technical Writing', 'Experimentation',
            'Mathematical Foundations', 'Algorithm Development', 'Publication Record'
        ],
        'experience': [
            'published research papers', 'conducted experiments', 'developed algorithms',
            'presented at conferences', 'reviewed papers'
        ]
    }
}

def extract_text_from_pdf(file_path):
    try:
        text = ""
        with open(file_path, 'rb') as file:
            pdf_reader = PyPDF2.PdfReader(file)
            for page in pdf_reader.pages:
                text += page.extract_text()
        return text
    except Exception as e:
        print(f"Error extracting text: {e}")
        return ""

def analyze_resume(text, job_role):
    role_data = JOB_ROLES[job_role]
    text_lower = text.lower()
    
    found_keywords = [kw for kw in role_data['keywords'] if kw.lower() in text_lower]
    keyword_score = (len(found_keywords) / len(role_data['keywords'])) * 100
    
    found_skills = [skill for skill in role_data['skills'] if skill.lower() in text_lower]
    skill_score = (len(found_skills) / len(role_data['skills'])) * 100
    
    found_experience = [exp for exp in role_data['experience'] if exp.lower() in text_lower]
    experience_score = (len(found_experience) / len(role_data['experience'])) * 100
    
    email_pattern = r'[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}'
    phone_pattern = r'(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}'
    
    has_email = bool(re.search(email_pattern, text))
    has_phone = bool(re.search(phone_pattern, text))
    has_linkedin = 'linkedin.com' in text_lower
    has_github = 'github.com' in text_lower
    
    format_score = sum([has_email, has_phone, has_linkedin, has_github]) * 25
    
    sections = {
        'summary': bool(re.search(r'(summary|objective|profile)', text_lower)),
        'experience': bool(re.search(r'(experience|employment|work history)', text_lower)),
        'education': bool(re.search(r'(education|academic|degree|university|college)', text_lower)),
        'skills': bool(re.search(r'(skills|technical skills|competencies)', text_lower)),
        'projects': bool(re.search(r'(projects|portfolio)', text_lower))
    }
    section_score = (sum(sections.values()) / len(sections)) * 100
    
    overall_score = (
        keyword_score * 0.35 +
        skill_score * 0.25 +
        experience_score * 0.20 +
        format_score * 0.10 +
        section_score * 0.10
    )
    
    recommendations = generate_recommendations(
        overall_score, sections, 
        {'has_email': has_email, 'has_phone': has_phone, 
         'has_linkedin': has_linkedin, 'has_github': has_github},
        len(found_keywords), len(role_data['keywords'])
    )
    
    return {
        'overall_score': round(overall_score),
        'keyword_score': round(keyword_score),
        'skill_score': round(skill_score),
        'experience_score': round(experience_score),
        'format_score': round(format_score),
        'section_score': round(section_score),
        'found_keywords': found_keywords[:20],
        'missing_keywords': [kw for kw in role_data['keywords'] if kw not in found_keywords][:20],
        'found_skills': found_skills,
        'missing_skills': [skill for skill in role_data['skills'] if skill not in found_skills],
        'sections': sections,
        'contact_info': {
            'email': has_email,
            'phone': has_phone,
            'linkedin': has_linkedin,
            'github': has_github
        },
        'recommendations': recommendations
    }

def generate_recommendations(score, sections, contact, found_kw, total_kw):
    recs = []
    
    if score < 60:
        recs.append('Your ATS score is low. Focus on incorporating more relevant keywords and skills.')
    elif score < 80:
        recs.append('Good start! Add more role-specific keywords to improve your score.')
    else:
        recs.append('Excellent ATS score! Your resume is well-optimized.')
    
    if not sections['summary']:
        recs.append('Add a professional summary highlighting your key qualifications.')
    if not sections['experience']:
        recs.append('Include a clear experience section with quantifiable achievements.')
    if not sections['skills']:
        recs.append('Add a dedicated technical skills section with relevant technologies.')
    if not sections['projects']:
        recs.append('Include projects showcasing your practical experience.')
    
    if not contact['has_email']:
        recs.append('Add your email address for contact purposes.')
    if not contact['has_linkedin']:
        recs.append('Include your LinkedIn profile URL.')
    if not contact['has_github']:
        recs.append('Add your GitHub profile to showcase your code portfolio.')
    
    return recs

@app.route('/')
def index():
    return HTML_TEMPLATE

@app.route('/analyze', methods=['POST'])
def analyze():
    try:
        if 'resume' not in request.files:
            return jsonify({'error': 'No file uploaded'}), 400
        
        file = request.files['resume']
        job_role = request.form.get('job_role', 'data-scientist')
        
        if file.filename == '':
            return jsonify({'error': 'No file selected'}), 400
        
        if not file.filename.endswith('.pdf'):
            return jsonify({'error': 'Please upload a PDF file'}), 400
        
        filename = 'resume.pdf'
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)
        
        text = extract_text_from_pdf(filepath)
        
        if not text:
            return jsonify({'error': 'Could not extract text from PDF'}), 400
        
        result = analyze_resume(text, job_role)
        result['role_name'] = JOB_ROLES[job_role]['name']
        
        os.remove(filepath)
        
        return jsonify(result)
    
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({'error': str(e)}), 500

HTML_TEMPLATE = '''<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AI/ML Resume ATS Analyzer</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            padding: 20px;
        }
        .container {
            max-width: 1200px;
            margin: 0 auto;
        }
        .header {
            text-align: center;
            color: white;
            margin-bottom: 40px;
        }
        .header h1 {
            font-size: 2.5rem;
            margin-bottom: 10px;
        }
        .card {
            background: white;
            border-radius: 16px;
            padding: 30px;
            margin-bottom: 30px;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
        }
        .form-group {
            margin-bottom: 25px;
        }
        .form-group label {
            display: block;
            font-weight: 600;
            margin-bottom: 10px;
            color: #333;
        }
        .form-group select {
            width: 100%;
            padding: 12px 15px;
            border: 2px solid #e0e0e0;
            border-radius: 8px;
            font-size: 1rem;
        }
        .upload-area {
            border: 3px dashed #d0d0d0;
            border-radius: 12px;
            padding: 50px 20px;
            text-align: center;
            cursor: pointer;
            margin-bottom: 25px;
        }
        .upload-area:hover {
            border-color: #667eea;
            background: #f8f9ff;
        }
        .btn-primary {
            width: 100%;
            padding: 15px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border: none;
            border-radius: 8px;
            font-size: 1.1rem;
            font-weight: 600;
            cursor: pointer;
        }
        .btn-primary:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4);
        }
        .loading {
            text-align: center;
            padding: 40px;
            display: none;
        }
        .spinner {
            width: 50px;
            height: 50px;
            border: 4px solid #f3f3f3;
            border-top: 4px solid #667eea;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 0 auto 20px;
        }
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        #results {
            display: none;
        }
        .score-card {
            text-align: center;
        }
        .score-circle {
            width: 180px;
            height: 180px;
            border-radius: 50%;
            display: inline-flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            margin: 20px auto;
        }
        .score-circle.high {
            background: linear-gradient(135deg, #d4fc79 0%, #96e6a1 100%);
        }
        .score-circle.medium {
            background: linear-gradient(135deg, #ffeaa7 0%, #fdcb6e 100%);
        }
        .score-circle.low {
            background: linear-gradient(135deg, #ff7675 0%, #fd79a8 100%);
        }
        .score-value {
            font-size: 3.5rem;
            font-weight: 700;
        }
        .score-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            margin: 30px 0;
        }
        .score-item {
            background: #f8f9fa;
            padding: 25px;
            border-radius: 12px;
        }
        .score-value-large {
            font-size: 2.5rem;
            font-weight: 700;
            margin: 10px 0;
        }
        .score-value-large.high { color: #27ae60; }
        .score-value-large.medium { color: #f39c12; }
        .score-value-large.low { color: #e74c3c; }
        .progress-bar {
            width: 100%;
            height: 8px;
            background: #e0e0e0;
            border-radius: 4px;
            overflow: hidden;
        }
        .progress-fill {
            height: 100%;
            transition: width 1s ease;
        }
        .progress-fill.high { background: #27ae60; }
        .progress-fill.medium { background: #f39c12; }
        .progress-fill.low { background: #e74c3c; }
        .tag-container {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            margin: 15px 0;
        }
        .tag {
            padding: 8px 16px;
            border-radius: 20px;
            font-size: 0.9rem;
        }
        .tag.found {
            background: #d4fc79;
            color: #27ae60;
        }
        .tag.missing {
            background: #ffcccb;
            color: #e74c3c;
        }
        .section-title {
            font-size: 1.4rem;
            margin-bottom: 20px;
            color: #333;
        }
        .checklist-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 15px;
        }
        .checklist-item {
            padding: 12px;
            background: #f8f9fa;
            border-radius: 8px;
            font-weight: 500;
        }
        .checklist-item.present {
            background: #d4fc79;
            color: #27ae60;
        }
        .checklist-item.absent {
            background: #ffcccb;
            color: #e74c3c;
        }
        .recommendations-card {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
        }
        .recommendations-list {
            list-style: none;
        }
        .recommendations-list li {
            padding: 15px;
            margin: 10px 0;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 8px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>AI/ML Resume ATS Analyzer</h1>
            <p>Optimize your resume for Data Science, ML, AI, and Generative AI roles</p>
        </div>

        <div class="card">
            <form id="upload-form" enctype="multipart/form-data">
                <div class="form-group">
                    <label for="job-role">Select Job Role</label>
                    <select id="job-role" name="job_role" required>
                        <option value="data-scientist">Data Scientist</option>
                        <option value="ml-engineer">Machine Learning Engineer</option>
                        <option value="deep-learning">Deep Learning Engineer</option>
                        <option value="generative-ai">Generative AI Engineer</option>
                        <option value="agentic-ai">Agentic AI Engineer</option>
                        <option value="ai-researcher">AI Researcher</option>
                    </select>
                </div>

                <div class="upload-area" id="upload-area">
                    <input type="file" id="resume-file" name="resume" accept=".pdf" required style="display:none;">
                    <p style="font-size: 1.2rem; font-weight: 600; margin-bottom: 5px;">Upload Your Resume (PDF)</p>
                    <p style="color: #666;">Click to browse or drag and drop</p>
                    <p id="file-name" style="color: #667eea; font-weight: 600; margin-top: 10px;"></p>
                </div>

                <button type="submit" class="btn-primary">Analyze Resume</button>
            </form>

            <div class="loading" id="loading">
                <div class="spinner"></div>
                <p>Analyzing your resume...</p>
            </div>
        </div>

        <div id="results">
            <div class="card score-card">
                <h2>ATS Score</h2>
                <div class="score-circle" id="score-circle">
                    <div class="score-value" id="overall-score">0</div>
                    <div>out of 100</div>
                </div>
                <div id="score-status"></div>
            </div>

            <div class="score-grid">
                <div class="score-item">
                    <div>Keyword Match</div>
                    <div class="score-value-large" id="keyword-score">0%</div>
                    <div class="progress-bar"><div class="progress-fill" id="keyword-progress"></div></div>
                </div>
                <div class="score-item">
                    <div>Skills Match</div>
                    <div class="score-value-large" id="skill-score">0%</div>
                    <div class="progress-bar"><div class="progress-fill" id="skill-progress"></div></div>
                </div>
                <div class="score-item">
                    <div>Experience</div>
                    <div class="score-value-large" id="experience-score">0%</div>
                    <div class="progress-bar"><div class="progress-fill" id="experience-progress"></div></div>
                </div>
                <div class="score-item">
                    <div>Format & Structure</div>
                    <div class="score-value-large" id="format-score">0%</div>
                    <div class="progress-bar"><div class="progress-fill" id="format-progress"></div></div>
                </div>
            </div>

            <div class="card">
                <h3 class="section-title">Keyword Analysis</h3>
                <h4 style="color: #27ae60; margin: 10px 0;">Found Keywords <span id="found-kw-count"></span></h4>
                <div class="tag-container" id="found-keywords"></div>
                <h4 style="color: #e74c3c; margin: 10px 0;">Missing Keywords <span id="missing-kw-count"></span></h4>
                <div class="tag-container" id="missing-keywords"></div>
            </div>

            <div class="card">
                <h3 class="section-title">Skills Assessment</h3>
                <h4 style="color: #27ae60; margin: 10px 0;">Found Skills</h4>
                <div class="tag-container" id="found-skills"></div>
                <h4 style="color: #e74c3c; margin: 10px 0;">Missing Skills</h4>
                <div class="tag-container" id="missing-skills"></div>
            </div>

            <div class="card">
                <h3 class="section-title">Resume Sections</h3>
                <div class="checklist-grid" id="sections-checklist"></div>
            </div>

            <div class="card">
                <h3 class="section-title">Contact Information</h3>
                <div class="checklist-grid" id="contact-checklist"></div>
            </div>

            <div class="card recommendations-card">
                <h3 class="section-title">Recommendations</h3>
                <ul class="recommendations-list" id="recommendations"></ul>
            </div>
        </div>
    </div>

    <script>
        const uploadArea = document.getElementById('upload-area');
        const fileInput = document.getElementById('resume-file');
        const fileName = document.getElementById('file-name');
        const uploadForm = document.getElementById('upload-form');
        const loading = document.getElementById('loading');
        const results = document.getElementById('results');

        uploadArea.addEventListener('click', () => fileInput.click());

        fileInput.addEventListener('change', () => {
            if (fileInput.files.length > 0) {
                fileName.textContent = fileInput.files[0].name;
            }
        });

        uploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadArea.style.borderColor = '#667eea';
        });

        uploadArea.addEventListener('dragleave', () => {
            uploadArea.style.borderColor = '#d0d0d0';
        });

        uploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadArea.style.borderColor = '#d0d0d0';
            if (e.dataTransfer.files.length > 0) {
                fileInput.files = e.dataTransfer.files;
                fileName.textContent = fileInput.files[0].name;
            }
        });

        uploadForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = new FormData(uploadForm);
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
                    setTimeout(() => results.scrollIntoView({ behavior: 'smooth' }), 300);
                } else {
                    alert('Error: ' + (data.error || 'Failed to analyze'));
                    uploadForm.style.display = 'block';
                }
            } catch (error) {
                alert('Error: ' + error.message);
                uploadForm.style.display = 'block';
            } finally {
                loading.style.display = 'none';
            }
        });

        function displayResults(data) {
            const score = data.overall_score;
            document.getElementById('overall-score').textContent = score;
            
            const scoreCircle = document.getElementById('score-circle');
            const scoreStatus = document.getElementById('score-status');
            
            let statusText, statusClass;
            if (score >= 80) {
                statusText = '✓ Excellent! ATS Optimized';
                statusClass = 'high';
            } else if (score >= 60) {
                statusText = '⚠ Good, needs improvement';
                statusClass = 'medium';
            } else {
                statusText = '✗ Needs optimization';
                statusClass = 'low';
            }
            
            scoreCircle.className = 'score-circle ' + statusClass;
            scoreStatus.textContent = statusText;
            scoreStatus.style.padding = '12px 24px';
            scoreStatus.style.borderRadius = '25px';
            scoreStatus.style.fontWeight = '600';
            scoreStatus.style.marginTop = '20px';
            scoreStatus.style.display = 'inline-block';
            
            if (statusClass === 'high') {
                scoreStatus.style.background = '#d4fc79';
                scoreStatus.style.color = '#27ae60';
            } else if (statusClass === 'medium') {
                scoreStatus.style.background = '#ffeaa7';
                scoreStatus.style.color = '#e17055';
            } else {
                scoreStatus.style.background = '#ff7675';
                scoreStatus.style.color = '#d63031';
            }
            
            updateScore('keyword', data.keyword_score);
            updateScore('skill', data.skill_score);
            updateScore('experience', data.experience_score);
            updateScore('format', data.format_score);
            
            displayTags('found-keywords', data.found_keywords, 'found');
            displayTags('missing-keywords', data.missing_keywords, 'missing');
            document.getElementById('found-kw-count').textContent = '(' + data.found_keywords.length + ')';
            document.getElementById('missing-kw-count').textContent = '(' + data.missing_keywords.length + ')';
            
            displayTags('found-skills', data.found_skills, 'found');
            displayTags('missing-skills', data.missing_skills, 'missing');
            
            displayChecklist('sections-checklist', data.sections);
            displayChecklist('contact-checklist', {
                'Email': data.contact_info.email,
                'Phone': data.contact_info.phone,
                'LinkedIn': data.contact_info.linkedin,
                'GitHub': data.contact_info.github
            });
            
            const recList = document.getElementById('recommendations');
            recList.innerHTML = '';
            data.recommendations.forEach(rec => {
                const li = document.createElement('li');
                li.textContent = rec;
                recList.appendChild(li);
            });
            
            results.style.display = 'block';
            uploadForm.style.display = 'block';
        }

        function updateScore(type, score) {
            document.getElementById(type + '-score').textContent = score + '%';
            const elem = document.getElementById(type + '-score');
            const progress = document.getElementById(type + '-progress');
            
            const className = score >= 80 ? 'high' : score >= 60 ? 'medium' : 'low';
            elem.className = 'score-value-large ' + className;
            progress.className = 'progress-fill ' + className;
            setTimeout(() => progress.style.width = score + '%', 100);
        }

        function displayTags(id, items, type) {
            const container = document.getElementById(id);
            container.innerHTML = '';
            items.forEach(item => {
                const tag = document.createElement('span');
                tag.className = 'tag ' + type;
                tag.textContent = item;
                container.appendChild(tag);
            });
        }

        function displayChecklist(id, items) {
            const container = document.getElementById(id);
            container.innerHTML = '';
            for (const [key, value] of Object.entries(items)) {
                const item = document.createElement('div');
                item.className = 'checklist-item ' + (value ? 'present' : 'absent');
                const icon = value ? '✓' : '✗';
                const label = key.charAt(0).toUpperCase() + key.slice(1);
                item.textContent = icon + ' ' + label;
                container.appendChild(item);
            }
        }
    </script>
</body>
</html>'''

if __name__ == '__main__':
    print("Starting ATS Analyzer on http://localhost:5000")
    app.run(debug=True, host='0.0.0.0', port=5000)