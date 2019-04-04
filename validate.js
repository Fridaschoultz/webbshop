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
  // let numbers = /^[0-9]*$/; 
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

  // VAlidering av Namn
  $("input[required]").keyup(name);
  let letters = new RegExp("^[a-z]*$"); // Använder mig av RegEx (https://regex101.com)
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
});
