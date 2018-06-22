import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import $ from 'jquery';
import { extractCustomerDescription } from 'btprilib';

$(document).ready(function() {
  const $input = $('#input');
  const $result = $('#result');

  function clearResult() {
    $result.empty();
  }

  function setResult(text) {
    clearResult();
    $result.text(text);
  }

  //-----------------------
  // Event register here
  //-----------------------

  $input.on('keyup change', (event) => { 
    const val = $input.val();
    const res = extractCustomerDescription(val);
    setResult(res);
  });
});
