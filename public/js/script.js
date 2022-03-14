console.log('client side shit');

const showResult = (content, isError = false) => {
  const div = document.createElement('div');
  div.textContent = content;
  if (isError) {
    div.style.backgroundColor = 'red';
  }
  document.body.appendChild(div);
  return div;
};

const getData = async (address) => {
  const loader = showResult('Loading...', false);
  try {
    const res = await fetch(`http://localhost:3001/weather?address=${address}`);
    const json = await res.json();

    if (json.error) throw new Error(json.error.info);

    showResult(json.forecast, false);
    showResult(json.location, false);
  } catch (e) {
    showResult(e.message, true);
  } finally {
    document.body.removeChild(loader);
  }
};

const form = document.querySelector('form');
form.addEventListener('submit', (ev) => {
  ev.preventDefault();
  getData(form.elements[0].value);
});
