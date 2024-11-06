const questions = [
  { 
    id: 'P1', 
    question: 'Seberapa jauh pH air yang Anda gunakan dari rentang ideal? (6,5 – 7,5)',
    expertCF: 0.8,
    options: [
      { text: 'Berada pada rentang Ideal', cf: 0.8, conclusionText: 'pH air ini termasuk optimal', adviceText: 'Anda hanya perlu melakukan pemeliharaan rutin dan periksa pH secara berkala' },
      { text: 'Sedikit di luar rentang ideal', cf: 0.5, conclusionText: 'pH air ini kurang optimal', adviceText: 'Anda dapat menambahkan garam ikan, atau juga menggunakan daun ketapang untuk membuat pH menjadi ideal' },
      { text: 'Jauh dari rentang ideal', cf: 0, conclusionText: 'pH air ini belum optimal', adviceText: 'Anda dapat mengendapkan air selama 1 malam, kemudian menggunakan garam ikan dan daun ketapang untuk membuat pH lebih ideal' }
    ]
  },
  { 
    id: 'P2', 
    question: 'Apakah kadar oksigen terlarut dalam air Anda berada di atas 5 mg/L?',
    expertCF: 0.8,
    options: [
      { text: 'Dalam rentang ideal', cf: 0.8, conclusionText: 'Oksigen terlarut dalam kondisi ideal', adviceText: 'Lanjutkan pemantauan kadar oksigen secara berkala.' },
      { text: 'Di sekitar 4 – 5 mg/L', cf: 0.55, conclusionText: 'Oksigen terlarut sedikit kurang', adviceText: 'Anda dapat menambahkan aerator untuk meningkatkan kadar oksigen di air' },
      { text: 'Kurang dari 4 mg/L', cf: 0, conclusionText: 'Oksigen terlarut belum mencukupi', adviceText: 'Anda perlu mencari sumber air lain seperti, air mineral galon yang memiliki kadar oksigen tinggi, atau menggunakan airator' }
    ]
  },
  { 
    id: 'P3', 
    question: 'Seberapa dekat suhu air Anda dengan rentang ideal? (20 – 24 C)',
    expertCF: 0.8,
    options: [
      { text: 'Suhu normal (ideal)', cf: 0.8, conclusionText: 'Suhu air ini dalam kondisi ideal', adviceText: 'Anda hanya perlu memastikan suhu tetap stabil dan tidak fluktuatif' },
      { text: 'Agak dekat dengan rentang ideal', cf: 0.5, conclusionText: 'Suhu air ini sedikit kurang optimal', adviceText: 'Anda dapat menempatkan akuarium di tempat yang lebih sejuk.' },
      { text: 'Jauh dari rentang ideal', cf: 0, conclusionText: 'Suhu air ini belum optimal', adviceText: 'Anda bisa menambahkan heater air jika suhu terlalu dingin. Jika suhu terlalu panas anda dapat menggunakan es batu untuk membuat suhu menjadi lebih ideal.' }
    ]
  },
  { 
    id: 'P4', 
    question: 'Apakah air yang Anda gunakan terlihat jernih/keruh?',
    expertCF: 0.8, 
    options: [
      { text: 'Sangat jernih', cf: 0.9, conclusionText: 'Kejernihan air sangat baik', adviceText: 'Lanjutkan menjaga kejernihan air untuk kesehatan ikan.' },
      { text: 'Sedikit keruh', cf: 0.5, conclusionText: 'Kejernihan air kurang optimal', adviceText: 'Anda dapat melakukan pengurasan air dengan rentang waktu dua minggu sekali.' },
      { text: 'Sangat Keruh', cf: 0, conclusionText: 'Kejernihan air sangat buruk', adviceText: 'Anda Perlu memeriksa kondisi filtrasi pada akurium, dan melakukan pengurasan secara menyeluruh.' }
    ]
  },
  { 
    id: 'P5', 
    question: 'Seberapa kuat bau besi atau amis atau busuk pada air yang Anda gunakan?',
    expertCF: 0.8,
    options: [
      { text: 'Tidak ada bau', cf: 0.7, conclusionText: 'Air tidak memiliki bau yang mengganggu', adviceText: 'Pertahankan kebersihan air agar tidak muncul bau.' },
      { text: 'Bau samar-samar', cf: 0.5, conclusionText: 'Air memiliki sedikit bau', adviceText: 'Anda dapat mengecek sistem filtrasi dan mengganti air secara berkala.' },
      { text: 'Bau sangat kuat', cf: 0, conclusionText: 'Air memiliki bau yang kuat', adviceText: 'Anda perlu mengecek sumber air yang digunakan, atau menggunakan sumber air lain' }
    ]
  },
  { 
    id: 'P6', 
    question: 'Seberapa jelas atau berwarna air yang Anda gunakan?',
    expertCF: 0.7,
    options: [
      { text: 'Bening', cf: 0.7, conclusionText: 'Air tampak sangat bening', adviceText: 'Lanjutkan menjaga kualitas air tetap bening untuk kesehatan ikan.' },
      { text: 'Sedikit berwarna', cf: 0.5, conclusionText: 'Air memiliki warna sedikit keruh', adviceText: 'Anda perlu mengganti air dan juga meningkatkan sistem filtrasi agar lebih baik' },
      { text: 'Sangat berwarna', cf: 0, conclusionText: 'Anda perlu lakukan pembersihan dan periksa sumber pencemaran untuk menjaga kualitas air' }
    ]
  }
];

