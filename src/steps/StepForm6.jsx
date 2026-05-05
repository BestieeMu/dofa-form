import { useForm } from '../FormContext.jsx';
export default function StepForm6() {
  const { handleChange, handleCheckboxChange, checkboxChecked, getDeep } = useForm();
  return (<section className="card">
    <div className="step-header"><div className="step-icon">🏠</div><div><h2>Form 6 — Residential Placement Agreement</h2><p className="step-desc">Terms of residential placement</p></div></div>
    <p>This agreement is entered into between DOFA Pathways ("the Provider") and the participant named below ("Resident") and/or their authorized representative, for the provision of residential services.</p>
    <h3>Placement Details</h3>
    <div className="grid">
      <div><label className="required">Placement Start Date</label><input type="date" name="placement.placementStartDate" value={getDeep('placement.placementStartDate') || ''} onChange={handleChange} /></div>
      <div><label>Residence / Home Address</label><input name="placement.residenceHomeAddress" value={getDeep('placement.residenceHomeAddress') || ''} onChange={handleChange} /></div>
      <div><label>Room / Unit Assignment</label><input name="placement.roomUnitAssignment" value={getDeep('placement.roomUnitAssignment') || ''} onChange={handleChange} /></div>
      <div style={{gridColumn:'1 / -1'}}><label>Funding Source(s)</label>
        <div className="checkboxes">{['DDA Waiver','Medicaid','Private Pay','Grant Funded','Other'].map(o => (<label key={o}><input type="checkbox" checked={checkboxChecked('placement.fundingSources', o)} onChange={() => handleCheckboxChange('placement.fundingSources', o)} />{o}</label>))}</div>
      </div>
      <div style={{gridColumn:'1 / -1'}}><label>Other Funding Details</label><input name="placement.otherFundingDetails" value={getDeep('placement.otherFundingDetails') || ''} onChange={handleChange} /></div>
      <div style={{gridColumn:'1 / -1'}}><label>Financial Arrangement / Private-Pay Rate</label><textarea name="placement.financialArrangement" value={getDeep('placement.financialArrangement') || ''} onChange={handleChange} /></div>
    </div>
    <h3>Services to Be Provided</h3>
    <div className="checkboxes">{['Residential Habilitation (24-hr staffing)','Personal Care Assistance','Medication Administration / Management','Meal Preparation','Transportation','Community Integration Activities','Behavioral Support','Nursing / Health Monitoring','Employment / Vocational Support','Individualized Service Plan (ISP) Development'].map(o => (<label key={o}><input type="checkbox" checked={checkboxChecked('placement.servicesToBeProvided', o)} onChange={() => handleCheckboxChange('placement.servicesToBeProvided', o)} />{o}</label>))}</div>
    <h3>Resident Rights During Placement</h3>
    <div className="checkboxes">{['To be treated with dignity and respect at all times','To have privacy in personal matters and communications','To participate in the development and review of your service plan','To receive services in a safe, clean, and accessible environment','To voice grievances without retaliation','To have personal belongings in your room','To come and go as appropriate to your support needs and plan','To receive visitors at reasonable times'].map(o => (<label key={o}><input type="checkbox" checked={checkboxChecked('placement.residentRightsDuringPlacement', o)} onChange={() => handleCheckboxChange('placement.residentRightsDuringPlacement', o)} />{o}</label>))}</div>
    <h3>Fees, Billing & Discharge</h3>
    <p>Discharge / termination may occur with 30 days written notice by either party, or immediately if safety is at risk or funding is discontinued.</p>
    <h3>Acknowledgement & Signature</h3>
    <p>By signing below, the Resident/Representative acknowledges receipt of this agreement, understands the terms, and consents to placement.</p>
    <div className="grid">
      <div><label>Resident / Authorized Representative Signature</label><input name="placement.residentSignature" value={getDeep('placement.residentSignature') || ''} onChange={handleChange} /></div>
      <div><label>Resident Signature Date</label><input type="date" name="placement.residentSignatureDate" value={getDeep('placement.residentSignatureDate') || ''} onChange={handleChange} /></div>
      <div><label>Witness / Staff Signature</label><input name="placement.witnessStaffSignature" value={getDeep('placement.witnessStaffSignature') || ''} onChange={handleChange} /></div>
      <div><label>Witness / Staff Signature Date</label><input type="date" name="placement.witnessStaffSignatureDate" value={getDeep('placement.witnessStaffSignatureDate') || ''} onChange={handleChange} /></div>
      <div><label>Printed Name</label><input name="placement.printedName" value={getDeep('placement.printedName') || ''} onChange={handleChange} /></div>
      <div><label>Staff Printed Name</label><input name="placement.staffPrintedName" value={getDeep('placement.staffPrintedName') || ''} onChange={handleChange} /></div>
    </div>
  </section>);
}
