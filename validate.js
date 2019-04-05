// Formulärvalidering

$(document).ready(function() {
  // Validering av Postnummret - minst 4 siffror
  $("input[required]").keyup(postcode);
  function postcode() {
    $(this).val().length < 4
      ? $(this)
          .siblings(".postcode")
          .show(500) // 500 millisekunder tar det för texten med klassen .postcode att ladda.
      : // Dölj meddelandet om fältet innehåller minst 4 tecken
        $(this)
          .siblings(".postcode")
          .hide(500);
    // 500 syftar på speed.
  }
  $("input[required]").keyup(numbersOnly);
  let post = /^[0-9\s]*$/; // Endast siffror och mellanslag
  function numbersOnly() {
    !post.test($(this).val())
      ? $(this)
          .siblings(".post")
          .show(500)
      : $(this)
          .siblings(".post")
          .hide(500);
  }

  // Validering av Telefonnummret
  $("input[required]").keyup(phonenumber);
  let numbers = new RegExp("^[0-9]*$"); // Använder mig av RegEx (https://regex101.com)
  // med ^ och $ menas början och slutet av strängen.
  function phonenumber() {
    // Test är en metod som gör det möjligt att testa en sträng mot en regular expression.
    !numbers.test($(this).val())
      ? $(this)
          .siblings(".phonenumber")
          .show(500)
      : $(this)
          .siblings(".phonenumber")
          .hide(500);
  }

  // Validering av Namn
  $("input[required]").keyup(name);
  let letters = /^[a-öA-Ö\s]*$/; // RegEx kan även skrivas såhär. Letters innehåller bokstäverna a-ö, A-Ö och space(\s).
  function name() {
    // Test är en metod som gör det möjligt att testa en sträng mot en regular expression.
    !letters.test($(this).val())
      ? $(this)
          .siblings(".name-checkout")
          .show(500)
      : $(this)
          .siblings(".name-checkout")
          .hide(500);
  }

  // Validering av email
  $("#email").keyup(proboscisA);
  let proboscis = /[@]/; // Här syftar min tilldelade variabel på @.
  function proboscisA() {
    !proboscis.test($(this).val())
      ? // om min Regular Expression är false, visas p-taggen med klassen .proboscisA, annars göms den.
        $(this)
          .siblings(".proboscisA")
          .show(500)
      : $(this)
          .siblings(".proboscisA")
          .hide(500);
  }
  // Validering av Ort
  $("#adress").keyup(adressen);
  let adress = /^[a-öA-Ö\s 0-9]*$/;
  function adressen() {
    !adress.test($(this).val())
      ? $(this)
          .siblings(".adress")
          .show(500)
      : $(this)
          .siblings(".adress")
          .hide(500);
  }
  $("#ort").keyup(orten);
  let ort = /^[a-öA-Ö\s]*$/;
  function orten() {
    !ort.test($(this).val())
      ? $(this)
          .siblings(".ort")
          .show(500)
      : $(this)
          .siblings(".ort")
          .hide(500);
  }
});
