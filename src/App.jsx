import { useState, useCallback, useEffect, useRef } from 'react';
import './App.css';
import { STEPS } from './steps.js';
import { FormContext, setDeep, getDeep } from './FormContext.jsx';
import StepWelcome from './steps/StepWelcome.jsx';
import StepContact from './steps/StepContact.jsx';
import StepChecklist from './steps/StepChecklist.jsx';
import StepForm1 from './steps/StepForm1.jsx';
import StepForm2 from './steps/StepForm2.jsx';
import StepForm3 from './steps/StepForm3.jsx';
import StepForm4 from './steps/StepForm4.jsx';
import StepForm5 from './steps/StepForm5.jsx';
import StepForm6 from './steps/StepForm6.jsx';
import StepForm7 from './steps/StepForm7.jsx';
import StepForm8 from './steps/StepForm8.jsx';
import StepForm9 from './steps/StepForm9.jsx';
import StepSignatures from './steps/StepSignatures.jsx';

const STEP_COMPONENTS = [StepWelcome,StepContact,StepChecklist,StepForm1,StepForm2,StepForm3,StepForm4,StepForm5,StepForm6,StepForm7,StepForm8,StepForm9,StepSignatures];

function App() {
  const [data, setData] = useState({});
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [toastMsg, setToastMsg] = useState('');
  const [animClass, setAnimClass] = useState('step-content');
  const [modal, setModal] = useState({ isOpen: false, title: '', message: '', type: 'success', pdfUrl: null });
  const mainRef = useRef(null);

  const skipForm5 = getDeep(data, 'risk.form5Required') === 'No — skip to Form 6';

  const visibleSteps = STEPS.map((s, i) => ({ ...s, index: i, skipped: s.conditional && skipForm5 }));

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setData(prev => {
      const next = JSON.parse(JSON.stringify(prev || {}));
      setDeep(next, name, value);
      if (name === 'risk.form5Required' && value === 'No — skip to Form 6') delete next.clinical;
      return next;
    });
    setErrors(prev => { const n = { ...prev }; delete n[name]; return n; });
  }, []);

  const handleCheckboxChange = useCallback((group, value) => {
    setData(prev => {
      const next = JSON.parse(JSON.stringify(prev || {}));
      const current = getDeep(next, group) || [];
      setDeep(next, group, current.includes(value) ? current.filter(i => i !== value) : [...current, value]);
      return next;
    });
  }, []);

  const checkboxChecked = useCallback((group, value) => {
    return (getDeep(data, group) || []).includes(value);
  }, [data]);

  const validateStep = useCallback(() => {
    const step = STEPS[currentStep];
    if (!step.requiredFields) return true;
    const newErrors = {};
    step.requiredFields.forEach(field => {
      const val = getDeep(data, field);
      if (!val || !val.toString().trim()) newErrors[field] = 'This field is required';
    });
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      setToastMsg('Please fill in all required fields before continuing');
      setTimeout(() => setToastMsg(''), 3000);
      return false;
    }
    return true;
  }, [currentStep, data]);

  const goToStep = useCallback((targetStep) => {
    if (targetStep < 0 || targetStep >= STEPS.length) return;
    if (visibleSteps[targetStep].skipped) return;
    setAnimClass('step-content slide-out');
    setTimeout(() => {
      setCurrentStep(targetStep);
      setErrors({});
      setAnimClass('step-content');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 200);
  }, [visibleSteps]);

  const nextStep = useCallback(() => {
    if (!validateStep()) return;
    let next = currentStep + 1;
    while (next < STEPS.length && visibleSteps[next].skipped) next++;
    if (next < STEPS.length) goToStep(next);
  }, [currentStep, validateStep, goToStep, visibleSteps]);

  const prevStep = useCallback(() => {
    let prev = currentStep - 1;
    while (prev >= 0 && visibleSteps[prev].skipped) prev--;
    if (prev >= 0) goToStep(prev);
  }, [currentStep, goToStep, visibleSteps]);

  const saveDraft = () => { localStorage.setItem('dofaIntakeDraft', JSON.stringify({ data, currentStep })); setToastMsg('Draft saved!'); setTimeout(() => setToastMsg(''), 2000); };
  const loadDraft = () => {
    const raw = localStorage.getItem('dofaIntakeDraft');
    if (!raw) { setToastMsg('No saved draft found'); setTimeout(() => setToastMsg(''), 2500); return; }
    try { const parsed = JSON.parse(raw); setData(parsed.data || parsed); if (parsed.currentStep) setCurrentStep(parsed.currentStep); setToastMsg('Draft loaded!'); setTimeout(() => setToastMsg(''), 2000); } catch { setToastMsg('Could not load draft'); setTimeout(() => setToastMsg(''), 2500); }
  };

  const submitToGoogleSheets = async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/submit/google', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
      const result = await response.json().catch(() => ({}));
      if (!response.ok || result.ok === false) { 
        setModal({ isOpen: true, title: 'Submission Failed', message: result.error || 'Unable to submit to Google Sheets.', type: 'error' });
        return; 
      }
      setModal({ isOpen: true, title: 'Success!', message: 'Submitted successfully.', type: 'success', pdfUrl: result.pdfUrl });
    } catch { 
      setModal({ isOpen: true, title: 'Error', message: 'Unable to submit right now. Please check the API server and Apps Script URL.', type: 'error' });
    }
    finally { setIsSubmitting(false); }
  };

  const totalVisible = visibleSteps.filter(s => !s.skipped).length;
  const currentVisible = visibleSteps.filter((s, i) => i <= currentStep && !s.skipped).length;
  const progressPct = (currentVisible / totalVisible) * 100;
  const isLastStep = currentStep === STEPS.length - 1;
  const StepComponent = STEP_COMPONENTS[currentStep];
  const stepDef = STEPS[currentStep];

  const ctxValue = { data, handleChange, handleCheckboxChange, checkboxChecked, getDeep: (path) => getDeep(data, path), errors };

  return (
    <FormContext.Provider value={ctxValue}>
      <div className="app-shell">
        <header className="app-header">
          <div className="header-inner">
            <img src="/logo.png" alt="DOFA Pathways" className="header-logo" />
            <div className="header-text">
              <h1>DOFA PATHWAYS</h1>
              <div className="header-tagline">Developing Opportunities For All</div>
              <div className="header-subtitle">Residential Services — New Admission Intake Form</div>
            </div>
            <div className="header-decor"><span></span><span></span></div>
          </div>
        </header>

        <div className="progress-wrapper">
          <div className="progress-inner">
            <div className="progress-meta">
              <span className="progress-step-label">{stepDef.icon} {stepDef.title}</span>
              <span className="progress-step-count">Step {currentVisible} of {totalVisible}</span>
            </div>
            <div className="progress-track"><div className="progress-fill" style={{ width: `${progressPct}%` }}></div></div>
            <div className="progress-dots">
              {visibleSteps.map((s, i) => (
                <div className="progress-dot-wrapper" key={s.id}>
                  {i > 0 && <div className={`progress-connector${i <= currentStep && !s.skipped ? ' filled' : ''}`}></div>}
                  <div
                    className={`progress-dot${i === currentStep ? ' active' : i < currentStep && !s.skipped ? ' completed' : ''}${s.skipped ? ' skipped' : ''}`}
                    onClick={() => { if (i < currentStep) goToStep(i); }}
                    title={s.title}
                  >{i < currentStep && !s.skipped ? '✓' : i + 1}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <main className="wizard-main" ref={mainRef}>
          <form id="intakeForm" onSubmit={e => e.preventDefault()}>
            <div className="step-container">
              <div className={animClass} key={currentStep}>
                <StepComponent />
              </div>
            </div>
          </form>
        </main>

        <div className={`validation-toast${toastMsg ? ' show' : ''}`}>{toastMsg}</div>

        {modal.isOpen && (
          <div className="modal-overlay">
            <div className="modal-content">
              <div className={`modal-icon ${modal.type}`}>{modal.type === 'success' ? '✓' : '⚠'}</div>
              <h3 className="modal-title">{modal.title}</h3>
              <p className="modal-message">{modal.message}</p>
              {modal.pdfUrl && (
                <div className="modal-pdf">
                  <a href={modal.pdfUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">📄 View Saved PDF</a>
                </div>
              )}
              <div className="modal-actions">
                <button type="button" className="btn-secondary" onClick={() => setModal({ ...modal, isOpen: false })}>Close</button>
              </div>
            </div>
          </div>
        )}

        <div className="nav-footer">
          <div className="nav-inner">
            <div className="nav-left">
              {currentStep > 0 && <button type="button" className="btn-back" onClick={prevStep}>← Back</button>}
            </div>
            <div className="nav-center">
              <button type="button" className="btn-draft" onClick={saveDraft}>💾 Save</button>
              <button type="button" className="btn-draft" onClick={loadDraft}>📂 Load</button>
            </div>
            <div className="nav-right">
              {isLastStep
                ? <button type="button" className="btn-submit" onClick={submitToGoogleSheets} disabled={isSubmitting}>{isSubmitting ? 'Submitting…' : '✓ Submit Form'}</button>
                : <button type="button" className="btn-primary" onClick={nextStep}>Next →</button>
              }
            </div>
          </div>
        </div>
      </div>
    </FormContext.Provider>
  );
}

export default App;
