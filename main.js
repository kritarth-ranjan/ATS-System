import React, { useState } from 'react';
import { Upload, FileText, Award, AlertCircle, CheckCircle, XCircle, TrendingUp, Briefcase } from 'lucide-react';

const ATSAnalyzer = () => {
  const [file, setFile] = useState(null);
  const [jobRole, setJobRole] = useState('data-scientist');
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);

  const jobRoles = {
    'data-scientist': {
      name: 'Data Scientist',
      keywords: ['python', 'r', 'sql', 'machine learning', 'statistics', 'data analysis', 'pandas', 'numpy', 'scikit-learn', 'tensorflow', 'pytorch', 'data visualization', 'tableau', 'power bi', 'jupyter', 'hypothesis testing', 'a/b testing', 'regression', 'classification', 'clustering', 'feature engineering', 'model evaluation', 'cross-validation'],
      skills: ['Statistical Analysis', 'Machine Learning', 'Data Visualization', 'Python/R Programming', 'SQL', 'Big Data Technologies', 'Communication Skills'],
      experience: ['Built predictive models', 'Analyzed large datasets', 'Created dashboards', 'Presented insights to stakeholders']
    },
    'ml-engineer': {
      name: 'Machine Learning Engineer',
      keywords: ['python', 'tensorflow', 'pytorch', 'keras', 'scikit-learn', 'mlops', 'docker', 'kubernetes', 'aws', 'azure', 'gcp', 'ci/cd', 'model deployment', 'rest api', 'flask', 'fastapi', 'spark', 'airflow', 'model monitoring', 'feature store', 'mlflow', 'kubeflow', 'model optimization', 'hyperparameter tuning'],
      skills: ['ML Model Development', 'MLOps', 'Cloud Platforms', 'Model Deployment', 'API Development', 'Distributed Computing', 'Version Control'],
      experience: ['Deployed ML models to production', 'Built scalable ML pipelines', 'Optimized model performance', 'Automated model training']
    },
    'deep-learning': {
      name: 'Deep Learning Engineer',
      keywords: ['deep learning', 'neural networks', 'cnn', 'rnn', 'lstm', 'transformer', 'attention mechanism', 'pytorch', 'tensorflow', 'keras', 'computer vision', 'nlp', 'gpu', 'cuda', 'model architecture', 'backpropagation', 'gradient descent', 'batch normalization', 'dropout', 'transfer learning', 'fine-tuning', 'object detection', 'image segmentation', 'sequence modeling'],
      skills: ['Deep Neural Networks', 'Computer Vision', 'NLP', 'PyTorch/TensorFlow', 'GPU Computing', 'Model Architecture Design', 'Research Skills'],
      experience: ['Designed neural network architectures', 'Trained deep learning models', 'Implemented research papers', 'Optimized model performance']
    },
    'generative-ai': {
      name: 'Generative AI Engineer',
      keywords: ['generative ai', 'llm', 'gpt', 'bert', 'transformer', 'diffusion models', 'gan', 'vae', 'stable diffusion', 'openai', 'anthropic', 'langchain', 'llamaindex', 'prompt engineering', 'fine-tuning', 'rag', 'retrieval augmented generation', 'embedding', 'vector database', 'pinecone', 'weaviate', 'chromadb', 'hugging face', 'model evaluation'],
      skills: ['Large Language Models', 'Prompt Engineering', 'RAG Systems', 'Vector Databases', 'API Integration', 'Fine-tuning', 'Evaluation Metrics'],
      experience: ['Built LLM-powered applications', 'Implemented RAG systems', 'Fine-tuned language models', 'Optimized prompts']
    },
    'agentic-ai': {
      name: 'Agentic AI Engineer',
      keywords: ['agentic ai', 'autonomous agents', 'multi-agent systems', 'langchain', 'autogen', 'agent frameworks', 'tool use', 'function calling', 'planning', 'reasoning', 'memory systems', 'agent orchestration', 'llm agents', 'reinforcement learning', 'task decomposition', 'chain of thought', 'react framework', 'agent evaluation', 'human in the loop', 'agent safety'],
      skills: ['Agent Architecture', 'LLM Integration', 'Tool Development', 'Planning Algorithms', 'Multi-agent Coordination', 'Safety & Alignment', 'System Design'],
      experience: ['Developed autonomous AI agents', 'Built multi-agent systems', 'Implemented tool-use capabilities', 'Designed agent architectures']
    },
    'ai-researcher': {
      name: 'AI Researcher',
      keywords: ['research', 'publications', 'arxiv', 'conference', 'nips', 'icml', 'iclr', 'cvpr', 'acl', 'emnlp', 'novel algorithms', 'theoretical', 'mathematical', 'pytorch', 'tensorflow', 'experiments', 'ablation studies', 'benchmarking', 'state-of-the-art', 'peer review', 'grants', 'collaboration'],
      skills: ['Research Methodology', 'Technical Writing', 'Experimentation', 'Mathematical Foundations', 'Algorithm Development', 'Publication Record', 'Collaboration'],
      experience: ['Published research papers', 'Conducted novel experiments', 'Developed new algorithms', 'Presented at conferences']
    }
  };

  const analyzeResume = async (text, role) => {
    const roleData = jobRoles[role];
    const lowerText = text.toLowerCase();
    
    // Keyword matching
    const foundKeywords = roleData.keywords.filter(kw => 
      lowerText.includes(kw.toLowerCase())
    );
    const keywordScore = (foundKeywords.length / roleData.keywords.length) * 100;

    // Skills analysis
    const foundSkills = roleData.skills.filter(skill => 
      lowerText.includes(skill.toLowerCase())
    );
    const skillScore = (foundSkills.length / roleData.skills.length) * 100;

    // Experience indicators
    const foundExperience = roleData.experience.filter(exp => 
      lowerText.includes(exp.toLowerCase())
    );
    const experienceScore = (foundExperience.length / roleData.experience.length) * 100;

    // Format analysis
    const hasEmail = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/i.test(text);
    const hasPhone = /(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/.test(text);
    const hasLinkedIn = /linkedin\.com/i.test(text);
    const hasGitHub = /github\.com/i.test(text);
    const formatScore = ((hasEmail ? 25 : 0) + (hasPhone ? 25 : 0) + (hasLinkedIn ? 25 : 0) + (hasGitHub ? 25 : 0));

    // Section detection
    const sections = {
      summary: /summary|objective|profile/i.test(text),
      experience: /experience|employment|work history/i.test(text),
      education: /education|academic|degree/i.test(text),
      skills: /skills|technical skills|competencies/i.test(text),
      projects: /projects|portfolio/i.test(text)
    };
    const sectionScore = (Object.values(sections).filter(Boolean).length / Object.keys(sections).length) * 100;

    // Calculate overall ATS score
    const overallScore = (
      keywordScore * 0.35 +
      skillScore * 0.25 +
      experienceScore * 0.20 +
      formatScore * 0.10 +
      sectionScore * 0.10
    );

    return {
      overallScore: Math.round(overallScore),
      keywordScore: Math.round(keywordScore),
      skillScore: Math.round(skillScore),
      experienceScore: Math.round(experienceScore),
      formatScore: Math.round(formatScore),
      sectionScore: Math.round(sectionScore),
      foundKeywords,
      missingKeywords: roleData.keywords.filter(kw => !foundKeywords.includes(kw)),
      foundSkills,
      missingSkills: roleData.skills.filter(skill => !foundSkills.includes(skill)),
      sections,
      contactInfo: { hasEmail, hasPhone, hasLinkedIn, hasGitHub },
      recommendations: generateRecommendations(overallScore, sections, { hasEmail, hasPhone, hasLinkedIn, hasGitHub }, foundKeywords.length, roleData.keywords.length)
    };
  };

  const generateRecommendations = (score, sections, contact, foundKw, totalKw) => {
    const recs = [];
    
    if (score < 60) recs.push('Your ATS score is low. Focus on incorporating more relevant keywords and skills.');
    if (score >= 60 && score < 80) recs.push('Good start! Add more role-specific keywords to improve your score.');
    if (score >= 80) recs.push('Excellent ATS score! Your resume is well-optimized.');
    
    if (!sections.summary) recs.push('Add a professional summary highlighting your key qualifications.');
    if (!sections.experience) recs.push('Include a clear experience section with quantifiable achievements.');
    if (!sections.skills) recs.push('Add a dedicated technical skills section with relevant technologies.');
    if (!sections.projects) recs.push('Include projects showcasing your practical experience.');
    
    if (!contact.hasEmail) recs.push('Add your email address for contact purposes.');
    if (!contact.hasLinkedIn) recs.push('Include your LinkedIn profile URL.');
    if (!contact.hasGitHub) recs.push('Add your GitHub profile to showcase your code.');
    
    if (foundKw / totalKw < 0.3) recs.push('Incorporate more job-specific keywords throughout your resume.');
    
    return recs;
  };

  const handleFileUpload = async (e) => {
    const uploadedFile = e.target.files[0];
    if (!uploadedFile) return;

    if (uploadedFile.type !== 'application/pdf') {
      alert('Please upload a PDF file');
      return;
    }

    setFile(uploadedFile);
    setLoading(true);

    try {
      const arrayBuffer = await uploadedFile.arrayBuffer();
      const uint8Array = new Uint8Array(arrayBuffer);
      
      // Simple text extraction from PDF
      const text = await extractTextFromPDF(uint8Array);
      
      const result = await analyzeResume(text, jobRole);
      setAnalysis(result);
    } catch (error) {
      alert('Error analyzing resume. Please try again.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const extractTextFromPDF = async (data) => {
    // Convert uint8array to string for basic text extraction
    const decoder = new TextDecoder('utf-8');
    let text = decoder.decode(data);
    
    // Basic PDF text extraction (remove PDF formatting)
    text = text.replace(/[^\x20-\x7E\n]/g, ' ');
    text = text.replace(/\s+/g, ' ');
    
    return text;
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBg = (score) => {
    if (score >= 80) return 'bg-green-100';
    if (score >= 60) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl p-8 mb-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2 flex items-center justify-center gap-3">
              <Briefcase className="w-10 h-10 text-indigo-600" />
              AI/ML Resume ATS Analyzer
            </h1>
            <p className="text-gray-600">Optimize your resume for Data Science, ML, AI, and Generative AI roles</p>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Select Job Role
            </label>
            <select
              value={jobRole}
              onChange={(e) => setJobRole(e.target.value)}
              className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none"
            >
              {Object.entries(jobRoles).map(([key, role]) => (
                <option key={key} value={key}>{role.name}</option>
              ))}
            </select>
          </div>

          <div className="border-4 border-dashed border-gray-300 rounded-xl p-12 text-center hover:border-indigo-400 transition-colors">
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileUpload}
              className="hidden"
              id="resume-upload"
            />
            <label htmlFor="resume-upload" className="cursor-pointer">
              <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-lg font-semibold text-gray-700 mb-2">
                {file ? file.name : 'Upload Your Resume (PDF)'}
              </p>
              <p className="text-sm text-gray-500">
                Click to browse or drag and drop
              </p>
            </label>
          </div>

          {loading && (
            <div className="mt-8 text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
              <p className="mt-4 text-gray-600">Analyzing your resume...</p>
            </div>
          )}
        </div>

        {analysis && !loading && (
          <div className="space-y-6">
            {/* Overall Score Card */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">ATS Score</h2>
                <div className={`inline-block ${getScoreBg(analysis.overallScore)} rounded-full p-8 mb-4`}>
                  <div className={`text-6xl font-bold ${getScoreColor(analysis.overallScore)}`}>
                    {analysis.overallScore}
                  </div>
                  <div className="text-gray-600 font-semibold">out of 100</div>
                </div>
                <div className="mt-4">
                  {analysis.overallScore >= 80 && (
                    <div className="flex items-center justify-center gap-2 text-green-600">
                      <CheckCircle className="w-6 h-6" />
                      <span className="font-semibold">Excellent! ATS Optimized</span>
                    </div>
                  )}
                  {analysis.overallScore >= 60 && analysis.overallScore < 80 && (
                    <div className="flex items-center justify-center gap-2 text-yellow-600">
                      <AlertCircle className="w-6 h-6" />
                      <span className="font-semibold">Good, but needs improvement</span>
                    </div>
                  )}
                  {analysis.overallScore < 60 && (
                    <div className="flex items-center justify-center gap-2 text-red-600">
                      <XCircle className="w-6 h-6" />
                      <span className="font-semibold">Needs significant optimization</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Detailed Scores */}
            <div className="grid md:grid-cols-2 gap-6">
              <ScoreCard title="Keyword Match" score={analysis.keywordScore} icon={<FileText />} />
              <ScoreCard title="Skills Match" score={analysis.skillScore} icon={<Award />} />
              <ScoreCard title="Experience Indicators" score={analysis.experienceScore} icon={<TrendingUp />} />
              <ScoreCard title="Format & Structure" score={analysis.formatScore} icon={<CheckCircle />} />
            </div>

            {/* Keywords Analysis */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <FileText className="w-6 h-6 text-indigo-600" />
                Keyword Analysis
              </h3>
              <div className="mb-6">
                <h4 className="font-semibold text-green-600 mb-2">Found Keywords ({analysis.foundKeywords.length})</h4>
                <div className="flex flex-wrap gap-2">
                  {analysis.foundKeywords.slice(0, 15).map((kw, idx) => (
                    <span key={idx} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                      {kw}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-red-600 mb-2">Missing Keywords ({analysis.missingKeywords.length})</h4>
                <div className="flex flex-wrap gap-2">
                  {analysis.missingKeywords.slice(0, 15).map((kw, idx) => (
                    <span key={idx} className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">
                      {kw}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Skills Analysis */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Award className="w-6 h-6 text-indigo-600" />
                Skills Assessment
              </h3>
              <div className="mb-6">
                <h4 className="font-semibold text-green-600 mb-2">Found Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {analysis.foundSkills.map((skill, idx) => (
                    <span key={idx} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-red-600 mb-2">Missing Skills to Add</h4>
                <div className="flex flex-wrap gap-2">
                  {analysis.missingSkills.map((skill, idx) => (
                    <span key={idx} className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Sections Check */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Resume Sections</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {Object.entries(analysis.sections).map(([section, present]) => (
                  <div key={section} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    {present ? (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-600" />
                    )}
                    <span className="font-medium capitalize">{section}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Contact Information</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {Object.entries(analysis.contactInfo).map(([info, present]) => (
                  <div key={info} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    {present ? (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-600" />
                    )}
                    <span className="font-medium capitalize">{info.replace('has', '')}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommendations */}
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl shadow-xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <AlertCircle className="w-7 h-7" />
                Recommendations
              </h3>
              <ul className="space-y-3">
                {analysis.recommendations.map((rec, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="bg-white text-indigo-600 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5 font-bold text-sm">
                      {idx + 1}
                    </span>
                    <span className="text-lg">{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const ScoreCard = ({ title, score, icon }) => {
  const getColor = (score) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getBgColor = (score) => {
    if (score >= 80) return 'bg-green-50';
    if (score >= 60) return 'bg-yellow-50';
    return 'bg-red-50';
  };

  return (
    <div className={`${getBgColor(score)} rounded-xl shadow-lg p-6`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-700">{title}</h3>
        <div className="text-indigo-600">{icon}</div>
      </div>
      <div className={`text-4xl font-bold ${getColor(score)}`}>{score}%</div>
      <div className="mt-3 bg-gray-200 rounded-full h-2">
        <div
          className={`h-2 rounded-full ${score >= 80 ? 'bg-green-600' : score >= 60 ? 'bg-yellow-600' : 'bg-red-600'}`}
          style={{ width: `${score}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ATSAnalyzer;
