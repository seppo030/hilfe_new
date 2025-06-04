
(function(){
  const form = document.getElementById('heForm');
  const resultEl = document.getElementById('result');

  const AMOUNTS = { light:252, medium:630, severe:1008 }; // CHF / Monat (2025)
  /**
   * Prüft, ob alle Mindest­voraussetzungen erfüllt sind.
   */
  function baseRequirements(data){
    return data.resident && data.ahvRenter && data.needHelp && data.noOtherIns;
  }

  /**
   * Hauptberechnung.
   */
  function calculate(data){
    if(!baseRequirements(data)){
      return { ok:false, message:'Die Grundvoraussetzungen sind nicht erfüllt – kein Anspruch.'};
    }
    if(!data.living || !data.grade){
      return { ok:false, message:'Bitte Wohnsituation und Schweregrad auswählen.'};
    }
    if(data.living==='institution' && data.grade==='light'){
      return { ok:false, message:'Bei leichter Hilflosigkeit im Heim besteht kein Anspruch.'};
    }
    const amount = AMOUNTS[data.grade] ?? 0;
    return {
      ok:true,
      amount,
      message:`Voraussichtliche Entschädigung: <strong>CHF ${amount.toLocaleString('de-CH')}</strong> pro Monat.`
    };
  }

  form.addEventListener('submit', e=>{
    e.preventDefault();
    // Current form state
    const data = {
      resident: form.querySelector('#resident').checked,
      ahvRenter: form.querySelector('#ahvRenter').checked,
      needHelp: form.querySelector('#needHelp').checked,
      noOtherIns: form.querySelector('#noOtherIns').checked,
      living: form.querySelector('input[name="living"]:checked')?.value || '',
      grade:  form.querySelector('input[name="grade"]:checked')?.value || ''
    };

    const out = calculate(data);
    resultEl.innerHTML = out.message;
    resultEl.style.color = out.ok ? '#006400' : '#c00';
  });
})();
