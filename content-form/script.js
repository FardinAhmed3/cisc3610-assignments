document.getElementById('apyForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const principal = parseFloat(document.getElementById('principal').value);
    const apy = parseFloat(document.getElementById('apy').value);
    const months = parseFloat(document.getElementById('months').value);

    if (isNaN(principal) || isNaN(apy) || isNaN(months)) {
      document.getElementById('result').innerHTML = '<div class="alert alert-danger">Please enter valid numbers.</div>';
      return;
    }

    const monthlyRate = Math.pow(1 + apy / 100, 1 / 12) - 1;
    const totalAmount = principal * Math.pow(1 + monthlyRate, months);
    let output;

    if (document.querySelector('input[name="calcType"]:checked').value === 'interest') {
      output = `<h4>Interest Earned: $${(totalAmount - principal).toFixed(2)}</h4>`;
    } else {
      output = `<h4>Final Balance: $${totalAmount.toFixed(2)}</h4>`;
    }
    document.getElementById('result').innerHTML = output;
  });
  