const rules = [
  { id: 'R1', condition: (cf) => cf >= 0.8, conclusion: 'Lingkungan sangat mendukung untuk pemeliharaan ikan mas koki.' },
  { id: 'R2', condition: (cf) => cf >= 0.5 && cf < 0.8, conclusion: 'Lingkungan cukup baik, tetapi ada beberapa hal yang dapat diperbaiki.' },
  { id: 'R3', condition: (cf) => cf < 0.5, conclusion: 'Lingkungan kurang mendukung, perlu perhatian lebih lanjut.' }
];

function generateQuestions() {
  let questionHTML = '';
  questions.forEach((q, index) => {
    questionHTML += `<div class="question"><p>${q.question}</p>`;
    q.options.forEach((opt) => {
      questionHTML += `
          <label class="option">
              <input type="radio" name="q${index}" value="${opt.cf}">
              ${opt.text}
          </label>
      `;
    });
    questionHTML += `</div>`;
  });
  document.getElementById('questions').innerHTML = questionHTML;
}

function forwardChaining() {
  let cfValues = [];
  let facts = [];
  let conclusions = [];

  questions.forEach((q, index) => {
    const userAnswer = document.querySelector(`input[name="q${index}"]:checked`);
    const userCF = parseFloat(userAnswer?.value || 0);
    const expertCF = q.expertCF;

    // Penggabungan CF dengan menggunakan metode minimum
    const combinedCF = Math.min(userCF, expertCF);
    cfValues.push(combinedCF * 0.37);

    if (userAnswer) {
      const selectedOption = q.options.find(opt => opt.cf === userCF);
      facts.push({
        question: q.question,
        answer: selectedOption?.text || 'Tidak ada jawaban',
        conclusionText: selectedOption?.conclusionText || 'Tidak ada kesimpulan',
        adviceText: selectedOption?.adviceText || 'Tidak ada saran',
        cf: combinedCF * 0.37
      });
    }
  });

  // Menggunakan aturan parallel untuk menghitung CF Total
  let cfTotal = cfValues[0];
  for (let i = 1; i < cfValues.length; i++) {
    cfTotal = cfTotal + cfValues[i] - (cfTotal * cfValues[i]);
  }

  if (cfValues[0] < 0.5) { // Jika pH tidak ideal, maka akan mengurangi kadar oksigen
    cfValues[1] = Math.min(cfValues[1] - 0.2, 0);
  }
  
  if (cfValues[2] < 0.5) { // Jika suhu tidak ideal, maka akan mengurangi kejernihan
    cfValues[3] = Math.min(cfValues[3] - 0.1, 0); 
  }

  cfTotal = cfValues.reduce((acc, cf) => acc + cf - (acc * cf), 0);

  // forward chaining
  rules.forEach(rule => {
    if (rule.condition(cfTotal)) {
      conclusions.push(rule.conclusion);
    }
  });

  const cfPercentage = Math.round(cfTotal * 100);
  
  // Hasil, fakta, dan saran
  let resultText = `<h3>Kesimpulan:</h3><p>CF Total: ${cfPercentage}%</p><ul>`;
  conclusions.forEach(conclusion => {
    resultText += `<li>${conclusion}</li>`;
  });
  resultText += `</ul>`;

  let factsText = `<h3>Fakta:</h3><ul>`;
  facts.forEach(fact => {
    factsText += `<li>${fact.question} - <strong>${fact.answer} (${fact.conclusionText})</strong></li>`;
  });
  factsText += `</ul>`;

  let adviceText = `<h3>Saran:</h3><ul>`;
  facts.forEach(fact => {
    adviceText += `<li>${fact.adviceText}</li>`;
  });
  adviceText += `</ul>`;

  document.getElementById('result-container').style.display = 'flex';
  document.getElementById('result').innerHTML = resultText;
  document.getElementById('facts').innerHTML = factsText;
  document.getElementById('advice').innerHTML = adviceText;
}

document.getElementById('enter-button').addEventListener('click', () => {
  document.getElementById('landing-page').style.display = 'none';
  document.getElementById('main-page').style.display = 'block';
  generateQuestions();
});

document.getElementById('calculate-button').addEventListener('click', forwardChaining);
