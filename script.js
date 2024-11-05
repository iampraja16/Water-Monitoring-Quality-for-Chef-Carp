const questions = [
  { 
    id: 'P1', 
    question: 'Seberapa jauh pH air yang Anda gunakan dari rentang ideal? (6,5 – 7,5)',
    expertCF: 0.8,
    options: [
      { text: 'Berada pada rentang Ideal', cf: 0.8, conclusionText: 'pH air ini termasuk optimal', adviceText: 'Lanjutkan pemeliharaan rutin dan periksa pH secara berkala.' },
      { text: 'Sedikit di luar rentang ideal', cf: 0.5, conclusionText: 'pH air ini kurang optimal', adviceText: 'Periksa pH dan sesuaikan agar mendekati rentang ideal.' },
      { text: 'Jauh dari rentang ideal', cf: 0, conclusionText: 'pH air ini belum optimal', adviceText: 'Segera sesuaikan pH agar berada dalam rentang ideal untuk kesehatan ikan.' }
    ]
  },
  { 
    id: 'P2', 
    question: 'Apakah kadar oksigen terlarut dalam air Anda berada di atas 5 mg/L?',
    expertCF: 0.8,
    options: [
      { text: 'Dalam rentang ideal', cf: 0.8, conclusionText: 'Oksigen terlarut dalam kondisi ideal', adviceText: 'Lanjutkan pemantauan kadar oksigen secara berkala.' },
      { text: 'Di sekitar 4 – 5 mg/L', cf: 0.55, conclusionText: 'Oksigen terlarut sedikit kurang', adviceText: 'Tambahkan aerasi untuk meningkatkan kadar oksigen di air.' },
      { text: 'Kurang dari 4 mg/L', cf: 0, conclusionText: 'Oksigen terlarut belum mencukupi', adviceText: 'Segera tambahkan aerasi yang cukup untuk mencapai tingkat oksigen ideal.' }
    ]
  },
  { 
    id: 'P3', 
    question: 'Seberapa dekat suhu air Anda dengan rentang ideal? (20 – 24 C)',
    expertCF: 0.8,
    options: [
      { text: 'Suhu normal (ideal)', cf: 0.8, conclusionText: 'Suhu air ini dalam kondisi ideal', adviceText: 'Pastikan suhu tetap stabil dan tidak fluktuatif.' },
      { text: 'Agak dekat dengan rentang ideal', cf: 0.5, conclusionText: 'Suhu air ini sedikit kurang optimal', adviceText: 'Usahakan menjaga suhu air agar lebih dekat ke rentang ideal.' },
      { text: 'Jauh dari rentang ideal', cf: 0, conclusionText: 'Suhu air ini belum optimal', adviceText: 'Pertimbangkan menggunakan pengatur suhu untuk menjaga stabilitas suhu air.' }
    ]
  },
  { 
    id: 'P4', 
    question: 'Apakah air yang Anda gunakan terlihat jernih/keruh?',
    expertCF: 0.8, 
    options: [
      { text: 'Sangat jernih', cf: 0.9, conclusionText: 'Kejernihan air sangat baik', adviceText: 'Lanjutkan menjaga kejernihan air untuk kesehatan ikan.' },
      { text: 'Sedikit keruh', cf: 0.5, conclusionText: 'Kejernihan air kurang optimal', adviceText: 'Pertimbangkan melakukan penggantian air lebih sering untuk kejernihan yang optimal.' },
      { text: 'Sangat Keruh', cf: 0, conclusionText: 'Kejernihan air sangat buruk', adviceText: 'Lakukan pembersihan atau penggantian air secara menyeluruh untuk meningkatkan kejernihan.' }
    ]
  },
  { 
    id: 'P5', 
    question: 'Seberapa kuat bau besi atau amis atau busuk pada air yang Anda gunakan?',
    expertCF: 0.8,
    options: [
      { text: 'Tidak ada bau', cf: 0.7, conclusionText: 'Air tidak memiliki bau yang mengganggu', adviceText: 'Pertahankan kebersihan air agar tidak muncul bau.' },
      { text: 'Bau samar-samar', cf: 0.5, conclusionText: 'Air memiliki sedikit bau', adviceText: 'Lakukan penggantian air secara berkala untuk mengurangi bau.' },
      { text: 'Bau sangat kuat', cf: 0, conclusionText: 'Air memiliki bau yang kuat', adviceText: 'Segera lakukan penggantian air dan periksa penyebab bau.' }
    ]
  },
  { 
    id: 'P6', 
    question: 'Seberapa jelas atau berwarna air yang Anda gunakan?',
    expertCF: 0.7,
    options: [
      { text: 'Bening', cf: 0.7, conclusionText: 'Air tampak sangat bening', adviceText: 'Lanjutkan menjaga kualitas air tetap bening untuk kesehatan ikan.' },
      { text: 'Sedikit berwarna', cf: 0.5, conclusionText: 'Air memiliki warna sedikit keruh', adviceText: 'Pertimbangkan melakukan penggantian air lebih sering untuk menjaga warna air.' },
      { text: 'Sangat berwarna', cf: 0, conclusionText: 'Air memiliki warna yang sangat pekat', adviceText: 'Segera lakukan pembersihan dan periksa sumber pencemaran untuk menjaga kualitas air.' }
    ]
  }
];

