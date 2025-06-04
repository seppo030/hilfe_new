
(()=>{

const AMOUNTS = { light:252, medium:630, severe:1008 };

const steps = Array.from(document.querySelectorAll('.step'));
let current = 0;
let answers = {};

function showStep(i){
  steps.forEach((s,idx)=> s.classList.toggle('active', idx===i));
  document.getElementById('bar').style.width = ((i)/ (steps.length-1))*100 + '%';
}

function next(){
  current++;
  if(current < steps.length){
    showStep(current);
  }
}

function evaluate(){
  const fails=[];
  const reasonsPassed=[];

  if(answers.resident!=='yes') fails.push('Kein dauerhafter Wohnsitz in der Schweiz');
  else reasonsPassed.push('Wohnsitz‑Kriterium erfüllt');
  if(answers.ahv!=='yes') fails.push('Keine AHV‑Altersrente oder Ergänzungsleistungen');
  else reasonsPassed.push('Renten‑Kriterium erfüllt');
  if(answers.help!=='yes') fails.push('Hilflosigkeit besteht nicht seit ≥6&nbsp;Monaten');
  else reasonsPassed.push('Dauer‑Kriterium erfüllt');
  if(answers.otherIns!=='no') fails.push('Bereits Hilflosenentschädigung von UV/MV');
  else reasonsPassed.push('Keine Doppelleistung');
  if(answers.living==='') fails.push('Wohnsituation nicht angegeben');
  if(answers.grade==='') fails.push('Schweregrad nicht angegeben');

  // Heim + leichte Hilflosigkeit Spezialfall
  if(fails.length===0 && answers.living==='institution' && answers.grade==='light'){
     fails.push('Bei leichter Hilflosigkeit im Heim besteht kein Anspruch');
  }

  if(fails.length>0){
    return {
      ok:false,
      reasons:fails
    };
  }
  const amount = AMOUNTS[answers.grade];
  const explain = [
    `Schweregrad <strong>${displayGrade(answers.grade)}</strong>`,
    `Wohnsituation: <strong>${answers.living==='home'?'Zuhause':'Heim/Klinik'}</strong>`
  ];
  return {
    ok:true,
    amount,
    reasons: explain.concat(reasonsPassed)
  };
}

function displayGrade(g){
  return g==='light'?'leicht':g==='medium'?'mittel':'schwer';
}

document.querySelectorAll('.options button').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    const q = btn.dataset.q;
    const v = btn.dataset.v;
    answers[q]=v;
    if(current < steps.length-2){
      next();
    }else{
      // compute result
      const res = evaluate();
      const resultDiv = document.getElementById('result');
      if(res.ok){
        resultDiv.innerHTML = `
          <p class="ok">Voraussichtliche Entschädigung: <strong>CHF ${res.amount.toLocaleString('de-CH')}</strong> pro Monat.</p>
          <ul>${res.reasons.map(r=>'<li>'+r+'</li>').join('')}</ul>
          <p><small>*Stand Beträge: 1. Januar 2025. Ergebnis ohne Gewähr.</small></p>
        `;
      }else{
        resultDiv.innerHTML = `
          <p class="fail">Kein Anspruch, weil:</p>
          <ul>${res.reasons.map(r=>'<li>'+r+'</li>').join('')}</ul>
        `;
      }
      next();
    }
  });
});

document.getElementById('restart').addEventListener('click', ()=>{
  answers = {};
  current = 0;
  showStep(0);
});

showStep(0);

})();
