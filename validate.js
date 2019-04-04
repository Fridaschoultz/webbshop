// Formulärvalidering

$(document).ready(function() {
  // Validering av Postnummret
  $("input[required]").keyup(postcode);
  function postcode() {
    $(this).val().length < 4
      ? $(this)
          .siblings(".postcode")
          .show(500)
      : // 4. Dölj meddelandet om fältet innehåller minst 4 tecken
        $(this)
          .siblings(".postcode")
          .hide(500);
  }

  // Validering av Telefonnummret
  $("input[required]").keyup(phonenumber);
  let numbers = new RegExp("^[0-9]*$"); // Använder mig av RegEx (https://regex101.com)
  // ^ and $ will match the start and end of a line, instead of the whole string.
  function phonenumber() {
    !numbers.test($(this).val()) // Test är en metod som gör det möjligt att testa en sträng mot en regular expression.
      ? 
        $(this)
          .siblings(".phonenumber")
          .show(500)
      : $(this)
          .siblings(".phonenumber")
          .hide(500);
  }

  // Validering av Namn
  $("input[required]").keyup(name);
  //let letters = new RegExp("^[a-z\s]*$"); // Använder mig av RegEx (https://regex101.com)
  let letters = /^[a-öA-Ö\s]*$/; // Letters innehåller bokstäverna a-ö, A-Ö och space(\s).
  function name() {
    !letters.test($(this).val()) // Test är en metod som gör det möjligt att testa en sträng mot en regular expression.
      ? 
        $(this)
          .siblings(".name-checkout")
          .show(500)
      : $(this)
          .siblings(".name-checkout")
          .hide(500);
  }

  // Validering av email
  $("#email").keyup(proboscisA);
  let proboscis = /[@]/; // RegEx kan även skrivas såhär
  function proboscisA() {
    !proboscis.test($(this).val()) 
    // om min Regular Expression är false, visas p-taggen med klassen .proboscisA, annars göms den.
      ? 
        $(this)
          .siblings(".proboscisA")
          .show(500)
      : $(this)
          .siblings(".proboscisA")
          .hide(500);
  }
  // Validering av Ort
  $("#adress").keyup(adressen);
  let adress = /^[a-öA-Ö\s 0-9]*$/; // RegEx kan även skrivas såhär
  function adressen() {
    !adress.test($(this).val()) 
    // om min Regular Expression är false, visas p-taggen med klassen .proboscisA, annars göms den.
      ? 
        $(this)
          .siblings(".adress")
          .show(500)
      : $(this)
          .siblings(".adress")
          .hide(500);
  }
  $("#ort").keyup(orten);
  let ort = /^[a-öA-Ö\s]*$/; // RegEx kan även skrivas såhär
  function orten() {
    !ort.test($(this).val()) 
    // om min Regular Expression är false, visas p-taggen med klassen .proboscisA, annars göms den.
      ? 
        $(this)
          .siblings(".ort")
          .show(500)
      : $(this)
          .siblings(".ort")
          .hide(500);
  }
});