function generateQuestions() {
  let questionHTML = '';
  questions.forEach((q, index) => {
      questionHTML += `<div class="question"><p>${q.question}</p>`;
      q.options.forEach((opt, optIndex) => {
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
generateQuestions();

function calculateCF() {
  let cfValues = [];
  let userConclusions = []; 
  let userAdvices = [];     

  questions.forEach((q, index) => {
    const userAnswer = document.querySelector(`input[name="q${index}"]:checked`);
    const userCF = parseFloat(userAnswer?.value || 0);
    const expertCF = q.expertCF;

    // Penggabungan menggunakan metode minimum
    const combinedCF = Math.min(userCF, expertCF);
    cfValues.push(combinedCF * 0.37);

    if (userAnswer) {
      const selectedOption = q.options.find(opt => opt.cf === userCF);
      if (selectedOption) {
        userConclusions.push(selectedOption.conclusionText);
        userAdvices.push(selectedOption.adviceText);
      }
    }
  });

  // Menggunakan aturan parallel untuk menghitung CF Total
  let cfTotal = cfValues[0];
  for (let i = 1; i < cfValues.length; i++) {
    cfTotal = cfTotal + cfValues[i] - (cfTotal * cfValues[i]);
  }

  const cfPercentage = Math.round(cfTotal * 100);

  let resultText = `<h3>Kesimpulan:</h3><p>CF Total: ${cfPercentage}%</p>`;
  if (cfTotal >= 0.8) {
    resultText += `<p>Lingkungan sangat mendukung untuk pemeliharaan ikan mas koki.</p>`;
  } else if (cfTotal >= 0.5) {
    resultText += `<p>Lingkungan cukup baik, tetapi ada beberapa hal yang dapat diperbaiki.</p>`;
  } else {
    resultText += `<p>Lingkungan kurang mendukung, perlu perhatian lebih lanjut.</p>`;
  }

  resultText += `<h3>Rincian Fakta:</h3><ul>`;
  userConclusions.forEach(conclusion => {
    resultText += `<li>${conclusion}</li>`;
  });
  resultText += `</ul>`;

  let adviceText = `<h3>Saran:</h3><ul>`;
  userAdvices.forEach(advice => {
    adviceText += `<li>${advice}</li>`;
  });
  adviceText += `</ul>`;

  const resultContainer = document.getElementById('result-container');
  resultContainer.style.display = 'flex';
  document.getElementById('result').innerHTML = resultText;
  document.getElementById('advice').innerHTML = adviceText;
  
}

document.querySelectorAll('input[type="radio"]').forEach(radio => {
  radio.addEventListener('change', calculateCF);
});
document.getElementById('calculate-button').addEventListener('click', calculateCF);

document.getElementById('calculate-button').addEventListener('click', calculateCF);
document.getElementById('enter-button').addEventListener('click', () => {
  document.getElementById('landing-page').style.display = 'none';
  document.getElementById('main-page').style.display = 'block';
  generateQuestions();
});
